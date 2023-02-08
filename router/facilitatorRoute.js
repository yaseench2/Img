const express = require('express')
const { FacilitatorGetView, FacilitatorGetViewEvaluation, FacilitatorGetViewProfile, FacilitatorPostViewEvaluationFilter, FacilitatorPostViewRegisterationFilter } = require('../controller/facilitatorView')
const { isloggedIn, isfacilitator } = require('../middleware/middleware')
const router = express.Router()

router
    .route('/')
router
    .route('/facilitator')
    .get(isloggedIn,isfacilitator,FacilitatorGetView)
    .post(isloggedIn,isfacilitator,FacilitatorPostViewRegisterationFilter)
router
    .route('/evaluation')
    .get(isloggedIn,isfacilitator,FacilitatorGetViewEvaluation)
    .post(isloggedIn,isfacilitator,FacilitatorPostViewEvaluationFilter)
router
    .route('/profile/:id')
    .get(isloggedIn,isfacilitator,FacilitatorGetViewProfile)
    
module.exports=router