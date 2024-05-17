const { type } = require('express/lib/response')
const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    orders:[{
        productId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"Product"
        },
        quantity:{
            type:Number,
            required:true,
            default:1
        },
    }]
})

module.exports = mongoose.model ('Cart',cartSchema)