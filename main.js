const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Furbar_Ecommerce').then(()=>console.log('connected to db')).catch(()=>console.log('error connecting to db'))

const express = require('express');
const PORT = process.env.PORT || 7000

const path = require('path')
const app = express();
const adminRoute = require('./route/adminRoute')
app.use('/admin',adminRoute)
console.log(PORT);

const userRoute = require('./route/userRoute')
app.use('/',userRoute)

app.use(express.static(path.join(__dirname,'public')))
app.use("/assets",express.static(path.join(__dirname,"public/user/assets")))
app.use("/assets",express.static(path.join(__dirname,"public/admin/assets")))
app.use('/images', express.static(path.join(__dirname, 'images')));




    



app.listen(PORT,()=>console.log('connected to port'));  