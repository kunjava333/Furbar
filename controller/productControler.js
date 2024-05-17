// const User = require("../models/usersSchema");
const Product = require("../models/productsSchema");
const Category = require('../models/categorySchema')
const Cart = require('../models/cartSchema');
const Adress = require('../models/addressSchema.js')
const Orders = require('../models/orderSchema.js')
const User = require('../models/usersSchema.js')

//USER SIDE OF CONTROLING PRODUCT

const showProductsUser = async (req, res) => {
    try {

        const dbData = await Product.find({ })
        res.render('shop', { dbData: dbData })
    } catch (error) {
        console.log(error.message);
    }
}

const sortProduct = async (req,res) => {
    try {
        const {sort} = req.query;

        const data = await Product.find({})

    } catch (error) {
        console.log(error.message);
    }
}


const checkCart = async (req, res) => {
    try {
        const { user_id } = req.session
        const { id } = req.query
        console.log(typeof id);
        // console.log(req.session);
        const cart = await Cart.findOne({ user_id: user_id })
        // console.log(cart);
        // console.log(cart.orders[0].productId);

        if (!cart) {
            res.json(10)
        } else if (cart) {
            // console.log(cart);
            const productIds = await cart.orders.map(order => order.productId.toHexString());
            // console.log(productIds);
            if (productIds.includes(id)) {
                res.json(11)
            } else if (!productIds.includes(id)) {
                res.json(10)
            }
        }
    } catch (error) {
        console.log(error.message + 'not from here');
    }
}


const addToCart = async (req, res) => {
    try {
        const {id,limit} = req.query
        // console.log(limit,id);
        // console.log(`id is here ${typeof id}` );
        const count = parseInt(limit)
        const { user_id } = await (req.session);
        const check = await Cart.findOne({ user_id: user_id })
        const product = await Product.findById({_id:id})
        // console.log(product.price);
        // let a = 0;
        if (!check) {
            const cart = new Cart({
                user_id: user_id,
                orders: [{
                    productId: id,
                    quantity: limit,
                }]
            })
            const result = await cart.save()
            if (result) {
                console.log('thi is working ');
                // a = 1
            }
        } else {

            const update = await Cart.findOneAndUpdate({ user_id: user_id }, { $push: { orders: { productId: id, quantity: limit} } })
            if (update) {
                // a = 1
            }
        }

        // if (a == 1) {
        //     Product.findOneAndUpdate(
        //         { _id: id },
        //         { $inc: { stock: -limit } },
        //         { new: true }
        //     )
        //         .then(updatedProduct => {

        //         })
        //         .catch(error => {
        //         });
        // }


    } catch (error) {
        console.log(error.message + 'its from here');
    }
}

const increaseQuantity = async (req, res) => {
    try {
        const { id } = req.query
        const { user_id } = req.session
        const check = await Cart.findOne({ user_id: user_id })
        console.log(check);
        const data = check.orders.find((p) => {
            return p.productId.equals(id)
        })
        data.quantity++
        check.save()
        Product.findOneAndUpdate(
            { _id: id },
            { $inc: { stock: -quantity+1}},
            { new: true }
        )
            .then(updatedProduct => {

            })
            .catch(error => {
            });
    } catch (error) {
        console.log(error.message);
    }
}

// const addOrders = async (req, res) => {
//     try {
//         const { id, count, total } = req.query
//         const { user_id } = req.session
//         console.log(req.session);
//         console.log(id, count, total);
//         const orderDb = await Orders.findOne({ user_id: user_id })
//         if (!orderDb) {
//             const order = new Orders({
//                 user_id: user_id,
//                 orders: [{
//                     productId: id,
//                     quantity: count,
//                     productTotal: total
//                 }]
//             })
//             const check = order.save()
//             if (check) {
//                 console.log('the product has been added to the orders collection');
//             }
//         }
//         //  else if (orderDb) {
//         //     const update = await Orders.findOneAndUpdate({ user_id: user_id }, { $push: { orders: { productId: id, quantity: count, productTotal: total } } })
//         // }
//         console.log('this req is here ');
//     } catch (error) {
//         console.log(error.message);
//     }
// }


const show_lampLight = async (req, res) => {
    try {
        const dbData = await Product.find({ category: "Lamp light" });
        const category = await Category.find({})
    } catch (error) {
        console.log(error.message);
    }
};

const productDetails = async (req, res) => {
    try {
        const produtc_id = req.params.id;
        const dbData = await Product.find({ _id: produtc_id });
        // console.log(dbData);
        res.render("productDetail", { dbData: dbData });
    } catch (error) {
        console.log(error.message);
    }
};
//ADD PRODUCT CONTROLER
// ADMIN SIDE OF CTROLING PRODUCT
const addProduct = async (req, res) => {
    try {
        console.log(req.body);
        const product = new Product({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            date: Date.now(),
            imageurl: req.files.map(file => file.filename),
            width: req.body.width,
            hieght: req.body.hieght,
            weight: req.body.weight,
            shippingFee: req.body.shippingFee,
            category: req.body.category,
            blockProduct: false,
            stock: req.body.stock
        })


        if (product) {
            const check = await product.save()
            const dbData = await Category.find({})
            if (check) {
                res.render('addProduct', { message: 'The product has been added', dbData })
            } else {
                res.render('addProduct', { message: 'some problem in adding product please try again' })
            }
        } else {
            res.render('addProduct', { message: 'please fill the full required columns' })
        }
    } catch (error) {
        console.log(req.file);
        console.log(error.message);
        res.render('addProduct', { message: 'please fill all the rqeuried columns' })
    }
}

