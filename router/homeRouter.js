const express = require('express')
const { UserGetViewHomePage, UserGetViewEvaluationSignPage, UserPostEvaluationSignPage, UserPostEvaluationPage, UserGetViewRegisterPage, UserPostViewRegisterPage } = require('../controller/userHome')
const router = express.Router()

router
    .route('/')
    .get(UserGetViewHomePage)
router
    .route('/evaluation')
    .get(UserGetViewEvaluationSignPage)
    .post(UserPostEvaluationSignPage)
router 
    .route('/evalationSubmit')
    .post(UserPostEvaluationPage)
router
    .route('/registeration')
    .get(UserGetViewRegisterPage)
    .post(UserPostViewRegisterPage)

module.exports = router