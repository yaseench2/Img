const Registeration=require('../model/Registeration')
const Course=require('../model/Course')

exports.UserGetViewHomePage=async(req,res)=>{
    return res.render('./user-view/home-page',{msg:""})
}
exports.UserGetViewRegisterPage=async(req,res)=>{
    return res.render('./user-view/register-page',{msg:""})
}
exports.UserPostViewRegisterPage=async(req,res)=>{
    let id=`${Date.now()}`
    let {courseCode,userName,qualification,courseStart,courseEnd,sparkPen,email,dob,gender,address,category,department,lrs,contactNumber,designation,hostelAcc,checkInDate,checkOutDate,checkOutTime,food}=req.body
    let course=await Course.findOne({courseCode:courseCode})
    if(course){
        let user=await Registeration.findOne({sparkPen:sparkPen,courseCode:course.courseCode})
        if(!user){
            await Registeration.create({
                id:id,
                courseCode:courseCode,
                courseStart:courseStart,
                courseEnd:courseEnd,
                userName:userName,
                qualification:qualification,
                sparkPen:sparkPen,
                email:email,
                dob:dob,
                gender:gender,
                address:address,
                department:department,
                category:category,
                lrs:lrs,
                contactNumber:contactNumber,
                designation:designation,
                hostelAcc:hostelAcc,
                checkInDate:checkInDate,
                checkOutDate:checkOutDate,
                checkOutTime:checkOutTime,
                food:food
            })
            return res.render('./user-view/home-page',{msg:"Successfully Registered"})
        }else{
            return res.render('./user-view/register-page',{msg:"You Are Already Registered To This Course"})
        }
    }else{
        return res.render('./user-view/register-page',{msg:"Please Check Your Program Code Again"})
    }
    
}
exports.UserGetViewEvaluationSignPage=async(req,res)=>{
    return res.render('./user-view/evaluation-sign-Page',{msg:""})
}
exports.UserPostEvaluationSignPage=async(req,res)=>{
    let {courseCode,sparkPen}=req.body
    let isRegistered=await Registeration.findOne({courseCode:courseCode,sparkPen:sparkPen})
    if(isRegistered){
        return res.render('./user-view/evaluation-page',{isRegistered})   
    }else{
        return res.render('./user-view/evaluation-sign-page',{msg:"You Are Not Registered"})
    }
}
exports.UserPostEvaluationPage=async(req,res)=>{
    let {q1,q2,q3,q4,q5,q6,q7,q8,q9,q10,q11,q12,q13,q14,q15,q16,courseCode,sparkPen}=req.body
    let user=await Registeration.findOne({courseCode:courseCode,sparkPen:sparkPen})
    if(user){
        user.evaluation.q1=q1
        user.evaluation.q2=q2
        user.evaluation.q3=q3
        user.evaluation.q4=q4
        user.evaluation.q5=q5
        user.evaluation.q6=q6
        user.evaluation.q7=q7
        user.evaluation.q8=q8
        user.evaluation.q9=q9
        user.evaluation.q10=q10
        user.evaluation.q11=q11
        user.evaluation.q12=q12
        user.evaluation.q13=q13
        user.evaluation.q14=q14
        user.evaluation.q15=q15
        user.evaluation.q16=q16
        await user.save()
        return res.render('./user-view/home-page',{msg:"Evaluation Successfull"})
    }else{
        return res.redirect('/error')
    }
}
exports.GetErrorPage=async(req,res)=>{
    return res.render('errorpage')
}