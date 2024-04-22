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



const adminSession = require('../midleware/adminSession')
const adminController = require('../controller/adminController')
const upload = require('../midleware/multer')
const productControler = require('../controller/productControler')
const categoryControler = require('../controller/categoryControler')

adminRoute.get('/',adminController.admin_login);
adminRoute.post('/adminLog',adminController.admin_auth)
adminRoute.get('/adminHome',adminController.adminHome)

//SHOW USERS AND CONTROLL USER
adminRoute.get('/users1',adminController.show_user);
adminRoute.get('/block/:id',adminController.block_user);
adminRoute.get('/unblock/:id',adminController.unblock_user)

//SHOW PRODUCTS
adminRoute.get('/product-list1',productControler.product_grid);
adminRoute.post('/showProduct',productControler.show_products);

//BLOCK AND UNBLOCK PRODUCT
adminRoute.get('/Hide/:id',productControler.block_product)
adminRoute.get('/Show/:id',productControler.unblock_product)


//SHOW ORDERS
adminRoute.get('/show-orders',adminController.show_orders);



//ADD PRODUCTS AND EDIT PRODUCTS
adminRoute.get('/add-product',adminController.add_products_page);
adminRoute.post('/add-product',upload.array('image',4),productControler.add_product)
adminRoute.get('/edit/:id',productControler.edit_product);
adminRoute.post('/edit-product/:id',productControler.change_product);
adminRoute.get('/remove/:id',productControler.product_delete);



//CATEGORY CONTROLER
adminRoute.get('/categoryManegement',categoryControler.category_page);
adminRoute.get('/addCategory',categoryControler.add_category_page);
adminRoute.post('/adddCategory',categoryControler.add_category);
adminRoute.get('/unlist/:id',categoryControler.unlist_category);
adminRoute.get('/list/:id',categoryControler.list_category);

adminRoute.get('*',(req,res)=>{   
    res.redirect('/admin')
    
});

module.exports = adminRoute;
