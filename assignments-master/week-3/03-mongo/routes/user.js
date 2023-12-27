const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");

// User Routes
router.post('/signup', (req, res) => {
    let username = req.body.username
    let password = req.body.password
    res.status(200).json({
        message: "User created successfully"
    })    
});

router.get('/courses', (req, res) => {
    let username = req.headers.username
    let password = req.headers.password
    res.json(courses)
});

router.post('/courses/:courseId', userMiddleware, (req, res) => {
    let courseId = req.params.courseId
    let username = req.headers.username
    let password = req.headers.password
    res.status(200).json({
        message: "Course purchased successfully"
    })  
});

router.get('/purchasedCourses', userMiddleware, (req, res) => {
    let username = req.headers.username
    let password = req.headers.password
    res.json(purchasedCourses)
});

module.exports = router