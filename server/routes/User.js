import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { compare, hash } from 'bcrypt';
import userModel from '../models/User.js';

const router = Router();

// Login route
router.post('/login', async (req, res) => {
    const { number, password } = req.body;
    try {
        const user = await userModel.findOne({ number });
        if (!user) {
            return res.status(404).json({ message: 'Phone number does not exist! Please register' });
        }

        const isMatch = await compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 60 * 60 * 1000
        });

        res.status(200).json({ message: 'Login successful' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', err: err.message });
    }
});

// Register route
router.post('/register', async (req, res) => {
    const { name, number, password, state, district, taluk } = req.body;
    try {
        const existingUser = await userModel.findOne({ number });
        if (existingUser) {
            return res.status(302).json({ message: 'Account already exists. Please log in.' });
        }

        const hashedPassword = await hash(password, 10);
        const newUser = new userModel({
            name,
            number,
            password: hashedPassword,
            state,
            district,
            taluk
        });

        await newUser.save();

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 60 * 60 * 1000
        });

        res.status(201).json({ message: 'Registration successful' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get user details
router.get('/getUser', async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    } else {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await userModel.findById(decoded.userId).select('name');
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ name: user.name });
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
});

export default router;
