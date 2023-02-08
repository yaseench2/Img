const express = require('express')
const { AdminGetViewCourses, AdminGetCreateCourses, AdminPostCreateCourses, AdminGetEditCourse, AdminPostEditCourse, AdminGetDeleteCourse, AdminGetViewCourseProfile } = require('../controller/adminViewCourses')
const { AdminGetViewEvaluation, AdminPostViewEvaluationFilter } = require('../controller/adminViewEvaluation')
const { AdminGetViewProfile, AdminPostViewProfile, AdminGetViewFacilitators, AdminGetCreateFacilitator, AdminPostCreateFacilitator, AdminGetEditFacilitator, AdminPostEditFacilitator, AdminGetDeleteFacilitator, AdminGetViewFacilitatorProfile } = require('../controller/adminViewFacilitators')
const { AdminGetViewRegisteration, AdminPostViewFilter } = require('../controller/adminViewRegisteration')
const { isloggedIn, isAdmin } = require('../middleware/middleware')
const router = express.Router()

router
    .route('/')
router
    .route('/profile/:id')
    .get(isloggedIn,isAdmin,AdminGetViewProfile)
    .post(isloggedIn,isAdmin,AdminPostViewProfile)

router
    .route('/facilitators')
    .get(isloggedIn,isAdmin,AdminGetViewFacilitators)
router
    .route('/createFacilitator')
    .get(isloggedIn,isAdmin,AdminGetCreateFacilitator)
    .post(isloggedIn,isAdmin,AdminPostCreateFacilitator)
router
    .route('/editFacilitator/:id')
    .get(isloggedIn,isAdmin,AdminGetEditFacilitator)
    .post(isloggedIn,isAdmin,AdminPostEditFacilitator)
router
    .route('/deleteFacilitator/:sparkPen')
    .get(isloggedIn,isAdmin,AdminGetDeleteFacilitator)
router
    .route('/courses')
    .get(isloggedIn,isAdmin,AdminGetViewCourses)
router
    .route('/createCourses')
    .get(isloggedIn,isAdmin,AdminGetCreateCourses)
    .post(isloggedIn,isAdmin,AdminPostCreateCourses)
router
    .route('/editCourse/:id')
    .get(isloggedIn,isAdmin,AdminGetEditCourse)
    .post(isloggedIn,isAdmin,AdminPostEditCourse)
router
    .route('/deleteCourse/:id')
    .get(isloggedIn,isAdmin,AdminGetDeleteCourse)
router
    .route('/facilitatorProfile/:sparkPen')
    .get(isloggedIn,isAdmin,AdminGetViewFacilitatorProfile)
router
    .route('/courseProfile/:id')
    .get(isloggedIn,isAdmin,AdminGetViewCourseProfile)
router
    .route('/evaluation')
    .get(isloggedIn,isAdmin,AdminGetViewEvaluation)
    .post(isloggedIn,isAdmin,AdminPostViewEvaluationFilter)
router
    .route('/registeration')
    .get(isloggedIn,isAdmin,AdminGetViewRegisteration)
    .post(isloggedIn,isAdmin,AdminPostViewFilter)

module.exports = router