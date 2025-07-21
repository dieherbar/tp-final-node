// controller
import { generateToken } from '../utils/jwt.js';

const default_user = { 
    id: 1, 
    email: 'pepe@admin.com', 
    password: 'passWord123' 
};

 async function login (req, res) {
    const { email, password } = req.body;

    //const user = { id: 1, email };

    if (email === default_user.email && password === default_user.password) {
        const token = generateToken(default_user);
        //console.log("Token generado en controller:", token);
        return res.json({ 
            message: 'Login successful', 
            token 
        });
    } else {
        return res.status(401).json({ 
            message: 'Invalid email or password' 
        });
    }
}

export default {
    login
};