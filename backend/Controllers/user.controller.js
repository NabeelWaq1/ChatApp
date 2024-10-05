import User from "../Models/userModel.js";

export const getUsers = async (req, res) => {
    try {
        const userId = req.user._id;

        const users = await User.find({ _id: { $ne: userId } }).select("-password");
        res.status(200).json({success: true, users});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({success: false, message: error.message});
    }
}