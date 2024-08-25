import User from "../model/Usermodel.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashpassword = await bcryptjs.hash(password, 10);
        const createduser = new User({
            fullname: fullname,
            email: email,
            password: hashpassword
        });
        await createduser.save();
        res.status(201).json({ message: "User created successfully",user:{
            _id:createduser._id,
            fullname:createduser.fullname,
            email:createduser.email,
        }, });
    } catch (e) {
        console.log("Error ", e.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(400).json({ message: " Invalid username" });
        }

        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: " Invalid password" });
        }

        res.status(200).json({
            message: "Login successful",
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
            },
        });
    } catch (e) {
        console.log("Error: " + e.message);
        res.status(500).json({ message: " Internal server error" });
    }
};
