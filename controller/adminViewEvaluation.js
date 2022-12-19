const Registartion=require('../model/Registeration')

exports.AdminGetViewEvaluation=async(req,res)=>{
    let loginedUser=req.user
    let evaluation=await Registartion.find()
    return res.render('./admin-view/admin-view-evaluation',{loginedUser,evaluation})
}
exports.AdminPostViewEvaluationFilter=async(req,res)=>{
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
    let result1=await Registartion.find(filter)
    return res.render('./admin-view/admin-view-evaluationFilter',{result1,loginedUser})
}