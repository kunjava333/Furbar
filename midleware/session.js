const User = require('../models/usersSchema');
const isLogin = async (req, res, next) => {
    try {
      if (req.session.user_id) {
        const {user_id} = req.session;
        const dbData = await User.findOne({_id:user_id})
       if(dbData && dbData.isBlocked == true){
        delete req.session.user_id
        res.redirect('/')
       }else{
        next()
       }
      } else {
      return res.redirect('/');   
      }
    } catch (error) { 
      console.log(error.message);
    }
  };
  
  const isLogout = async (req, res, next) => {
    try {
      if (req.session.user_id) {
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
  