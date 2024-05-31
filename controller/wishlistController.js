const Wishlist = require('../models/wishlistSchema')
const Cart = require('../models/cartSchema')


const addToWishlist = async (req,res) => {
    try {
        const {user_id} = req.session
        const {id} = req.query;
        const data = await Wishlist.findOne({user_id:user_id})
        if(!data){
            const wishlist = new Wishlist({
                user_id:user_id,
                wishlists:[{
                    productId:id,
                }]
            })
            const save = await wishlist.save()
            if(save){
                res.status(200).json({message:"Added to wish list"})
            }else{
                res.status(200).json({faile:"problem adding to wishlist"})
            }
        }else{
            const check = data.wishlists.find(item => item.productId == id);
            console.log(check);
            if(!check){
                const update = await Wishlist.findOneAndUpdate({user_id:user_id},{$push:{wishlists:{productId:id}}})
            if(update){
                res.status(200).json({message:"Added to wish list"})
            }
            }else{
                res.status(200).json({faile:"Already in wishlist"})
            }
        }
    } catch (error) {
        console.log(error.message);
    }
}




const showWishlist = async (req,res) => {
    try {
        const {user_id} = req.session
        const data = await Wishlist.findOne({user_id:user_id}).populate('wishlists.productId')
        if(!data){
            res.render('emptyWishlist');
        }else{
        res.render('wishlist',{data:data})
        }
    } catch (error) {
        console.log(error.message);
    }
}



const wishToCart = async (req,res) => {
    try {
        console.log('coming here');
      const {id} = req.query;
      const {user_id} = req.session;
      const data = await Cart.findOne({user_id:user_id})
      if (!data) {
        const cart = new Cart({
            user_id: user_id,
            orders: [{
                productId: id,
                quantity: 1,
            }]
        })
        const result = await cart.save()
        if (result) {
        res.status(200).json({message:'the product has been added to the cart'})
        const remove = await Wishlist.findOneAndUpdate({user_id:user_id},{$pull:{wishlists:{productId:{id}}}});
        if(remove){
            console.log('removed form the db');
        }
        }
    }else{
        console.log(data);
        const check = data.orders.find(val => val.productId == id);
        console.log(check);
    if(!check){
      const data = await Cart.findOneAndUpdate({user_id:user_id},{$push:{orders:{productId:id,quantity:1}}})
        if(data){
          res.status(200).json({message:'the product has been added to the cart'})
        const remove = await Wishlist.findOneAndUpdate({user_id:user_id},{$pull:{wishlists:{productId:{id}}}});
            if(remove){
                console.log('this is it everything is okauy and working ')
            }
        }else{
          res.status(200).json({faile:'some issues adding the product to cart please try again'});
        }
    }else{
      res.status(200).json({faile:'The product is already in the cart'});
    
    }
    }
     
  
    } catch (error) {
      console.log(error.message)
    }
  }
  



const removeFromWishlist = async (req,res) => {
    try {
      const {id} = req.query;
      const {user_id} = req.session;
      const data = await Wishlist.findOneAndUpdate({user_id:user_id},{$pull:{wishlists:{productId:id}}})
      if(data){
        res.status(200).json({message:'the product has been removed'});
  
      }else{
        res.status(200).json({faile:'some problem removing'});
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  
  module.exports = {
    showWishlist,
    addToWishlist,
    wishToCart,
    removeFromWishlist
}
