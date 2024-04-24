require('dotenv').config();
const User = require("../models/usersSchema");
const Product = require('../models/productsSchema')
const Category = require('../models/categorySchema')

const admin_auth = async (req,res)=>{
    try {
       const adminEmail = req.body.email;
       const adminPassword = req.body.password;
       console.log(adminEmail);
        if(adminEmail == process.env.EMAIL && adminPassword == process.env.PASSWORD){
            console.log('its here');
            req.session.email = process.env.email;
            res.redirect('/admin/adminHome')
         
            // res.redirect('/admin/adminHome');
        }else if(adminEmail !== process.env.EMAIL || adminPassword !== process.env.PASSWORD){
            console.log(process.env.EMAIL);
            console.log('its here in else')

            res.render('adminLogin',{message:'wrong email or password'});
        }
          
    } catch (error) {
        console.log(error.message); 
    }
}


//USER CONTROLER
const show_user = async (req,res)=>{
    try {
        
        const dbData =  await User.find({ isAdmin: false });
       
        
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
        const dbData = await Category.find({})
        res.render('addProduct',{dbData});
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

    res.render('adminHome');
        
    } catch (error) {
        console.log(error.message);
    }
}

const logout = async (req,res)=>{
    try {
        delete req.session.email
        res.redirect('/admin/admin')
    } catch (error) {
        console.log(error.message);
    }
}


const block_user = async (req,res)=>{
    try {
        const user_id = req.params.id
        const check = await User.findByIdAndUpdate({_id:user_id},{$set:{isBlocked:true}})
      
    } catch (error) {
        console.log(error.message);
    }
}

const unblock_user = async (req,res)=>{
    try {
        const user_id = req.params.id
        console.log(user_id);
        console.log('getiing here');
        const check = await User.findByIdAndUpdate({_id:user_id},{$set:{isBlocked:false}})
        
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    admin_login,
    admin_auth,
    adminHome,
    show_user,
    show_orders,
    add_products_page,
    block_user,
    unblock_user,
    logout,

}

