const userModel = require('../models/user.model');

async function createUser(req, res) {
    // email, firstName, lastName, password, passwordConfirm, dob
    const { email, firstName, lastName, password, confirmPassword, dob } = req.body;

    if (password !== confirmPassword) {
        res.status(400).json({
            message: 'Your passwords doesnt match'
        });
    }

    const newUser = new userModel({
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: password,
        confirmPassword: confirmPassword,
        dob: dob
    });

    await newUser.save();

    res.status(201).json({
        user: newUser,
        message: `Welcome ${firstName} ${lastName} with email: ${email}`
    });
}

async function getUser(req, res) {
    const id = req.params.id;

    const user = await userModel.findById(id);

    if (!user) {
        res.status(404).json({
            message: "User not found"
        })
    }

    res.status(200).json({
        user: user
    });
}

async function putUser(req, res) {
    const id = req.params.id;

    const user = await userModel.findById(id);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        })
    };

    const updatedUser = await userModel.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true
    })

    res.status(201).json({
        message: 'User Updated Succesfully',
        user: updatedUser
    })
}

async function deleteUser(req, res) {
    const id = req.params.id;

    const user = await userModel.findById(id);

    if (!user) {
        res.status(404).json({
            message: "User not found"
        })
    };

    await userModel.findByIdAndDelete(id);

    res.status(204).json()
}

module.exports = { createUser, putUser, deleteUser, getUser };