const Razorpay = require('razorpay'); 
const crypto = require('crypto');
const { status } = require('express/lib/response');
const {RAZORPAY_API_KEYID,RAZORPAY_API_SECRETID} = process.env

const razorpayInstance = new Razorpay({
    key_id: RAZORPAY_API_KEYID,
    key_secret: RAZORPAY_API_SECRETID,
});

const createOrder = async (req,res)=>{
    try {
        console.log(RAZORPAY_API_KEYID,RAZORPAY_API_SECRETID);
        const {price} = req.query
        const money = price.slice(1);
        const amount = money
        const options = {
            amount: amount,
            currency: 'USD',
            receipt: 'vaseemformoney@gmail.com'
        }
        razorpayInstance.orders.create(options,(err,order) => {
                if(!err){
                    res.status(200).json({
                        success:true,
                        msg:'Order Created',
                        order_id:order.id,
                        amount:amount,
                        key_id: RAZORPAY_API_KEYID,
                        contact:"7907262414",
                        name: "Vaseem Jahfer",
                        email: "vaseemformoney@gmail.com",
                    });
                }
                else{
                    console.log(err);
                    res.status(400).json({success:false,msg:'Something went wrong!'});
                }
            }
        );

    } catch (error) {
        console.log(error.message);
    }
}

function verifyRazorpaySignature(payload, razorpaySignature, webhookSecret) {
    const expectedSignature = crypto
        .createHmac('sha256', webhookSecret)
        .update(payload, 'utf8')
        .digest('hex');
    
    return expectedSignature === razorpaySignature;
}

const verifyPayment = async (req,res) => {
    try {
        const status_code = req.body.status_code;
        const payload = JSON.stringify(req.body);
        const razorpaySignature = req.headers['x-razorpay-signature'];
        const webhookSecret = RAZORPAY_API_SECRETID; // Replace with your actual webhook secret
    console.log(payload,razorpaySignature,webhookSecret);
        if (verifyRazorpaySignature(payload, razorpaySignature, webhookSecret) || status_code == 200) {
            console.log('Signature verified successfully');
            res.status(200).send({ success: 'Verified' });
        } else {
            console.log('Failed');
            res.status(400).failed('Invalid signature');
        }
    } catch (error) {
        console.log(error.message);
    }
}



module.exports = {
    createOrder,
    verifyPayment
}