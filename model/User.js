const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
let UserSchema=new mongoose.Schema({
    id:String,
    userName:String,
    password:{
        select:false,
        type:String,
    }, 
    admin:{
        type:Boolean,
        default:false
    },
    facilitator:{
        type:Boolean,
        default:true
    },
    department:String,
    dob:String,
    gender:String,
    contactNumber:String,
    email:String,
    imageUrl:String,
    publicId:String,
    sparkPen:String,
    address:String,
})
UserSchema.pre('save', async function (next) {
    if (!(this.isModified('password'))) {
        return next()
    }
    this.password = await bcrypt.hash(this.password, 5)
})
UserSchema.methods.isValidatePassword = async function (usersendPassword) {
    return await bcrypt.compare(usersendPassword, this.password)
}
UserSchema.methods.getjwtToken = async function () {
    return await jwt.sign(
        {
            userName: this.userName,
            id:this.id,
            imageUrl:this.imageUrl,
            admin:this.admin,
            facilitator:this.facilitator
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRY }
    )
}
module.exports = mongoose.model('User', UserSchema)