const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
    headline: {
        type: String,
        required: true
    },

    tagline: String,

    manufacturer: String,

    socialHandle: String,

    avatarUrl: String,

    region: String,

    postal: String,

    visitCount: Number,

    averageScore: Number,

    publishedOn: Date,

    lastSeenAt: Date,

    internalNotes: String,

    membershipLevel: String,

    isVerified: Boolean
});

module.exports = mongoose.model("Content", contentSchema);