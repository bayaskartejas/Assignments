const  Router  = require("express");
const jwt = require('jsonwebtoken')
const adminMiddleware = require("../middleware/admin");
const router = Router();
const {Admin, User, Course, findUsername, zodValidation, findUsernamePassword} = require("../db/index.js")
router.use(Router.json())
const secretKey = "secret"

// Admin Routes
router.use(Router.json())
router.post('/admin/signup', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    if (zodValidation(username, password)){
    findUsername(username, Admin).then((response)=>{
        if(response==true){
            res.status(200).json({msg: "username already exists"})
        }
        else{
        const adminUser = new Admin({username: username, password: password})
        adminUser.save()
        .then((doc)=>{
            res.status(200).json({msg: "document inserted"});
        })
        .catch(err=>{
            res.status(200).json({msg: "error while inserting document"});
        })
        }
    })
    }
    else{
        res.status(200).json({
            msg: "password and username are not correct"
        })
    }
    }
);

router.post('/admin/signin', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    findUsername(username, Admin).then((response)=>{
        if(response==true){
            const token = jwt.sign({username: username},secretKey)
            res.status(200).json({msg: token})
        }
        else{
            res.status(404).json({msg: "username was not there"})
        }
    })
    });

router.post('/admin/courses',adminMiddleware,(req, res) => {
    let course = new Course({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        imageLink: req.body.imageLink,
        published: req.body.published
    })
    course.save()
    res.status(200).json({msg: "record has been added"})
    
});

router.get('/admin/courses', adminMiddleware, async (req, res) => {
    let allCourses = await Course.find({});
    res.status(200).json(allCourses)
});



router.listen(3000)
module.exports = router;