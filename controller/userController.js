const User = require("../models/usersSchema");
const bcrypt = require("bcrypt");
const Otp = require("../controller/otpController");
const Address = require("../models/addressSchema");
const Order = require('../models/orderSchema')
const Cart = require('../models/cartSchema')
const Prodcut = require('../models/productsSchema.js')
const hashPassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (error) {
    console.log(error.message);
  }
};

// const Pcompare = async (password,cPassword) => {
//     try {
//         if (password !== cPassword) {
//           return false
//         } else {
//             return true
//         }
//     } catch (error) {
//         console.log(error.message);
//     }
// }
const Ecompare = async (email1) => {
  try {
    let email = await User.findOne({ email: email1 });
    if (email) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error.message);
  }
};

const userRegister = async (req, res) => {
  try {
    res.render("userRegisger");
  } catch (error) {
    console.log(error.message);
  }
};

const createUser = async (req, res) => {
  try {
    // let Pcheck = await Pcompare(req.body.password, req.body.Cpassword);
    let Echeck = await Ecompare(req.body.email);
    if (Echeck == false) {
      const user = new User({
        name: req.body.username,
        email: req.body.email,
        mobile: req.body.number,
        password: await hashPassword(req.body.password),
        Date: Date.now(),
        isAdmin: false,
        isBlocked: false,
      });
      req.session.userData = user;
      // console.log(req.session.userData);
      const otp = Otp.sendOtp(req.body.email);
    
      console.log(otp);
      if (otp) {
        console.log("they are here");
        req.session.otp = otp;
        setTimeout(()=>{
           req.session.otp = null
        ,60000});
        res.render("otpVerifyer");
      } else {
        console.log("Problem in storing otp in session ");
      }
    } else if (Echeck) {
      res.render("userRegister", { message: "email is altready taken" });
    }
    // else if(Pcheck == false){
    //     res.render('userRegister',{message:'Both password and Conform password are not same'})
    // }
  } catch (error) {
    console.log(error.message);
  }
};

