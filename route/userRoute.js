const express = require('express');
const userRoute = express();
const session = require('express-session');

userRoute.set('view engine','ejs');
userRoute.set('views','./views/user')

userRoute.use(express.json());
userRoute.use(express.urlencoded({extended:true}))
userRoute.use(session({
    secret: 'your-secret-here',
    resave: true,
    saveUninitialized: true
  }));;

const userController = require('../controller/userController');
const checkSession  = require('../midleware/session');
const productController = require('../controller/productControler');

//User Login
userRoute.get('/',checkSession.isLogout,userController.user_login);
userRoute.get('/login',checkSession.isLogout,userController.user_login);
userRoute.post('/login',userController.auth_user);


//User Register
userRoute.get('/register',checkSession.isLogout,userController.user_register);
userRoute.post('/register',userController.create_user)

//Load Home Page
userRoute.get('/Home',checkSession.isLogin,userController.userHome)


//Logout
userRoute.get('/logout',userController.user_logout);


//Otp
userRoute.post('/otp',userController.otp_verify);
userRoute.get('/newOtp',userController.otp_resend);
// userRoute.get('/otpPage',userController.otp_page);


//Products
userRoute.get('/product_details/:id',productController.product_details);
userRoute.get('/showProduct-user/:category',productController.show_products_user);


//ABOUT USER
userRoute.get('/about-user',userController.aboutUser);
userRoute.post('/update-user-info',userController.update_user_info);

//ADD ADRESS
userRoute.get('/add-address-page',userController.add_address_page);
userRoute.post('/add-address',userController.add_address);
userRoute.get('/delete-address/:id',userController.address_delete);
userRoute.get('/edit-address/:id',userController.edit_address_page);
userRoute.post('/update-address',userController.edit_address);


//ADD TO CART
userRoute.get('/add-to-cart/:id',productController.add_to_cart);


module.exports = userRoute;