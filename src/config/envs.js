import { config } from 'dotenv';
config();

export const envs = {
    database: {
        apikey: process.env.API_KEY,
        authDomain: process.env.AUTH_DOMAIN,
        projectId: process.env.PROJECT_ID,
        storageBucket: process.env.STORAGE_BUCKET,
        messagingSenderId: process.env.MESSAGING_SENDER_ID,
        appId: process.env.APP_ID,
    },
    port: process.env.PORT || 3000,
    secrets: {
        jwt_secret: process.env.JWT_SECRET || "test_secret_key",
        session: process.env.SESSION_KEY || "test_session_key",
    }
};