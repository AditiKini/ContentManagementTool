import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (token == null) {
        return res.status(404).json({ msg: 'token is missing' });
    }

    jwt.verify(token, process.env.ACCESS_SECRET_KEY, (error, value) => {
        if (error) {
            return res.status(500).json({ msg: 'invalid token' })
        }

        req.value = value;
        next();
    })
}
