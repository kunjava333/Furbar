// const User = require("../models/usersSchema");
const Product = require("../models/productsSchema");
const Category = require('../models/categorySchema')
const Cart = require('../models/cartSchema');

//USER SIDE OF CONTROLING PRODUCT

const show_products_user = async (req,res)=>{
  try {
      const category = req.params.category;
      console.log(category);
      const dbData = await Product.find({ $and: [{ category: category }, {blockProduct:false}] })
      // console.log(dbData);
      
      res.render('shop',{dbData:dbData})
  } catch (error) {
      console.log(error.message);
  }
}


const add_to_cart = async (req,res)=>{
    try {
        const id = req.params.id
        console.log(req.session);

    } catch (error) {
        console.log(error.message);
    }
}


const show_lampLight = async (req, res) => {
    try {
      const dbData = await Product.find({ category: "Lamp light" });
      const category = await Category.find({})
    } catch (error) {
      console.log(error.message);
    }
  };

const product_details = async (req, res) => {
    try {
      const produtc_id = req.params.id;
      const dbData = await Product.find({ _id: produtc_id });
      // console.log(dbData);
      res.render("productDetail", { dbData: dbData });
    } catch (error) {
      console.log(error.message);
    }
  };
  //ADD PRODUCT CONTROLER
  // ADMIN SIDE OF CTROLING PRODUCT
const add_product = async (req,res)=>{
    try {
        console.log(req.body);
     const product = new Product({
        title:req.body.title,
        description:req.body.description,
        price:req.body.price,
        date:Date.now(),
        imageurl:req.files.map(file => file.filename),  
        width:req.body.width,
        hieght:req.body.hieght,
        weight:req.body.weight,
        shippingFee:req.body.shippingFee,
        category:req.body.category,
        blockProduct:false,
        stock:req.body.stock
     })
    
    
     if(product){
        const check = await product.save()
        const dbData = await Category.find({})
        if(check){
            res.render('addProduct',{message:'The product has been added',dbData}) 
         }else {
            res.render('addProduct',{message:'some problem in adding product please try again'})
         }
     }else{
        res.render('addProduct',{message:'please fill the full required columns'})
     }
    } catch (error) {
        console.log(req.file);
        console.log(error.message);
        res.render('addProduct',{message:'please fill all the rqeuried columns'})
    }
}

const show_products = async (req,res)=>{
    try {   
        const categoriy = req.body.category;
        const dbData = await Product.find({category:categoriy})
        const category = await Category.find({})
        // console.log(category);
        // res.send({dbData})
        res.status(200).json(dbData)
        // res.render('products',{dbData:dbData,category:category})
    } catch (error) {
        console.log(error.message);
    }
}

const edit_product = async (req,res)=>{
    try {
        const product_id = req.params.id
        // console.log(user_id);
        const dbData = await Product.findOne({_id:product_id})
        // console.log(dbData);
        res.render('edit',{dbData:dbData})
    } catch (error) {
        console.log(error.message);
    }
}
const change_product = async (req,res)=>{
    try {
        const product_id =req.params.id
        console.log(product_id);
        const {title,description,price,imageurl,width,hieght,weight,shippingFee,category} = req.body;
        const check = await Product.findByIdAndUpdate({_id:product_id},{title:title,description:description,price:price,imageurl:imageurl,width:width,hieght:hieght,weight:weight,shippingFee:shippingFee,category:category})
        console.log(check);
        if(check){
            console.log('updated');
        }
        res.render('adminHome')
    } catch (error) {
        console.log(error.message);
        res.render('edit',{message:'please fill the required columns'})
    }
}


const block_product = async (req,res)=>{
    try {
        const product_id = req.params.id
        const check = await Product.findByIdAndUpdate({_id:product_id},{$set:{blockProduct:true}})
         if(check){
            console.log("hiding");
         }
    } catch (error) {
        console.log(error.message);
    }
}
const unblock_product = async (req,res)=>{
    try {
        const product_id = req.params.id
        const check = await Product.findByIdAndUpdate({_id:product_id},{$set:{blockProduct:false}})
        
    } catch (error) {
        console.log(error.message);
    }
}



const product_grid = async (req,res)=>{
    try {
        const dbData = await Product.find({})
        const category = await Category.find({})
        res.render('products',{dbData:dbData,category:category})
    } catch (error) {
        console.log(error.message);
    }
}

const product_delete = async (req,res)=>{
    try {
        const product_id = req.params.id
        const check = await Product.findByIdAndDelete({_id:product_id})
        if(check){
            console.log('The product has been deleted');
        }
        res.render('products',{message:'The product has been deleted permenantly'})
    } catch (error) {
        console.log(error.message);
    }
}





module.exports = {
    // USER PRODUCT CONTROLERS
    product_details,
    show_products_user,
    //ADMIN PRODUCT CONTROLERS
    add_product,
    show_products,
    edit_product,
    change_product,
    product_delete,
    product_grid,
    unblock_product,
    block_product,
    add_to_cart
   
}
