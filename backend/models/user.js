import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
   role : {
        type: String,
        default: "customer",
        required: true
    },
    isBlocked: {
        type: Boolean,
        default: false
    }
})

const User = mongoose.model('User', userSchema);
export default User;