const { type } = require('express/lib/response')
const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    items:[{
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
    }],
    date: {
        type: Date,
        requried: true
    },
    status: {
        type: String,
        required: true,
        default:'pending'
    },
    email:{
        type:String,
        required:true
    },
    address: {
        name: { type: String, required: true },
        address: { type: String, required: true },
        country: { type: String, required: true },
        city: { type: String, required: true },
        district: { type: String, required: true },
        pincode: { type: Number, required: true },
        mobile: { type: Number, required: true }
    },
    paymentMethod: {
        type: String,
        required: true,
        default: 'cash on delivery'
    }
})

module.exports = mongoose.model('Order', orderSchema)