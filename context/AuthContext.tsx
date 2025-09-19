import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { auth, db } from '@/config/firebase/Firebase';

import Toast from 'react-native-toast-message';

import {
    createUserWithEmailAndPassword,
    EmailAuthProvider,
    User as FirebaseUser,
    onAuthStateChanged,
    reauthenticateWithCredential,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut,
    updatePassword,
    updateProfile,
} from 'firebase/auth';

import { collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';

import axios from 'axios';

import { getApiUrl, isApiAvailable } from '@/config/api/api';

import AsyncStorage from '@react-native-async-storage/async-storage';

function formatPhone(phone: string) {
    let p = phone.replace(/[^0-9]/g, '');
    if (p.startsWith('0')) {
        p = '62' + p.slice(1);
    }
    return p;
}

interface AuthContextProps {
    user: AuthUser | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (data: RegisterData) => Promise<boolean>;
    logout: () => Promise<void>;
    forgotPassword: (email: string) => Promise<void>;
    changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
    setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
    refreshUser: () => Promise<void>;
}

interface RegisterData {
    email: string;
    password: string;
    displayName: string;
    phone?: string;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

function firebaseUserToAuthUser(user: FirebaseUser): AuthUser {
    return {
        createdAt: user.metadata.creationTime ? new Date(user.metadata.creationTime) : new Date(),
        displayName: user.displayName || '',
        email: user.email || '',
        isActive: false, // Default false
        isVerified: false, // Default false, akan diupdate dari Firestore
        phoneNumber: user.phoneNumber || '',
        photoURL: user.photoURL || '',
        role: 'user',
        uid: user.uid,
        updatedAt: user.metadata.lastSignInTime ? new Date(user.metadata.lastSignInTime) : new Date(),
    };
}


// Tambahkan fungsi untuk fetch user dari Firestore
const fetchFirestoreUser = async (uid: string) => {
    try {
        const docRef = doc(db, 'accounts', uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const userData = docSnap.data();
            return userData;
        }
    } catch {
        // Handle error silently
    }
    return null;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        let unsubscribed = false;

        // 1. Listen ke Firebase Auth
        setLoading(true);
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (unsubscribed) return;
            if (firebaseUser) {
                const authUser = firebaseUserToAuthUser(firebaseUser);
                const firestoreUser = await fetchFirestoreUser(firebaseUser.uid);
                const mergedUser = firestoreUser ? { ...authUser, ...firestoreUser } : authUser;
                setUser(mergedUser);
            } else {
                setUser(null);
            }
            setLoading(false);
        });
        return () => {
            unsubscribed = true;
            unsubscribe();
        };
    }, []);

    const login = async (email: string, password: string) => {
        setLoading(true);
        try {
            const { user: firebaseUser } = await signInWithEmailAndPassword(auth, email, password);
            const authUser = firebaseUserToAuthUser(firebaseUser);
            // Ambil data Firestore dan merge
            const firestoreUser = await fetchFirestoreUser(firebaseUser.uid);
            const mergedUser = firestoreUser ? { ...authUser, ...firestoreUser } : authUser;
            setUser(mergedUser);
            Toast.show({
                type: 'success',
                text1: 'Login berhasil!'
            });
        } catch (e) {
            Toast.show({
                type: 'error',
                text1: 'Login gagal',
                text2: 'Cek email atau password.'
            });
            throw e;
        } finally {
            setLoading(false);
        }
    };

    const register = async ({ email, password, displayName, phone }: RegisterData) => {
        setLoading(true);
        try {
            // Validasi nomor telepon unik
            if (phone) {
                const formattedPhone = formatPhone(phone);
                const q = query(collection(db, 'accounts'), where('phone', '==', formattedPhone));
                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    Toast.show({
                        type: 'error',
                        text1: 'Nomor telepon telah digunakan',
                        text2: 'Silakan gunakan nomor lain untuk mendaftar.'
                    });
                    setLoading(false);
                    return false;
                }
            }

            const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(firebaseUser, { displayName });

            const now = new Date();
            const formattedPhone = phone ? formatPhone(phone) : '';

            const authUser = {
                ...firebaseUserToAuthUser({ ...firebaseUser, displayName, phoneNumber: formattedPhone } as FirebaseUser),
                phone: formattedPhone,
                isActive: true, // Set true karena baru registrasi
                isVerified: false, // Set false karena belum verifikasi
            };

            await setDoc(doc(db, 'accounts', authUser.uid), {
                ...authUser,
                createdAt: authUser.createdAt instanceof Date ? authUser.createdAt.toISOString() : authUser.createdAt,
                updatedAt: authUser.updatedAt instanceof Date ? authUser.updatedAt.toISOString() : authUser.updatedAt,
            });

            // Kirim OTP ke WhatsApp tanpa await, biar tidak blocking
            if (formattedPhone) {
                if (!isApiAvailable()) {
                    Toast.show({
                        type: 'warning',
                        text1: 'OTP tidak dapat dikirim',
                        text2: 'API endpoint tidak tersedia. Silakan hubungi admin.',
                        visibilityTime: 4000,
                        autoHide: true,
                        topOffset: 50
                    });
                } else {
                    const otpUrl = getApiUrl('/send-otp');

                    axios.post(await otpUrl, {
                        phone: formattedPhone,
                        displayName,
                        email,
                        createdAt: now.toISOString()
                    })
                        .catch((error) => {
                            Toast.show({
                                type: 'error',
                                text1: 'Gagal mengirim OTP ke WhatsApp.',
                                text2: 'Silakan coba lagi nanti atau hubungi admin.',
                                visibilityTime: 4000,
                                autoHide: true,
                                topOffset: 50
                            });
                        });
                }
            }

            // Simpan data user sementara untuk verifikasi
            const tempUserData = {
                email,
                phone: formattedPhone,
                displayName,
                createdAt: now.toISOString(),
                uid: authUser.uid
            };

            // Simpan ke localStorage untuk digunakan di halaman verifikasi
            try {
                await AsyncStorage.setItem('temp_user_data', JSON.stringify(tempUserData));
            } catch {
                // Handle storage error silently
            }

            return true;
        } catch (e: any) {

            if (e.code === 'auth/email-already-in-use') {
                Toast.show({
                    type: 'error',
                    text1: 'Email sudah digunakan',
                    text2: 'Silakan gunakan email lain.',
                    visibilityTime: 4000,
                    autoHide: true,
                    topOffset: 50
                });
            } else if (e.code === 'auth/invalid-email') {
                Toast.show({
                    type: 'error',
                    text1: 'Format email tidak valid',
                    text2: 'Periksa kembali email Anda.',
                    visibilityTime: 4000,
                    autoHide: true,
                    topOffset: 50
                });
            } else if (e.code === 'auth/weak-password') {
                Toast.show({
                    type: 'error',
                    text1: 'Password terlalu lemah',
                    text2: 'Gunakan password yang lebih kuat (minimal 6 karakter).',
                    visibilityTime: 4000,
                    autoHide: true,
                    topOffset: 50
                });
            } else if (e.code === 'auth/network-request-failed') {
                Toast.show({
                    type: 'error',
                    text1: 'Koneksi internet bermasalah',
                    text2: 'Periksa koneksi internet Anda dan coba lagi.',
                    visibilityTime: 4000,
                    autoHide: true,
                    topOffset: 50
                });
            } else if (e.code === 'auth/too-many-requests') {
                Toast.show({
                    type: 'error',
                    text1: 'Terlalu banyak percobaan',
                    text2: 'Silakan tunggu beberapa menit sebelum mencoba lagi.',
                    visibilityTime: 4000,
                    autoHide: true,
                    topOffset: 50
                });
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Gagal mendaftar',
                    text2: `Error: ${e.message || 'Cek data Anda atau koneksi internet.'}`,
                    visibilityTime: 4000,
                    autoHide: true,
                    topOffset: 50
                });
            }
            throw e;
        } finally {
            setLoading(false);
        }
    };

    const forgotPassword = async (email: string) => {
        setLoading(true);
        try {
            await sendPasswordResetEmail(auth, email);
            Toast.show({
                type: 'success',
                text1: 'Email reset password telah dikirim.',
                visibilityTime: 3000,
                autoHide: true,
                topOffset: 50
            });
        } catch (e) {
            Toast.show({
                type: 'error',
                text1: 'Gagal mengirim email reset password.',
                visibilityTime: 4000,
                autoHide: true,
                topOffset: 50
            });
            throw e;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);
        try {
            await signOut(auth);
            setUser(null);
            Toast.show({
                type: 'success',
                text1: 'Logout berhasil.',
                visibilityTime: 3000,
                autoHide: true,
                topOffset: 50
            });
        } catch (e) {
            Toast.show({
                type: 'error',
                text1: 'Logout gagal.',
                visibilityTime: 4000,
                autoHide: true,
                topOffset: 50
            });
            throw e;
        } finally {
            setLoading(false);
        }
    };

    const changePassword = async (currentPassword: string, newPassword: string) => {
        setLoading(true);
        try {
            const currentUser = auth.currentUser;
            if (!currentUser || !currentUser.email) {
                throw new Error('User not authenticated');
            }

            // Re-authenticate user with current password
            const credential = EmailAuthProvider.credential(currentUser.email, currentPassword);
            await reauthenticateWithCredential(currentUser, credential);

            // Update password
            await updatePassword(currentUser, newPassword);

            Toast.show({
                type: 'success',
                text1: 'Password berhasil diubah!',
                text2: 'Anda akan logout otomatis untuk keamanan.',
                visibilityTime: 3000,
                autoHide: true,
                topOffset: 50
            });

            setTimeout(async () => {
                try {
                    await signOut(auth);
                    setUser(null);
                } catch {
                    // Handle logout error silently
                }
            }, 2000); // Wait 2 seconds for user to see the toast

        } catch (e: any) {
            if (e.code === 'auth/wrong-password') {
                Toast.show({
                    type: 'error',
                    text1: 'Password saat ini salah',
                    text2: 'Periksa kembali password Anda.',
                    visibilityTime: 4000,
                    autoHide: true,
                    topOffset: 50
                });
            } else if (e.code === 'auth/weak-password') {
                Toast.show({
                    type: 'error',
                    text1: 'Password baru terlalu lemah',
                    text2: 'Gunakan password yang lebih kuat.',
                    visibilityTime: 4000,
                    autoHide: true,
                    topOffset: 50
                });
            } else if (e.code === 'auth/requires-recent-login') {
                Toast.show({
                    type: 'error',
                    text1: 'Sesi login telah kedaluwarsa',
                    text2: 'Silakan login ulang untuk mengubah password.',
                    visibilityTime: 4000,
                    autoHide: true,
                    topOffset: 50
                });
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Gagal mengubah password',
                    text2: 'Terjadi kesalahan. Coba lagi.',
                    visibilityTime: 4000,
                    autoHide: true,
                    topOffset: 50
                });
            }
            throw e;
        } finally {
            setLoading(false);
        }
    };

    const refreshUser = async () => {
        const currentUser = auth.currentUser;
        if (currentUser) {
            const authUser = firebaseUserToAuthUser(currentUser);
            const firestoreUser = await fetchFirestoreUser(currentUser.uid);
            const mergedUser = firestoreUser ? { ...authUser, ...firestoreUser } : authUser;
            setUser(mergedUser);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout, forgotPassword, changePassword, setUser, refreshUser }}>
            {children}
        </AuthContext.Provider>
    );
};