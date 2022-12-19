const express = require('express')
const { GetErrorPage } = require('../controller/userHome')
const router = express.Router()

router
    .route('/')
    .get(GetErrorPage)
    
module.exports = router