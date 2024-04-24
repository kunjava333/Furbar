const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    user_id:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    pincode:{
        type:Number,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    }
})


module.exports = mongoose.model ('Address',addressSchema)