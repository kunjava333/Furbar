const nodemailer = require("nodemailer");
const otpGenerator = require('otp-generator')

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

sendMail(email,otp)
gloabal = otp;
return otp
}


module.exports = {
       sendOtp,
}