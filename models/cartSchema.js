const { type } = require('express/lib/response')
const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    user_id:{
        type:String,
        required:true
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
       total:{
        type:String,
        required:true
        }
    }]
})

module.exports = mongoose.model ('Cart',cartSchema)