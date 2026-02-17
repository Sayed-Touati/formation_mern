const {z} = require('zod')

const createUserSchema = z.object({
    email: z.string('Email is required').email({ message: "Invalid email format" }),
    firstName: z.string().min(1, { message: "First Name is required" }),
    lastName: z.string().min(1, { message: "Last Name is required" }),
    password: z.string()
        .min(8, { message: "Password must be greater than 8 chars" })
        .max(32, { message: "Password must be less than 32 chars" }),
    confirmPassword: z.string()
        .min(8, { message: "Password must be greater than 8 chars" })
        .max(32, { message: "Password must be less than 32 chars" }),
    dob: z.string().optional(),
    role: z.enum(["ADMIN", "PATIENT", "DOCTOR"])
});  

module.exports = {createUserSchema}