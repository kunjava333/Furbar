const express = require('express');
const adminRoute = express();
const session = require('express-session');
// const path = require('path')


adminRoute.set('view engine','ejs');
adminRoute.set('views','./views/admin')

adminRoute.use(express.json());
adminRoute.use(express.urlencoded({extended:true}))
adminRoute.use(session({
    secret: 'qdhltmtguqlmwavf',
    resave: false,
    saveUninitialized: true,
}));;




const adminController = require('../controller/adminController')
const upload = require('../midleware/multer')


adminRoute.get('/',adminController.admin_login);
adminRoute.post('/adminLog',adminController.admin_auth)
adminRoute.get('/adminHome',adminController.adminHome)

//SHOW USERS AND CONTROLL USER
adminRoute.get('/users1',adminController.show_user);
adminRoute.get('/block/:id',adminController.block_user);
adminRoute.get('/unblock/:id',adminController.unblock_user)

//SHOW PRODUCTS
adminRoute.get('/product-list1',adminController.product_grid);
adminRoute.post('/showProduct',adminController.show_products);

//SHOW ORDERS
adminRoute.get('/order-list1',adminController.show_orders);

//ADD PRODUCTS AND EDIT PRODUCTS
adminRoute.get('/add-product',adminController.add_products_page);
adminRoute.post('/add-product',upload.single('image'),adminController.add_product)
adminRoute.get('/edit/:id',adminController.edit_product);
adminRoute.post('/edit-product/:id',adminController.change_product);
adminRoute.get('/remove/:id',adminController.product_delete);


adminRoute.get('*',(req,res)=>{  
    res.redirect('/admin')
    
});

module.exports = adminRoute;
