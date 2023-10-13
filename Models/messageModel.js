const momentTz = require('moment-timezone')
const moment = require('moment')

let time = moment().format("HH:mm")
let date = moment().format("DD MMM YYYY")

console.log("now" , time , date)
momentTz.tz("Asia/Kolkata").format()

const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    time:{
        type:String,
        required:false
    },
    dated:{
        type:String,
        required:false
    },
    content: { type: String, trim: true },
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat"
    }
}, { timestamps: true })

const Message = mongoose.model("Message", messageSchema)

module.exports = Message

// sender
// content
// chat