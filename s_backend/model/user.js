import mongoose from "mongoose";

// function startsWithUnderscore(value) {
//     // Check if the value is defined, not null, and a non-empty string
//     return typeof value === 'string' && value.trim().length > 0 && /^_/.test(value.trim());
// }

// const underscoreValidator = [
//     {
//         validator: startsWithUnderscore,
//         message: 'Field should start with an underscore'
//     }
// ];


//Schema is func which accept the object.
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        // validate: underscoreValidator
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

const User = mongoose.model('userdata', userSchema);

export default User;