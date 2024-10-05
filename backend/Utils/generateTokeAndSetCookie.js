import jwt from 'jsonwebtoken'

const generateTokeAndSetCookie = (userId,res) => {
    try {
        const token = jwt.sign({userId},process.env.JWT_TOKEN,{
            expiresIn: '15d',
        });

        res.cookie("jwt",token,{
            maxAge: 15 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: "strict"
        });

        // return res.status(200).json({success: true, message: "Logged in successfully"});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({success: false, message: "Could'nt  generate token"});

    }
}

export default generateTokeAndSetCookie;