const express = require('express')
const { UserGetViewHomePage, UserGetViewEvaluationSignPage, UserPostEvaluationSignPage, UserPostEvaluationPage, UserGetViewRegisterPage, UserPostViewRegisterPage } = require('../controller/userHome')
const router = express.Router()

router
    .route('/')
    .get(UserGetViewHomePage)
router
    .route('/Evaluation')
    .get(UserGetViewEvaluationSignPage)
    .post(UserPostEvaluationSignPage)
router 
    .route('/evalationsubmit')
    .post(UserPostEvaluationPage)
router
    .route('/Registeration')
    .get(UserGetViewRegisterPage)
    .post(UserPostViewRegisterPage)

module.exports = router