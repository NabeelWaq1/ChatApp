import jwt from 'jsonwebtoken'
import User from '../Models/userModel.js';

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No token, authorization denied',
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        if(!decoded){
            return res.status(401).json({
                success: false,
                message: 'Token is not valid',
            })
        }


        const user = await User.findById(decoded.userId);

        if(!user){
            return res.status(404).json({
                success: false,
                message: 'User not found',
            })
        }

        req.user = user;
        
        next();

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}