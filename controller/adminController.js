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
        res.render('products')
    } catch (error) {
        console.log(error.message);
    }
}




//USER CONTROLER
const show_user = async (req,res)=>{
    try {
        const dbData =  User.findOne({ isAdmin: false });
        res.render('Controler',{message:dbData})
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
        const user_id = req.params.id
        console.log(user_id);
        const dbData = await Product.findOne({_id:user_id})
        console.log(dbData);
        res.render('edit',{dbData:dbData})
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
    edit_product

}

