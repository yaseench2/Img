require('dotenv').config()
const express = require('express')
const app = express()
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const connectDB = require('./config/mongoose')

connectDB()

app.set('view engine', 'ejs')

app.use(cookieParser())
app.use(express.static('static'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(fileUpload({ useTempFiles: true, tempFileDir: '/tmp/'}));

const homeRouter=require('./router/homeRouter')
const adminRouter=require('./router/adminRouter')
const loginRouter=require('./router/loginRouter')
const facilitatorRouter=require('./router/facilitatorRoute')
const errorRouter=require('./router/errorRouter')
const { isExpired } = require('./middleware/middleware')

app.use('/',homeRouter)
app.use('/Admin',isExpired,adminRouter)
app.use('/login',loginRouter)
app.use('/Facilitator',isExpired,facilitatorRouter)
app.use('/error',errorRouter)

app.get('*', function (req, res) {
    res.render('errorpage');
})

let port = process.env.PORT
app.listen(port, () => { console.log("running in " + port) })