import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config();

import User from '../models/userModel.js';

export const signin = async (req, res) => {
    const {email, password} = req.body;
    const secretString = process.env.SECRET_STRING;

    try {
        const existingUser = await User.findOne({email});
        !existingUser && res.status(404).json({message: "User doesn't exist."});

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        !isPasswordCorrect && res.status(400).json({message: "Invalid credentials."});

        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, secretString,
            {
                expiresIn: "1h"
            }
        );

        res.status(200).json({result: existingUser, token});
    } catch (error) {
        res.status(500).json({message: "Something went wrong."})
    }
}

export const signup = async (req, res) => {

}