const nodemailer = require("nodemailer");
const otpGenerator = require('otp-generator')

// const send_otp = async (email) => {  
//   try {
//         // res.render('otpVerifyer')
//         let testAccount = await nodemailer.createTestAccount()
//     const otp = Math.floor(Math.random() * 10000);
//     console.log(otp);
//     console.log('things working ');
//     console.log(email);
//     const transporter = nodemailer.createTransport({
//       host: "smtp.gmail.com",
//       port :405,
//       secure: true,
//       auth: {
//         user: "vaseemformoney@gmail.com",
//         pass: "qdhltmtguqlmwavf",
//       },
//     });
//     const mailOption = {
//         from: 'vaseemformoney@gmail.com',
//         to: email , 
//         subject: "This is your otp for Furbar Otp verification",
//         text: `This is your Otp ${otp}`, 
//         html: "<h4>Buddy you are alive</h4>",
//     }

// //      transporter.sendMail({mailOption,function(error,info) {
// //         if(error){
// //                 console.log(error);
// //         }else{
// //                 console.log(`mail is has send to ${info}`);
// //         }
// //      } });
//   } catch (error) {     
//     console.log(error.message);
//   }
// };

let gloabal = null;

const sendMail = (email, otp) => {
  const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
          user: "vaseemformoney@gmail.com",
          pass: "qdhltmtguqlmwavf",
      },
      
  });
//   console.log('hihihih');
  const mailOptions = {
      from: 'vaseemformoney@gmail.com',
      to: email,
      subject: "This is your otp for Furbar Otp verification",
      text: `This is your Otp ${otp}`,
      html: `you are alive this is your otp ${otp}`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
          console.log(error);
      } else {
          console.log(`Mail has been sent to ${info.response}`);
      }
  });
}

function sendOtp (email){
const otp = otpGenerator.generate(4, { upperCaseAlphabets: false, specialChars: false ,digits:true,lowerCaseAlphabets:false});
// setTimeout(()=>{
//     delete otp
// },60000)
sendMail(email,otp)
gloabal = otp;
return otp
}


module.exports = {
       sendOtp,
}