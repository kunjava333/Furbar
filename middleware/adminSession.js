const User = require('../models/usersSchema');
const isLogin = async (req, res, next) => {
    try {
      if (req.session.email) {
        next()
      } else {
      return res.redirect('/admin');   
      }
    } catch (error) { 
      console.log(error.message);
    }
  };
  
  const isLogout = async (req, res, next) => {
    try {
      if (req.session.email) {
       return res.redirect('/Home'); 
        
      } else {
        next();
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  
  module.exports = {
    isLogin,
    isLogout
  };
  