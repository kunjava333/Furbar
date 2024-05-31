const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
    user_id:{
        type:String,
        required:true
    },
    wishlists:[{
       productId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Product'
       }
    }]
})


module.exports = mongoose.model ('Wishlist',wishlistSchema);

