const userModel = require("../models/user.model");
const { createUserSchema, updateUserSchema } = require("../schemas/user.schema");

async function createUser(req, res) {
  try {
    const validation = createUserSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        errors: validation.error.flatten(),
      });
    }

    const existingUser = await userModel.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(400).json({
        status: false,
        message: "Email already registered",
      });
    }

    // email, firstName, lastName, password, passwordConfirm, dob
    const newUser = new userModel({
      ...req.body,
    });

    await newUser.save();

    res.status(201).json({
      user: newUser,
      message: "User created Succesfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
}

async function getUser(req, res) {
    try {
        const id = req.params.id;

        const user = await userModel.findById(id);

        if (!user) {
        return res.status(404).json({
            status: true,
            message: "User not found",
        });
        }

        res.status(200).json({
        user: user,
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            error: error.message,
        });
    }
}

async function putUser(req, res) {
    try {
        const id = req.params.id;

        const user = await userModel.findById(id);

        const validation = updateUserSchema.safeParse(req.body);

        if (!validation.success) {
        return res.status(400).json({
            errors: validation.error.flatten(),
        });
        }

        if (!user) {
        return res.status(404).json({
            status: false,
            message: "User not found",
        });
        }

        const updatedUser = await userModel.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(201).json({
            status: true,
            user: updatedUser,
            message: "User Updated Succesfully",
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        })
    }
}

async function deleteUser(req, res) {
    try {
        const id = req.params.id;

        const user = await userModel.findById(id);

        if (!user) {
            res.status(404).json({
                status: false,
                message: "User not found",
            });
        }

        await userModel.findByIdAndDelete(id);

        res.status(204).json();

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        })
    }
}

async function listUsers(req, res) {
    try {
        const users = await userModel.find()

        return res.status(200).json({
            status: true,
            users
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        })
    }
}

module.exports = { createUser, putUser, deleteUser, getUser, listUsers };
