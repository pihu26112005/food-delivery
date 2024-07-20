import dotenv from 'dotenv';
dotenv.config();

// rest of your code
import userModel from "../models/UserModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';

const userLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Please enter a valid email" });
    }
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "10d" });
        res.status(200).json({ success: true, token });
    } catch (error) {
        res.status(500).json({success:false , message: "Something went wrong" });
    }
}

const userRegister = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Please enter a valid email" });
    }
    try {
        const user = await userModel.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });
        await newUser.save();
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "10d" });
        res.status(200).json({ success: true, token });
    } catch (error) {
        res.status(500).json({success:false , message: "Something went wrong" });
    }
}

const verifyToken = async (req, res) => {
    const token = req.headers['token'];
    // if (!token) {
    //     return res.status(400).json({ success: false });
    // }
    try {
        jwt.verify(token, process.env.JWT_SECRET);
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(400).json({ success: false });
    }
}

export { userLogin, userRegister , verifyToken};