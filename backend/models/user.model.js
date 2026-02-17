const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true
        },
        firstName: {
            type: String,
            required: [true, 'First Name is required'],
        },
        lastName: {
            type: String,
            required: [true, 'Last Name is required']
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [8, 'Password must be at least 8 chars'],
            select: false
        },
        confirmPassword: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [8, 'Password must be at least 8 chars'],
            select: false
        },
        dob: {
            type: Date,
        },
        role: {
            type: String,
            enum: ["ADMIN", "USER"],
            default: "USER"
        }
    }, { timestamps: true })

userSchema.pre('save', async function (next){
    // Modifiction password
});

userSchema.pre('save', async function (){
    // Comapring and Hashing Passwords
    if (this.password !== this.confirmPassword) {
        throw new Error("Passwords doesn't match");
    }

    const salt = await bcrypt.genSalt(12);

    this.password = await bcrypt.hash(this.password, salt);

    this.confirmPassword = undefined;
})

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password)
}

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;