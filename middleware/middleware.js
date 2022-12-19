const jwt = require('jsonwebtoken')

exports.isloggedIn = async (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return res.redirect('/login')
    }
    const decoded = await jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
}
exports.ifLoggedin=async(req,res,next)=>{
    const token = req.cookies.token
    if(!token){
        next()
    }else{
        const decoded =await jwt.verify(token,process.env.JWT_SECRET)
        if(decoded.admin){
            return res.redirect('/Admin/Admin-Facilitators')
        }else if(decoded.facilitator){
            return res.redirect('/Facilitator/Facilitator')
        }else{
            return res.redirect('/error')
        }
    }
}
exports.isAdmin=async(req,res,next)=>{
    const token = req.cookies.token
    if(token){
        const decoded =await jwt.verify(token,process.env.JWT_SECRET)
        if(decoded.admin){
            next()
        }
         else{
            return res.redirect('/login')
        } 
    }  
}
exports.isfacilitator=async (req,res,next)=>{
    const token = req.cookies.token
    if(token){
        const decoded =await jwt.verify(token,process.env.JWT_SECRET)
        if(decoded.facilitator){
            next()
        }else{
            return res.redirect('/login')
        }   
    }
    
}
exports.isExpired=async(req,res,next)=>{
    const cookie=req.cookies
    if(!cookie){
        return res.redirect('/login/logout')
    }else{
        next()
    }
}