const otpVerify = async (req, res) => {
  try {
    const Otp = req.body.otp1.join("");
    // console.log(req.session)
    if (req.session.otp == Otp) {
      const userData = req.session.userData;
      const user = new User(userData);
      await user.save();
      const dbData = await User.findOne({ email: user.email });
      req.session.user_id = dbData._id;
      req.session.userData = null
      res.redirect("/Home");
    } else {
      res.render("userRegister", {
        message: "There is some problem with registering please try again",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const addAddress = async (req,res)=>{
  try {
    const {user_id} = req.session
    const {name,address,country,city,state,pincode,mobile} = req.body;
    const newAddress = new Address ({
        user_id:user_id,
        name:name,
        address:address,
        country:country,
        city:city,
        state:state,
        pincode:pincode,
        mobile:mobile
    })
    if(newAddress){
      newAddress.save()
      res.render('addAddress',{message:'A new address has been saved'})
    }
  } catch (error) {
    console.log(error.message);
  }
}

const userHome = async (req, res) => {
  try {
    res.render("index");
  } catch (error) {
    console.log(error.message);
  }
};



const userLogin = async (req, res) => {
  try {
    res.render("userLogin");
  } catch (error) {
    console.log(error.message);
  }
};

const aboutUser = async (req,res)=>{
  try {
    const {user_id} = req.session
    const user = await User.find({_id:user_id})
    const address = await Address.find({user_id:user_id})
    const order = Order.find({user_id:user_id})
    // console.log(userData);
    // console.log(addressData);
    const data={
      userData:user,
      addressData:address,
      orderData:order
    }
    res.render('userAccount',{allData:data})
  } catch (error) {
    console.log(error.message);
  }
}

const addAddressPage = async (req,res)=>{
  try {
    res.render('addAddress')
  } catch (error) {
    console.log(error.message);
  }
}

const addressDelete = async (req,res)=>{
  try {
    const id = req.params.id
    const remove = await Address.findByIdAndDelete({_id:id})
    if(remove){
      console.log('things are geting here');
      res.redirect('/about-user')
    }
  } catch (error) {
    console.log(error.message);
  }
}

const editAddressPage = async (req,res)=>{
  try {
    const id = req.params.id
    const userData = await Address.find({_id:id})
    res.render('editAddress',{userData:userData})
  } catch (error) {
    console.log(error.message);
  }
}



const editAddress = async (req,res)=>{
  try {
    const {name,address,country,city,state,pincode,mobile,user_id} = req.body;
    const change = await Address.findByIdAndUpdate({_id:user_id},{$set:{name:name,address:address,country:country,city:city,state:state,pincode:pincode,mobile:mobile}})
    if(change){
      console.log('thins are working here and everywhere');
      res.redirect('/about-user')
    }
  } catch (error) {
    console.log(error.message);
  }
}

const updateUserInfo = async (req,res)=>{
  try {
    const {user_id} = req.session
   const {name,email,oldPassword,newPassword,confirmPassword} = req.body
   const dbData = await User.findById({_id:user_id})
   const password = await hashPassword(newPassword)
   const comparePassword = await bcrypt.compare(
    oldPassword,
    dbData.password
  );
   if(comparePassword){
    const update = await User.findByIdAndUpdate({_id:user_id},{$set:{name:name,email:email,password:password}})
    if(update){
      res.render('userAccount',{message:'your info has been updated'})
    }else{
      res.render('userAccount',{message:'some porblem updating please try again'})
    }
   }else{
    res.render('userAccount',{message:'your old passowrd is wrong'})
   }
  } catch (error) {
    console.log(error.message);
  }
}

const otpResend = async (req, res) => {
  try {
    const { email } = req.session.userData;
    // console.log(email);
    // console.log(req.session.userData);
    // console.log(email);
    const otp = Otp.sendOtp(email);
    console.log(`your new otp ${otp}`);
    req.session.otp = null;
    // console.log(req.session.otp);
    req.session.otp = otp;
    console.log(req.session.otp);
    res.render("otpVerifyer");
  } catch (error) {
    console.log(error.message);
  }
};

const authUser = async (req, res) => {
  try {
    const logEmail = req.body.email;
    const logPassowrd = req.body.password;
    const dbData = await User.findOne({ email: logEmail });
      if (!dbData) {
        res.render("userLogin", { message: "wrong email please try again" });
      }else if(dbData.isBlocked == true){
       res.render('userLogin',{message:"you are restricted"})
      } else {
        const comparePassword = await bcrypt.compare(
          logPassowrd,
          dbData.password
        );

        if (dbData.email == logEmail && comparePassword) {
          req.session.user_id = dbData._id;

          res.redirect("/Home");
        } else if (!comparePassword) {
          res.render("userLogin", { message: "the password is incorrect" });
        }
      }
    
  } catch (error) {
    console.log(error.message);
  }
};

const userLogout = async (req, res) => {
  try {
    req.session.destroy();
    res.redirect("/");
  } catch (error) {
    console.log(error.message);
  }
};


const show_orders = async (req,res)=>{
  try {
    
  } catch (error) {
    console.log(error.message);
  }
}

const placeOrder = async (req,res)=>{
  try {
    const {name,country,address,city,district,pincode,mobile,email} = req.body
    const {user_id} = req.session
    const cart = await Cart.findOne({user_id:user_id})
    const array = cart.orders
    console.log(array[0]);
    const order = new Order({
      user_id:user_id,
      items:[{
        productId:array[0].productId,
        quantity:array[0].quantity,
        total:array[0].total
      }],
      date: new Date(),
      status:'pinding',
      email:email,
      address:{
        name:name,
        address:address,
        country:country,
        city:city,
        district:district,
        pincode:pincode,
        mobile:mobile
      },
      paymentMethod:'cash on delivery'
    })
     
    const ordered = order.save()
    if(ordered){
      if(array.length>1){
        for(let i=1;i<array.length;i++){
          const update = await Order.findOneAndUpdate({user_id:user_id },{ $push: { items: { productId: array[i].productId, quantity: array[i].quantity ,total:array[i].total} } })
  
        }
      }
      await Cart.findOneAndDelete({_id:cart._id})
      setTimeout(()=>{
        res.redirect('/')

      },2100)
      
    }

  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  userLogin,
  userRegister,
  createUser,
  authUser,
  otpVerify,
  userHome,
  userLogout,
  otpResend,
  aboutUser,
  updateUserInfo,
  addAddressPage,
  addAddress,
  addressDelete,
  editAddressPage,
  editAddress,
  placeOrder
};
