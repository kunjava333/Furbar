const { type } = require('express/lib/response')
const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    user_id:{
        type:String,
        required:true
    },
    orders:{
        type:Array,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    }
})

module.exports = mongoose.model ('Cart',cartSchema)