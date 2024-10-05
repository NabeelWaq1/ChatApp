import bcrypt from 'bcryptjs';
import User from '../Models/userModel.js'
import generateTokenAndSetCookie from '../Utils/generateTokeAndSetCookie.js'

export const SignUp = async (req, res) => {
    try {
        const { username, fullname, password, gender, confPassword } = req.body;
        // let {profilePic} = req.body;

        if (!username || !fullname || !password || !gender) {
            return res.status(400).json({ success: false, message: 'Please provide all required fields' });
        }
        if (password.length < 6) {
            return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long' });
        }

        if (password !== confPassword) {
            return res.status(400).json({ success: false, message: 'Passwords do not match' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = new User({ username, fullname, password: hashedPassword, gender, profilePic: gender === 'male' ? boyProfilePic : girlProfilePic });

        if (newUser) {
        await newUser.save();
        generateTokenAndSetCookie(newUser?._id, res)

            return res.json({
                success: true, message: 'User registered successfully', newUser: {
                    _id: newUser._id,
                    username: newUser.username,
                    fullname: newUser.fullname,
                    gender: newUser.gender,
                    profilePic: newUser.profilePic
                }
            });

        } else {

          return res.status(400).json({ success: false, message: 'Failed to register user' });

        }

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const Login = async (req, res) => {
       try {
        const {username, password} = req.body;

        if(!username || !password) {
            return res.status(400).json({success: false, message: 'Please provide both username and password'});
        }
        const user = await User.findOne({username});

        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if(!user || !isPasswordCorrect){
            return res.status(400).json({success: false, message: 'Invalid credentials'});
        }

         generateTokenAndSetCookie(user?._id, res);

        return res.status(200).json({success: true, message: "Logged in successfully", user:{
            _id: user._id,
            username: user.username,
            fullname: user.fullname,
            gender: user.gender,
            profilePic: user.profilePic
        }});
        

       } catch (error) {
        console.log(error.message);
        return res.status(500).json({success: false, message: error.message});
       }
}

export const LogOut = async (req, res) => {
try {
    res.cookie("jwt","",{maxAge:0});
    return res.json({success: true, message: "Logged out successfully"});
} catch (error) {
    console.log(error.message);
    return res.status(500).json({success: false, message: error.message});
}
}