const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const {Admin, User, Course} = require("../db/index.js")
// Admin Routes
router.post('/signup', (req, res) => {
    let username = req.body.username
    let password = req.body.password
    res.status(200).json({
        message: "Admin created successfully"
    })
});

router.post('/courses', adminMiddleware, (req, res) => {
    let username = req.headers.username
    let password = req.headers.password
    let course = req.body
    res.status(200).json({
        message: "Course created successfully"
    })
});

router.get('/courses', adminMiddleware, (req, res) => {
    let username = req.headers.username
    let password = req.headers.password
    res.json(courses)
});

module.exports = router;