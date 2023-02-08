const Course=require('../model/Course')

exports.AdminGetViewCourses=async(req,res)=>{
    let loginedUser=req.user
    let courses=await Course.find()
    courses.reverse()
    if(courses){
        return res.render('./admin-view/admin-view-courses',{courses,loginedUser})
    }else{
        return res.redirect('/error')
    }
}
exports.AdminGetCreateCourses=async(req,res)=>{
    let loginedUser=req.user
    return res.render('./admin-view/admin-create-course',{loginedUser})
}
exports.AdminPostCreateCourses=async(req,res)=>{
    let id = `${Date.now()}`
    let {courseName,courseCode,facilitatorName,facSparkPen,courseStart,courseEnd}=req.body
    await Course.create({
        id:id,
        courseCode:courseCode,
        facSparkPen:facSparkPen,
        courseName:courseName,
        facilitatorName:facilitatorName,
        courseStart:courseStart,
        courseEnd:courseEnd,
    })
    return res.redirect('/Admin/courses')
}
exports.AdminGetEditCourse=async(req,res)=>{
    let loginedUser=req.user
    let {id}=req.params
    let course=await Course.findOne({id:id})
    if(course){
        return res.render('./admin-view/admin-edit-course',{course,loginedUser})
    }else{
        return res.redirect('/error')
    }
}
exports.AdminPostEditCourse=async(req,res)=>{
    let {courseCode,courseName,courseEnd,courseStart,facSparkPen,facilitatorName}=req.body
    let {id}=req.params
    let course=await Course.findOne({id:id})
    if(course){
        course.courseCode=courseCode
        course.facSparkPen=facSparkPen
        course.courseName=courseName
        course.facilitatorName=facilitatorName
        course.courseStart=courseStart
        course.courseEnd=courseEnd
        await course.save()
        return res.redirect('/Admin/courses')
    }else{
        return res.redirect('/error')
    }
}
exports.AdminGetViewCourseProfile=async(req,res)=>{
    let loginedUser=req.user
    let {id}=req.params
    let course=await Course.findOne({id:id})
    if(course){
        return res.render('./admin-view/admin-view-courseProfile',{course,loginedUser})
    }else{
        return res.redirect('/error')
    }
}
exports.AdminGetDeleteCourse=async(req,res)=>{
    await Course.deleteOne({id:req.params.id})
    return res.redirect('/Admin/courses')
}