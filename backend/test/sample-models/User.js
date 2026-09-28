const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    age: {
        type: Number,
        min: 18,
        max: 65
    },

    isActive: {
        type: Boolean,
        default: true
    },

    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },

    dateOfBirth: {
        type: Date
    },

    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department"
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;