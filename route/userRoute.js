const express = require('express');
const userRoute = express();
const session = require('express-session');

userRoute.set('view engine','ejs');
userRoute.set('views','./views/user')

userRoute.use(express.json());
userRoute.use(express.urlencoded({extended:true}))
userRoute.use(session({
    secret: 'your-secret-here',
    resave: false,
    saveUninitialized: true,
  }));;

const userController = require('../controller/userController');
const checkSession  = require('../midleware/session');


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
userRoute.get('/produts',userController.products_page);
userRoute.get('/product_details/:id',userController.product_details);
userRoute.get('/showSideboard',userController.show_sideBoard);
userRoute.get('/showSofa',userController.show_sofa);
userRoute.get('/showLamplight',userController.show_lampLight);



module.exports = userRoute;