const cookieToken = require('../utils/cookieToken')
const User=require('../model/User')

exports.GetViewLogin=async(req,res)=>{
   return res.render('./loginpage/login',{msg:""})
}
exports.PostViewLogin = async (req, res) => {
    const { userName, password } = req.body
    if(!userName || !password){
        return res.render('./loginpage/login',{msg:"Enter UserName and Password"})
    }
    let user = await User.findOne({ userName: userName }).select('+password')
    if (!user) {
        return res.render('./loginpage/login',{msg:"User Doesn't Exist"})
    }
    let ispassword = await user.isValidatePassword(password)
    if (!ispassword) {
        return res.render('./loginpage/login',{msg:"Incorrect Password"})
    }
    cookieToken(user, res)
}
exports.GetLogout = async (req,res)=>{
    res.cookie('token',null,{
        expires: new Date(Date.now()),
        httpOnly:true
    })
    return res.status(200).redirect('/login')
}