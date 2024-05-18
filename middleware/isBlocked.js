
const isBlocked = async (req,res,next)=>{
    try {
        const {user_id} = req.session
        const dbData = await User.findOne({_id:user_id})
        if(dbData.isBlocked == true){
            res.redirect('/')
        }else{
            next()
        }
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = isBlocked;