const showProducts = async (req, res) => {
    try {
        const categoriy = req.body.category;
        const dbData = await Product.find({ category: categoriy })
        const category = await Category.find({})
        // console.log(category);
        // res.send({dbData})
        res.status(200).json(dbData)
        // res.render('products',{dbData:dbData,category:category})
    } catch (error) {
        console.log(error.message);
    }
}

const editProduct = async (req, res) => {
    try {
        console.log('things are here');
        const product_id = req.params.id
        // console.log(user_id);
        const dbData = await Product.findOne({ _id: product_id })
        // console.log(dbData);
        res.render('edit', { dbData: dbData })
    } catch (error) {
        console.log(error.message);
    }
}
const changeProduct = async (req, res) => {
    try {
        const product_id = req.params.id
        console.log(product_id);
        const { title, description, price, imageurl, width, hieght, weight, shippingFee, category, stock } = req.body;
        const check = await Product.findByIdAndUpdate({ _id: product_id }, { title: title, description: description, price: price, imageurl: imageurl, width: width, hieght: hieght, weight: weight, shippingFee: shippingFee, category: category,stock:stock })
        console.log(check);
        if (check) {
            console.log('updated');
        }
        res.render('adminHome')
    } catch (error) {
        console.log(error.message);
        res.render('edit', { message: 'please fill the required columns' })
    }
}


const blockProduct = async (req, res) => {
    try {
        const product_id = req.params.id
        const check = await Product.findByIdAndUpdate({ _id: product_id }, { $set: { blockProduct: true } })
        if (check) {
            console.log("hiding");
        }
    } catch (error) {
        console.log(error.message);
    }
}
const unblockProduct = async (req, res) => {
    try {
        const product_id = req.params.id
        const check = await Product.findByIdAndUpdate({ _id: product_id }, { $set: { blockProduct: false } })

    } catch (error) {
        console.log(error.message);
    }
}



const productGrid = async (req, res) => {
    try {
        const dbData = await Product.find({})
        const category = await Category.find({})
        res.render('products', { dbData: dbData, category: category })
    } catch (error) {
        console.log(error.message);
    }
}

const productDelete = async (req, res) => {
    try {
        const product_id = req.params.id
        const check = await Product.findByIdAndDelete({ _id: product_id })
        if (check) {
            console.log('The product has been deleted');
        }
        res.render('products', { message: 'The product has been deleted permenantly' })
    } catch (error) {
        console.log(error.message);
    }
}


const cartPage = async (req, res) => {
    try {
        const { user_id } = req.session
        const cartData = await Cart.findOne({ user_id:user_id }).populate('orders.productId')
        // console.log(cartData.orders);
        if(!cartData || !cartData.orders.length){
            res.render('emptyCart')
        }else if(cartData){
            res.render('cart',{cartData:cartData})

        }
    } catch (error) {
        console.log(error.message);
    }
}

const showCheckout = async (req,res)=>{
    try {
        const {user_id} = req.session;
        // const {count} = req.query;
        const userData  = await User.findOne({_id:user_id})
        const addressData = await Adress.find({user_id:user_id})
        const cartData = await Cart.findOne({ user_id:user_id }).populate('orders.productId')
        // console.log(cartData);
        const sum = cartData.orders.reduce((accumulator, currentValue) => accumulator += (currentValue.productId.price * currentValue.quantity),0);
        console.log(sum);
        const fulData = {
            cart:cartData,
            address:addressData,
            user:userData,
            total:sum,
        }
        // console.log(fulData.cart.orders);
        res.render('checkout',{data:fulData})
    } catch (error) {
        
    }
}


const removeCart = async (req,res)=>{
    try {
      const {user_id} = req.session
      const {id} = req.query
        const user = await Cart.findOneAndUpdate({user_id:user_id},{$pull:{orders:{productId:id}}})
        if(user){
            console.log('this is working like hell');
            res.redirect('/cart');
        }
    } catch (error) {
        console.log(error.message);
    }
}


module.exports = {
    // USER PRODUCT CONTROLERS
    productDetails,
    showProductsUser,
    checkCart,
    addToCart,
    cartPage,
    increaseQuantity,
    // addOrders,
    //ADMIN PRODUCT CONTROLERS
    addProduct,
    showProducts,
    editProduct,
    changeProduct,
    productDelete,
    productGrid,
    unblockProduct,
    blockProduct,
    showCheckout,
    removeCart
}
