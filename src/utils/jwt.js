import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { envs } from '../config/envs.js';

const secret_key = process.env.JWT_SECRET_KEY;

export const generateToken = (userData) => {    
    const user = {
        id: userData.id, email: userData.email};
        const expiration = {expiresIn: '1h'}; // Token expiration time
    return jwt.sign(user, secret_key, expiration);
};

export const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, secret_key);
        return {valid: true, decoded};
    } catch (error) {
        return {valid: false, message: error.message};
        
    }
}