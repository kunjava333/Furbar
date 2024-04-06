const User = require("../models/usersSchema");
const bcrypt = require("bcrypt");
const Otp = require("../controller/otpController");
const Product = require('../models/productsSchema');

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

const user_register = async (req, res) => {
  try {
    res.render("userRegister");
  } catch (error) {
    console.log(error.message);
  }
};

const create_user = async (req, res) => {
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
        console.log('they are here');
        req.session.otp = otp;
        // console.log(req.session.otp);
        // setTimeout(()=>{
        //   delete req.session.otp
        // },60000)
      res.render('otpVerifyer');
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

const otp_verify = async (req, res) => {
  try {
    const Otp = req.body.otp1.join("");
    // console.log(req.session)
    if (req.session.otp == Otp) {
      const userData = req.session.userData;
      const user = new User(userData)
      await user.save()
      const dbData = await User.findOne({email:user.email})
      req.session.user_id = dbData._id
      delete req.session.userData
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

const userHome = async (req, res) => {
  try {
    res.render("index");
  } catch (error) {
    console.log(error.message);
  }
};

const products_page = async(req,res)=>{
  try {
    res.render('products')
  } catch (error) {
    console.log(error.message);
  }
}

const user_login = async (req, res) => {
  try {
    res.render("userLogin");
  } catch (error) {
    console.log(error.message);
  }
};


const otp_resend = async (req,res)=>{
 
  try {
    const {email} = req.session.userData
    // console.log(email);
    // console.log(req.session.userData);
    // console.log(email);
    const otp = Otp.sendOtp(email);
    console.log(`your new otp ${otp}`);
    delete req.session.otp;
    // console.log(req.session.otp);
    req.session.otp = otp
    console.log(req.session.otp);
    res.render('otpVerifyer')
  } catch (error) {
    console.log(error.message);
  }

}



const auth_user = async (req, res) => {
  try {
    const logEmail = req.body.email;
    const logPassowrd = req.body.password;
    const dbData = await User.findOne({ email: logEmail });
    if (!dbData) {
      res.render("userLogin", { message: "wrong email please try again" });
    } else {
      const comparePassword = await bcrypt.compare(
        logPassowrd,
        dbData.password
      );

      if (dbData.email == logEmail && comparePassword) {
        req.session.user_id = dbData._id
        res.redirect("/Home");
      } else if (!comparePassword) {
        res.render("userLogin", { message: "the password is incorrect" });
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};

const user_logout = async(req,res)=>{
  try {
     req.session.destroy();
     res.redirect('/')
  } catch (error) {
    console.log(error.message);
  }
}


const show_sofa = async (req,res)=>{
  try {
    const dbData = await Product.find({category:'Sofa'})
    res.render('shop',{dbData:dbData})
  } catch (error) {
    console.log(error.message);
  }
}




const show_sideBoard = async (req,res)=>{
  try {
    const dbData = await Product.find({category:'Sideboard'})
    res.render('shop',{dbData:dbData})
  } catch (error) {
    console.log(error.message);
  }
}





const show_lampLight = async (req,res)=>{
  try {
    const dbData = await Product.find({category:'Lamp light'})
    console.log(dbData);
    res.render('shop',{dbData:dbData})
  } catch (error) {
    console.log(error.message);
  }
}




// const otp_page = (req,res)=>{
//   try {
//     otp_resend()
//     res.render('otpVerifyer');
//   } catch (error) {
//     console.log(error.message);
//   }
 
// }

const product_details = async (req,res)=>{
  try {
    res.render('productDetail')
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  user_login,
  user_register,
  create_user,
  auth_user,
  otp_verify,
  userHome,
  user_logout,
  otp_resend,
  // otp_page,
  products_page,
  product_details,
  show_sofa,
  show_sideBoard,
  show_lampLight,

};
