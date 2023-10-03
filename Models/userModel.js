const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    fname: { type: String, trim: true },
    lname: { type: String, trim: true },
    username: { type: String, trim: true },
    pass: { type: String, trim: true },
    pic: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
        required:false
    }
}, { timestamps: true })

const User = mongoose.model("User", userSchema)

module.exports = User