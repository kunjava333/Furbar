const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    Date:{
        type:Date,
        required:true
        
    },
    isAdmin:{
        type:Boolean,
        required:true
    },
    isBlocked:{
        type:Boolean,
        required:true
    }
})


module.exports = mongoose.model ('Users',usersSchema)