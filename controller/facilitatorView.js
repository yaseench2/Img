const User=require('../model/User')
const Registeration=require('../model/Registeration')
const Course=require('../model/Course')

exports.FacilitatorGetView=async(req,res)=>{
    let loginedUser=req.user
    let regUser=await Registeration.find()
    return res.render('./facilitator-view/facilitator-view',{loginedUser,regUser})
}
exports.FacilitatorPostViewRegisterationFilter=async(req,res)=>{
    let loginedUser=req.user
    let {sparkPen,designation,department,category,from,to}=req.body
    let filter={}
    if(sparkPen){
        filter.sparkPen=sparkPen
    } 
    if(designation){
        filter.designation=designation
    }
    if(department){
        filter.department=department
    }
    if(category){
        filter.category=category
    }
    if(from){
        filter.courseStart={$gte:from}
    }
    if(to){
        filter.courseEnd={$lte:to}
    }
    let result1=await Registeration.find(filter)
    return res.render('./admin-view/admin-view-filter',{result1,loginedUser})
}

exports.FacilitatorGetViewEvaluation=async(req,res)=>{
    let loginedUser=req.user
    let evaluation=await Registeration.find()
    return res.render('./facilitator-view/facilitator-view-evaluation',{loginedUser,evaluation})
}
exports.FacilitatorPostViewEvaluationFilter=async(req,res)=>{
    let loginedUser=req.user
    let {sparkPen,designation,department,category,from,to}=req.body
    let filter={}
    if(sparkPen){
        filter.sparkPen=sparkPen
    } 
    if(designation){
        filter.designation=designation
    }
    if(department){
        filter.department=department
    }
    if(category){
        filter.category=category
    }
    if(from){
        filter.courseStart={$gte:from}
    }
    if(to){
        filter.courseEnd={$lte:to}
    }
    let result1=await Registeration.find(filter)
    return res.render('./admin-view/admin-view-evaluationFilter',{result1,loginedUser})
}
exports.FacilitatorGetViewProfile=async(req,res)=>{
    let loginedUser=req.user
    let {id}=req.params
    let facprofile=await User.findOne({id:id})
    if(facprofile){
        let sparkPen=facprofile.sparkPen
        let faccourse=await Course.find({facSparkPen:sparkPen})
        return res.render('./facilitator-view/facilitator-viewProfile',{facprofile,loginedUser,faccourse})
    }else{
        return res.redirect('/error')
    }
}