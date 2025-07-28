/*import { config } from 'dotenv';
config();*/
import { loadEnvFile } from 'node:process';
process.loadEnvFile('.env'); // Cargar las variables de entorno desde el archivo .env
//console.log("una variable de entorno:", process.env.APIKEY);

const requiredEnvVars = [
    'APIKEY',
    'AUTHDOMAIN',
    'PROJECTID',
    'STORAGEBUCKET',
    'MESSAGINGSENDERID',
    'APPID'
];

// Validar que todas las variables requeridas estén presentes
requiredEnvVars.forEach(env => {
    if (!process.env[env]) {
        throw new Error(`Falta la variable de entorno requerida: ${env}`);
    }
});

export const envs = {
    database: {
        apikey: process.env.APIKEY,
        authDomain: process.env.AUTHDOMAIN,
        projectId: process.env.PROJECTID,
        storageBucket: process.env.STORAGEBUCKET,
        messagingSenderId: process.env.MESSAGINGSENDERID,
        appId: process.env.APPID,
    },
    port: process.env.PORT || 3000,
    secrets: {
        jwt_secret: process.env.JWT_SECRET_KEY, 
        session: process.env.SESSION_KEY 
    }
};