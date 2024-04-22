const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    Date:{
        type:Date,
        required:false
        
    },
    // updatedDate:{
    //     type:Date,
    //     required:true
    // },
    imageurl:{
        type:Array,
        required:true
    },
    // alt_text:{
    //      type:String,
    //      required:true
    // }
    width:{
        type:Number,
        required:true
    },
    hieght:{
        type:Number,
        required:true
    },
    weight:{
        type:Number,
        required:true
    },
    shippingFee:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },blockProduct:{
        type:Boolean,
        required:true
    }
})


module.exports = mongoose.model ('Product',productSchema)