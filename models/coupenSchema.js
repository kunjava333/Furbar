const { type } = require('express/lib/response');
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const coupenSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    code:{
        type:String,
        required:true
    },
    minAmmount:{
        type:String,
        required:true,
    },
    discAmmount:{
        type:String,
        required:true,
    },
    expiryDate:{
        type:Date,
        required:true,
    },
    status:{
        type:Boolean,
        required:true,
        default:true
    },
    usedList:[{
        userId:{
            type:mongoose.Types.ObjectId,
            required:false,
            ref:"User"
        },
        used:{
            type:Boolean,
            default:false
        }
    }]
})


module.exports = mongoose.model ('Coupen',coupenSchema)

