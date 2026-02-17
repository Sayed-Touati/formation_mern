const userModel = require('../models/user.model');
const sendEmail = require('../utils/mailer');
const { signUpSchema, loginSchema } = require("../schemas/auth.schema");
const { generateToken } = require('../utils/jwt');

async function signUp(req, res) {
    try {
        const validation = signUpSchema.safeParse(req.body);

        if (!validation.success) {
            return res.status(400).json({
                errors: validation.error.flatten()
            })
        };
        // firstName, lastName, email, password, confirmPassword, dob
        const { firstName, lastName, email, password, confirmPassword, dob } = req.body;

        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                status: false,
                message: 'Email already registered'
            })
        }

        const user = await userModel({
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: password,
            confirmPassword: confirmPassword,
            dob: dob
        })

        await user.save();

        // SEND WELCOME MAIL (TODO)
        const options = {
            email: email,
            subject: "Welcome Mail",
            content: `Welcome aboard ${firstName} ${lastName}. Sent from http://localhost:3000`
        }

        await sendEmail(options);

        res.status(201).json({
            status: true,
            message: `Welcome aboard ${firstName} ${lastName}`
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

async function login(req, res) {
    try {
        const validation = loginSchema.safeParse(req.body);

        if (!validation.success) {
            return res.status(400).json({
                errors: validation.error.flatten()
            })
        };

        const { email, password } = req.body;

        // Find user by email
        const user = await userModel.findOne({ email }).select("+password");

        // Case1: user not found -> return error
        if (!user) {
            return res.status(400).json({
                status: false,
                message: "Invalid credentials"
            })
        };
        // Case2: user found -> check password
        const passwordMatch = await user.comparePassword(password);
        // case2.1: password incorrect -> return error
        if (!passwordMatch) {
            return res.status(400).json({
                status: false,
                message: "Invalid credentials"
            })
        }
        // case2.2: password correct -> generation auth token
        const token = generateToken(user._id);
        res.status(200).json({
            message: "logged in successfully",
            token
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = { signUp, login };