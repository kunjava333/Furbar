require('dotenv').config();
const User = require("../models/usersSchema");
const Order = require('../models/orderSchema')
const Category = require('../models/categorySchema')

const adminAuth = async (req,res)=>{
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
const showUser = async (req,res)=>{
    try {
        
        const dbData =  await User.find({ isAdmin: false });
       
        
        res.render('Controler',{dbData:dbData})

    } catch (error) {
        console.log(error.message);
    }
}

//ORDERS
const showOrders = async (req,res)=>{
    try {
        const order = await Order.find({})
        // console.log(order[0]._id);
        res.render('ordersPage',{orderData:order})
    } catch (error) {
        console.log(error.message);
    }
}

//ADD PRODUCTS
const addProductsPage = async (req,res)=>{
    try {
        const dbData = await Category.find({})
        res.render('addProduct',{dbData});
    } catch (error) {
        console.log(error.message);
    }
}

//ADMIN LOGIN
const adminLogin = async (req,res)=>{
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
        req.session.email = null;
        res.redirect('/admin/admin')
    } catch (error) {
        console.log(error.message);
    }
}


const blockUser = async (req,res)=>{
    try {
        const user_id = req.params.id
        const check = await User.findByIdAndUpdate({_id:user_id},{$set:{isBlocked:true}})
      
    } catch (error) {
        console.log(error.message);
    }
}

const unblockUser = async (req,res)=>{
    try {
        const user_id = req.params.id
        console.log(user_id);
        console.log('getiing here');
        const check = await User.findByIdAndUpdate({_id:user_id},{$set:{isBlocked:false}})
        
    } catch (error) {
        console.log(error.message);
    }
}


const orderDetails = async (req,res)=>{
    try {
        const {id} = req.query

        const detail = await Order.findById({_id:id}).populate('items.productId')

        console.log(detail);
        res.render('orderDetails',{detailData:detail})
    } catch (error) {
        console.log(error.message);
    }
}

const changeStatus = async (req,res) => {
    try {
        const {status,id} = req.query
        console.log(id,status);
        const update = await Order.findOneAndUpdate({_id:id},{status:status});
    } catch (error) {
        console.log(error.message);
    }
}


module.exports = {
    adminLogin,
    adminAuth,
    adminHome,
    showUser,
    showOrders,
    addProductsPage,
    blockUser,
    unblockUser,
    logout,
    orderDetails,
    changeStatus
}

