import { fetchEnvironment } from "@/config/lib/FetchEnvironment";

export const API_CONFIG = {
    ENDPOINTS: {
        SEND_OTP: "/send-otp",
        VERIFY_OTP: "/verify-otp",
        SEND_OTP_EMAIL: "/send-otp-email",
        SEND_OTP_PHONE: "/send-otp-phone",
        VERIFY_OTP_EMAIL: "/verify-otp-email",
        VERIFY_OTP_PHONE: "/verify-otp-phone",
        CHANGE_PASSWORD: "/change-password",
        CHANGE_PASSWORD_PHONE: "/change-password-phone",
        SEND_PAYMENT_NOTIFICATION: "/send-payment-notification",
    },
};

export const getApiUrl = async (endpoint: string): Promise<string> => {
    const environment = await fetchEnvironment();
    const baseURL = environment.data[1].baseURL;
    return `${baseURL}${endpoint}`;
};

export const isApiAvailable = (): boolean => {
    return true;
};