const express = require('express');

const adminRoute = express();
const session = require('express-session');
// const path = require('path')


adminRoute.set('view engine','ejs');
adminRoute.set('views','./views/admin')

adminRoute.use(express.json());
adminRoute.use(express.urlencoded({extended:true}))
adminRoute.use(session({
    secret: 'process.env.SESSION-PASS',
    resave: false,
    saveUninitialized: true,
}));;



const adminSession = require('../midleware/adminSession')
const adminController = require('../controller/adminController')
const upload = require('../midleware/multer')
const productControler = require('../controller/productControler')
const categoryControler = require('../controller/categoryControler')

adminRoute.get('/',adminController.adminLogin);
adminRoute.post('/adminLog',adminController.adminAuth)
adminRoute.get('/adminHome',adminController.adminHome)

//SHOW USERS AND CONTROLL USER
adminRoute.get('/users1',adminController.showUser);
adminRoute.get('/block/:id',adminController.blockUser);
adminRoute.get('/unblock/:id',adminController.unblockUser)

//SHOW PRODUCTS
adminRoute.get('/product-list1',productControler.productGrid);
adminRoute.post('/showProduct',productControler.showProducts);

//BLOCK AND UNBLOCK PRODUCT
adminRoute.get('/Hide/:id',productControler.blockProduct)
adminRoute.get('/Show/:id',productControler.unblockProduct)


//SHOW ORDERS
adminRoute.get('/show-orders',adminController.showOrders);



//ADD PRODUCTS AND EDIT PRODUCTS
adminRoute.get('/add-product',adminController.addProductsPage);
adminRoute.post('/add-product',upload.array('image',4),productControler.addProduct)
adminRoute.get('/edit/:id',productControler.editProduct);
adminRoute.post('/edit-product/:id',productControler.changeProduct);
adminRoute.get('/delete/:id',productControler.productDelete);



//CATEGORY CONTROLER
adminRoute.get('/categoryManegement',categoryControler.categoryPage);
adminRoute.get('/addCategory',categoryControler.addCategoryPage);
adminRoute.post('/adddCategory',categoryControler.addCategory);
adminRoute.get('/unlist/:id',categoryControler.unlistCategory);
adminRoute.get('/list/:id',categoryControler.listCategory);


adminRoute.get('/order-details',adminController.orderDetails);

adminRoute.get('*',(req,res)=>{   
    res.redirect('/admin')
    
});

module.exports = adminRoute;
