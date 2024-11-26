const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firebaseUid: { type: String, required: true, unique: true },//firebase thing
    email: { type: String, required: true, unique: true }, 
    displayName: { type: String }, 
    photoURL: { type: String }, 
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);