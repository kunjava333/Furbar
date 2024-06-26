const express = require('express');
const userRoute = express();
const session = require('express-session');

userRoute.set('view engine','ejs');
userRoute.set('views','./views/user')

userRoute.use(express.json());
userRoute.use(express.urlencoded({extended:true}))
userRoute.use(session({
    secret: 'process.env.SESSION-PASS',
    resave: false,
    saveUninitialized: true
  }));;


  //CONTROLLS

const userController = require('../controller/userController');
const checkSession  = require('../middleware/session');
const productController = require('../controller/productControler');
const paymentController = require('../controller/paymentController');
const coupenController = require('../controller/coupenController');
const wishlistController = require('../controller/wishlistController');

//User Login
userRoute.get('/',checkSession.isLogout,userController.userLogin);
userRoute.get('/login',checkSession.isLogout,userController.userLogin);
userRoute.post('/login',userController.authUser);


//User Register
userRoute.get('/register',checkSession.isLogout,userController.userRegister);
userRoute.post('/register',userController.createUser)

//Load Home Page
userRoute.get('/Home',checkSession.isLogin,userController.userHome)


//Logout
userRoute.get('/logout',userController.userLogout);


//Otp
userRoute.post('/otp',userController.otpVerify);
userRoute.get('/newOtp',userController.otpResend);
// userRoute.get('/otpPage',userController.otp_page);


//Products
userRoute.get('/product_details/:id',checkSession.isLogin,productController.productDetails);
userRoute.get('/products',checkSession.isLogin,productController.showProductsUser);


//ABOUT USER
userRoute.get('/about-user',checkSession.isLogin,userController.aboutUser);
userRoute.post('/update-user-info',userController.updateUserInfo);


//ADD ADRESS
userRoute.get('/add-address-page',checkSession.isLogin,userController.addAddressPage);
userRoute.post('/add-address',userController.addAddress);
userRoute.get('/delete-address/:id',checkSession.isLogin,userController.addressDelete);
userRoute.get('/edit-address/:id',checkSession.isLogin,userController.editAddressPage);
userRoute.post('/update-address',userController.editAddress);


//ADD TO CART
userRoute.get('/add-to-cart',checkSession.isLogin,productController.addToCart);
userRoute.get('/increase-quantity',checkSession.isLogin,productController.increaseQuantity)
userRoute.get('/check-cart',checkSession.isLogin,productController.checkCart);

userRoute.get('/cart',checkSession.isLogin,productController.cartPage);
userRoute.get('/update-cart',checkSession.isLogin,userController.updateCart);

// userRoute.get('/add-orders',checkSession.isLogin,productController.addOrders)
userRoute.get('/checkout',checkSession.isLogin,productController.showCheckout)
userRoute.post('/order',userController.placeOrder);
userRoute.get('/remove-cart',checkSession.isLogin,productController.removeCart);


userRoute.get('/order-detail',checkSession.isLogin,userController.orderDetail);
userRoute.get('/cancel-order',checkSession.isLogin,userController.cancelOrder);


userRoute.get('/sort-products',checkSession.isLogin,userController.sortProduct)
userRoute.get('/initiate-order',paymentController.createOrder)

userRoute.post('/verify-payment',paymentController.verifyPayment);

userRoute.get('/apply-coupen',checkSession.isLogin,coupenController.applyCoupen);



userRoute.get('/wishlist',checkSession.isLogin,wishlistController.showWishlist);
userRoute.get('/wishlist-add',checkSession.isLogin,wishlistController.addToWishlist);

userRoute.get('/wishlist-to-cart',checkSession.isLogin,wishlistController.wishToCart);
userRoute.get('/remove-from-wish',checkSession.isLogin,wishlistController.removeFromWishlist)


module.exports = userRoute;