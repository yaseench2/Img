const mongoose=require('mongoose')
let CourseSchema=new mongoose.Schema({
    id:String,
    courseName:String,
    facSparkPen:String,
    courseCode:String,
    facilitatorName:String,
    courseEnd:String,
    courseStart:String
})
module.exports=mongoose.model('Course',CourseSchema)