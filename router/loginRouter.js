const express = require('express')
const { GetViewLogin, PostViewLogin, GetLogout } = require('../controller/login')
const { ifLoggedin } = require('../middleware/middleware')
const router = express.Router()

router
    .route('/')
    .get(ifLoggedin,GetViewLogin)
    .post(ifLoggedin,PostViewLogin)
router
    .route('/logout')
    .get(GetLogout)

module.exports = router