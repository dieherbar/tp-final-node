import express from 'express';
import cors from 'cors'; 

const app = express();
/*
// Configuración básica: Permitir todos los orígenes 
app.use(cors());*/

// Configuración avanzada: 
// Permitir dominios específicos 
const corsOptions = {
    // Dominios permitidos 
    origin: ['https://example.com', 'https://anotherdomain.com'],
    // Métodos HTTP permitidos 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    // Encabezados permitidos 
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // Permitir cookies o credenciales 
};

export default { cors, corsOptions };