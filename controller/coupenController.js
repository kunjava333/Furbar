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
    if (!data) {
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
    } else {
      res.render("addCoupen", {
        message: "the name or code is altready taken",
      });
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

const deleteCoupen = async (req, res) => {
  try {
    const { id } = req.query;
    const update = await Coupen.findOneAndDelete({ _id: id });
    res.redirect("/admin/coupen-manegement");
  } catch (error) {
    console.log(error.message);
  }
}


function formatDate(isoString) {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}


const editCoupen = async (req,res) => {
  try {
    console.log('its jjjjjhere');
    const {id} = req.query;
    req.session.coupenId = id;
    const data = await Coupen.findOne({_id:id});
    console.log(data);

    const data1 = {
      data:data,
      date:formatDate(data.expiryDate)
    }
    res.render('editCoupen',{data1:data1});
  } catch (error) {
    console.log(error.message);
  }
}

const editedCoupen = async (req,res) => {
  try {
    const {name,code,min,discount,date,description} = req.body
    const {id} = req.session;
    const update = await Coupen.findOneAndUpdate({_id:id},{ name: name,description: description,code: code,minAmmount: min,discAmmount: discount,expiryDate: date,status: true,})
    if(update){
      res.redirect("/admin/coupen-manegement");
    }
  } catch (error) {
    console.log(error.message);
  }
}


const applyCoupen = async (req, res) => {
  try {
    const { code } = req.query;

    const { user_id } = req.session;

    console.log(code);

    const data = await Coupen.findOne({ code: code });

    const values = {
      userId: user_id,
      used: true,
    };

    if (!data) {
      res.status(200).json({ message: "The offer code is invalid" });
      return;
    }

    const makeSure = data.usedList
      ? data.usedList.find((id) => id.userId == user_id)
      : false;

    if (makeSure) {
      res.status(200).json({ message: "You already used the code" });
      return;
    }
    if (data && data.status == true) {
      const discount = data.discAmmount;

      data.usedList.push(values);

      await data.save();

      res.status(200).json({ discount: discount });
    } else {
      res.status(200).json({ message: "This coupen is not valid" });
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
  deleteCoupen,
  editCoupen
};
