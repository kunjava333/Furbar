const { findOneAndUpdate } = require("../models/addressSchema");
const Coupen = require("../models/coupenSchema");

const coupenPage = async (req, res) => {
  try {
    const data = await Coupen.find({});
    res.render("coupenManegement", { data: data });
  } catch (error) {
    console.log(error.message);
  }
};

const coupenAddPage = async (req, res) => {
  try {
    res.render("addCoupen");
  } catch (error) {
    console.log(error.message);
  }
};

const addCoupen = async (req, res) => {
  try {
    const { name, code, min, discount, date, description } = req.body;
    const data = await Coupen.findOne({
      $and: [{ code: code }, { name: name }],
    });
if(data){
    const coupen = new Coupen({
        name: name,
        description: description,
        code: code,
        minAmmount: min,
        discAmmount: discount,
        expiryDate: date,
        status: true,
      });
  
      const check = coupen.save();
  
      res.redirect("/admin/coupen-manegement");
}else{
    res.render('addCoupen',{message:"the name or code is altready taken"})
}
 
  } catch (error) {
    console.log(error.message);
  }
};

const unlistCoupen = async (req, res) => {
  try {
    const { id } = req.query;
    const data = await Coupen.findOneAndUpdate({ _id: id }, { status: false });
    console.log("done");
    res.redirect("/admin/coupen-manegement");
  } catch (error) {
    console.log(error.message);
  }
};

const listCoupen = async (req, res) => {
  try {
    const { id } = req.query;
    console.log(id);
    const data = await Coupen.findOneAndUpdate({ _id: id }, { status: true });
    res.redirect("/admin/coupen-manegement");
  } catch (error) {
    console.log(error.message);
  }
};

const applyCoupen = async (req, res) => {
  try {
    const { code } = req.query;
    console.log(code);
    const data = await Coupen.findOne({ code: code });
    console.log(data);
    if (data) {
      const discount = data.discAmmount;
      console.log(discount);
      res.status(200).json({ discount: discount });
    } else {
      res.status(200).json({ message: "not working this thing" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  coupenPage,
  coupenAddPage,
  addCoupen,
  unlistCoupen,
  listCoupen,
  applyCoupen,
};
