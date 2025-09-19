interface AuthUser {
    uid: string;
    displayName: string;
    email: string;
    isActive: boolean;
    phoneNumber: string;
    isVerified: boolean;
    photoURL: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}