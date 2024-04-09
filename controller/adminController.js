require('dotenv').config();
const User = require("../models/usersSchema");
const Product = require('../models/productsSchema')

const admin_auth = async (req,res)=>{
    try {
       const adminEmail = req.body.email;
       const adminPassword = req.body.password;
       console.log(adminEmail,adminPassword);
       console.log(process.env.EMAIL,process.env.PASSWORD);
        if(adminEmail == process.env.email && adminPassword == process.env.password){
            console.log('its here');
            res.redirect('/admin/adminHome')
         
            // res.redirect('/admin/adminHome');
        }else if(adminEmail !== process.env.email || adminPassword !== process.env.password){
            console.log('its here in else');
            res.render('adminLogin',{message:'wrong email or password'});
        }
          
            
    } catch (error) {
        console.log(error.message); 
    }
}

//PRODUCTS
const product_grid = async (req,res)=>{
    try {
        const dbData = await Product.find({})
        res.render('products',{dbData:dbData})
    } catch (error) {
        console.log(error.message);
    }
}




//USER CONTROLER
const show_user = async (req,res)=>{
    try {
        const dbData =  await User.find({ isAdmin: false });
        console.log(dbData);
        res.render('Controler',{dbData:dbData})
    } catch (error) {
        console.log(error.message);
    }
}

//ORDERS
const show_orders = async (req,res)=>{
    try {
        res.render('ordersPage')
    } catch (error) {
        console.log(error.message);
    }
}

//ADD PRODUCTS
const add_products_page = async (req,res)=>{
    try {
        res.render('addProduct');
    } catch (error) {
        console.log(error.message);
    }
}

//ADMIN LOGIN
const admin_login = async (req,res)=>{
    try {
    res.render('adminLogin');
        
    } catch (error) {
        console.log(error.message);
    }
}

//ADMIN HOME
const adminHome = async (req,res)=>{
    try {
        console.log('dfgdfzgdfgdsfgdfsg')
    res.render('adminHome');
        
    } catch (error) {
        console.log(error.message);
    }
}

//ADD PRODUCT CONTROLER
const add_product = async (req,res)=>{
    try {
     const product = new Product({
        title:req.body.title,
        description:req.body.description,
        price:req.body.price,
        date:Date.now(),
        imageurl:req.file.path,  
        width:req.body.width,
        hieght:req.body.hieght,
        weight:req.body.weight,
        shippingFee:req.body.shippingFee,
        category:req.body.category,
     })
     console.log(product.width,product.hieght);
     if(product){
        const check = await product.save()
        if(check){
            res.render('addProduct',{message:'woked very well'})
         }else {
            res.render('addProduct',{message:'some problem in addin product please try again'})
         }
     }
    } catch (error) {
        console.log(error.message);
    }
}

const show_products = async (req,res)=>{
    try {
        const category = req.body.category;
        console.log(category);
        const dbData = await Product.find({category:category})
        // console.log(dbData);
        
        res.render('products',{dbData:dbData})
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

const block_user = async (req,res)=>{
    try {
        const user_id = req.params.id
        const check = await User.findByIdAndUpdate({_id:user_id},{$set:{isBlocked:true}})
        if(check){
            console.log('blocked');
            res.redirect('/admin/users1')
        }
    } catch (error) {
        console.log(error.message);
    }
}

const unblock_user = async (req,res)=>{
    try {
        const user_id = req.params.id
        const check = await User.findByIdAndUpdate({_id:user_id},{$set:{isBlocked:false}})
        if(check){
            console.log('unblocked');
            res.redirect('/admin/users1')
        }
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    admin_login,
    admin_auth,
    adminHome,
    show_user,
    product_grid,
    show_orders,
    add_products_page,
    add_product,
    show_products,
    edit_product,
    change_product,
    product_delete,
    block_user,
    unblock_user,

}

