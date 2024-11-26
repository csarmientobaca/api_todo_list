const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
    {
        title: { 
            type: String, 
            required: true }, 
        completed: { 
            type: Boolean, 
            default: false },
        userId: { type: String, required: function () {
                return process.env.TYPE === "multi";
            }},  
    }, 
    { 
        timestamps: true });



module.exports = mongoose.model("Todo", todoSchema);
