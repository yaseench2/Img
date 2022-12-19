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
    .route('/Admin-Profile/:id')
    .get(isloggedIn,isAdmin,AdminGetViewProfile)
    .post(isloggedIn,isAdmin,AdminPostViewProfile)

router
    .route('/Admin-Facilitators')
    .get(isloggedIn,isAdmin,AdminGetViewFacilitators)
router
    .route('/Admin-CreateFacilitator')
    .get(isloggedIn,isAdmin,AdminGetCreateFacilitator)
    .post(isloggedIn,isAdmin,AdminPostCreateFacilitator)
router
    .route('/Admin-EditFacilitator/:id')
    .get(isloggedIn,isAdmin,AdminGetEditFacilitator)
    .post(isloggedIn,isAdmin,AdminPostEditFacilitator)
router
    .route('/Admin-DeleteFacilitator/:sparkPen')
    .get(isloggedIn,isAdmin,AdminGetDeleteFacilitator)
router
    .route('/Admin-Courses')
    .get(isloggedIn,isAdmin,AdminGetViewCourses)
router
    .route('/Admin-CreateCourses')
    .get(isloggedIn,isAdmin,AdminGetCreateCourses)
    .post(isloggedIn,isAdmin,AdminPostCreateCourses)
router
    .route('/Admin-EditCourse/:id')
    .get(isloggedIn,isAdmin,AdminGetEditCourse)
    .post(isloggedIn,isAdmin,AdminPostEditCourse)
router
    .route('/Admin-DeleteCourse/:id')
    .get(isloggedIn,isAdmin,AdminGetDeleteCourse)
router
    .route('/Admin-FacilitatorProfile/:sparkPen')
    .get(isloggedIn,isAdmin,AdminGetViewFacilitatorProfile)
router
    .route('/Admin-CourseProfile/:id')
    .get(isloggedIn,isAdmin,AdminGetViewCourseProfile)
router
    .route('/Admin-Evaluation')
    .get(isloggedIn,isAdmin,AdminGetViewEvaluation)
    .post(isloggedIn,isAdmin,AdminPostViewEvaluationFilter)
router
    .route('/Admin-Registeration')
    .get(isloggedIn,isAdmin,AdminGetViewRegisteration)
    .post(isloggedIn,isAdmin,AdminPostViewFilter)

module.exports = router