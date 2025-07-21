import { verifyToken } from "../utils/jwt.js";
import 'dotenv/config.js';

export const authentication = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: 'No token provided' });
        }

        // Extraigo el token 
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Malformed token' });
        }

        //Verificar el token
        const { valid, decoded, message } = verifyToken(token);

        if (!valid) {
            return res.status(403).json({ message: message || 'Invalid token' });
        }

        //Adjuntar información del usuario al request
        req.user = decoded;
        next();

    } catch (error) {
        console.error('Authentication error:', error);
        return res.status(500).json({ message: 'Internal authentication error' });
    }
};