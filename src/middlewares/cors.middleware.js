//import express from 'express';
import cors from 'cors'; 

//const allowedOrigins = ['http://127.0.0.1:3000', 'https://localhost:5500'];

// Configuración básica: Permitir todos los orígenes 
//app.use(cors());

// Configuración avanzada: Permitir dominios específicos 
const corsOptions = {
  // Dominios permitidos 
  origin: ['http://127.0.0.1:3000', 'http://127.0.0.1:5500'],
  // Métodos HTTP permitidos 
  methods: ['GET'], //'POST', 'PUT', 'DELETE'],
  // Encabezados permitidos 
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // Permitir cookies o credenciales 
};

export default cors(corsOptions);
