const Registeration=require('../model/Registeration')

exports.AdminGetViewRegisteration=async(req,res)=>{
    let loginedUser=req.user
    let regUser=await Registeration.find()
    return res.render('./admin-view/admin-view-registeration',{loginedUser,regUser})
}
exports.AdminPostViewFilter=async(req,res)=>{
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