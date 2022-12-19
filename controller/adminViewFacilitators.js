const User=require('../model/User')
const Course=require('../model/Course')
const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

exports.AdminGetViewProfile=async(req,res)=>{
    let {id}=req.params
    let loginedUser=req.user
    let Aprofile=await User.findOne({id:id})
    if(Aprofile){
        return res.render('./admin-view/admin-view-profile',{Aprofile,loginedUser})
    }else{
        return res.redirect('/error')
    }
}
exports.AdminPostViewProfile=async(req,res)=>{
    let {id}=req.params
    let {userName,email,sparkPen,contactNumber,address,department,dob,password,gender,publicId}=req.body
        let facprofile=await User.findOne({id:id})
        facprofile.userName=userName
        facprofile.email=email
        facprofile.sparkPen=sparkPen
        facprofile.contactNumber=contactNumber
        facprofile.address=address
        facprofile.department=department
        facprofile.dob=dob
        facprofile.password=password
        facprofile.gender=gender
        await facprofile.save()
    if (req.files) {
        if (req.files.picture) {
            const imagespic = req.files.picture
            cloudinary.uploader.upload(imagespic.tempFilePath, { folder: "imgimages" }, async (err, result) => {
                cloudinary.uploader.destroy(publicId)
                let imageUrl = result.url
                let newpublicId = result.public_id
                facprofile.publicId=newpublicId
                facprofile.imageUrl=imageUrl
                await facprofile.save()
            })
        }
    }
    setTimeout(() => {
        return res.redirect('/login/logout')
    }, 10000);

}
exports.AdminGetViewFacilitators=async(req,res)=>{
    let loginedUser=req.user
    let facilitator=await User.find({facilitator:true})
    if(facilitator){
        facilitator.reverse()
        return res.render('./admin-view/admin-view-facilitators',{facilitator,loginedUser})
    }else{
        return res.redirect('/error')
    }
}
exports.AdminGetCreateFacilitator=async(req,res)=>{
    let loginedUser=req.user
    return res.render('./admin-view/admin-create-facilitators',{loginedUser,msg:""})
}
exports.AdminPostCreateFacilitator=async(req,res)=>{
    if (!req.files) {
        let loginedUser=req.user
        return res.render('./admin-view/admin-create-facilitators',{loginedUser,msg:"No Image found"})
    }else{
        if (req.files.picture) {
            const imagespic = req.files.picture
            await cloudinary.uploader.upload(imagespic.tempFilePath, { folder: "img-users" }, async (err, result) => {
                let imageUrl = result.url
                let publicId = result.public_id
                let id = `${Date.now()}`
                let {userName,email,sparkPen,contactNumber,address,department,dob,password,gender}=req.body
                if(!userName||!email||!sparkPen||!contactNumber||!address||!department||!dob||!password||!gender){
                    let loginedUser=req.user
                    return res.render('./admin-view/admin-create-facilitators',{loginedUser,msg:"Please Fill The Form"})
                }else{
                    await User.create({
                        id:id,
                        userName:userName,
                        password:password,
                        email:email,
                        sparkPen:sparkPen,
                        contactNumber:contactNumber,
                        address:address,
                        department:department,
                        dob:dob,
                        gender:gender,
                        imageUrl:imageUrl,
                        publicId:publicId
                    })
                    setTimeout(() => {
                        return res.redirect('/Admin/Admin-Facilitators')
                    }, 10000);
                }
                
            })
        }
    }
}
exports.AdminGetEditFacilitator=async(req,res)=>{
    let loginedUser=req.user
    let {id}=req.params
    let facprofile=await User.findOne({id:id})
    if(facprofile){
        return res.render('./admin-view/admin-edit-facilitators',{facprofile,loginedUser})
    }else{
        return res.redirect('/error')
    }
}
exports.AdminPostEditFacilitator=async(req,res)=>{
    let {id}=req.params
    let {userName,email,sparkPen,contactNumber,address,department,dob,password,gender,publicId}=req.body
    let facprofile=await User.findOne({id:id})
        facprofile.userName=userName
        facprofile.email=email
        facprofile.sparkPen=sparkPen
        facprofile.contactNumber=contactNumber
        facprofile.address=address
        facprofile.department=department
        facprofile.dob=dob
        facprofile.password=password
        facprofile.gender=gender
        await facprofile.save()
    if (req.files) {
        if (req.files.picture) {
            const imagespic = req.files.picture
            cloudinary.uploader.upload(imagespic.tempFilePath, { folder: "imgimages" }, async (err, result) => {
                cloudinary.uploader.destroy(publicId)
                let imageUrl = result.url
                let newpublicId = result.public_id
                facprofile.publicId=newpublicId
                facprofile.imageUrl=imageUrl
                await facprofile.save()
            })
        }
    }
    setTimeout(() => {
        return res.redirect('/Admin/Admin-Facilitators')
    }, 10000);
}
exports.AdminGetViewFacilitatorProfile=async(req,res)=>{
    let loginedUser=req.user
    let {sparkPen}=req.params
    let facprofile=await User.findOne({sparkPen:sparkPen})
    if(facprofile){
        let facSparkPen=facprofile.sparkPen
        let faccourse=await Course.find({facSparkPen:facSparkPen})
        return res.render('./admin-view/admin-view-facilitatorProfile',{facprofile,loginedUser,faccourse})
    }else{
        return res.redirect('/error')
    }
}
exports.AdminGetDeleteFacilitator=async(req,res)=>{
    let {sparkPen}=req.params
    let facprof=await User.findOne({sparkPen:sparkPen})
    let publicId=facprof.publicId
    await User.deleteOne({sparkPen:sparkPen})
    cloudinary.uploader.destroy(publicId)
    return res.redirect('/Admin/Admin-Facilitators')
}