const  Router  = require("express");
const zod = require("zod")
const router = Router();
const jwt = require('jsonwebtoken')
const userMiddleware = require("../middleware/user");
let secretKey = "secret"
const {Admin, User, Course, findUsername, zodValidation, findUsernamePassword} = require("../db/index.js")
// User Routes
router.use(Router.json())

router.post('/users/signup', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    if (zodValidation(username, password)){
    findUsername(username, User).then((response)=>{
        if(response==true){
            res.status(200).json({msg: "username already exists"})
        }
        else{
        const user = new User({username: username, password: password})
        user.save()
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
    });

router.post('/users/signin', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    findUsernamePassword(username, password, User).then((response)=>{
        if(response==true){
            const token = jwt.sign({username: username},secretKey)
            res.status(200).json({msg: token})
        }
        else{
            res.status(404).json({msg: "Incorrect Details"})
        }
    })
    });

router.get('/users/courses', userMiddleware, async (req, res) => {
    let allCourses = await Course.find({});
    res.status(200).json(allCourses)
});

router.post('/users/courses/:courseId', userMiddleware, async (req, res) => {
    let course = req.params.courseId
    let isCourse = await Course.find({title: course})
    if(isCourse.length==0){
        res.status(404).json({msg: "course not found"})
    }
    else{
        console.log(course);
        User.findOne({username: req.userInfo.username})
            .then((doc)=>{
                 doc.purchasedCourses.push(course)
                 doc.save()
                .then(()=>{res.status(200).json({msg: "course has been purchased successfully"})})
                console.log(doc);
               // res.status(200).json({msg: "something"})
            }).catch((err)=>{
                res.status(404).json({msg: "course couldn't be purchased", user: req.userInfo.username, error: err})})
            }})
            

router.get('/users/purchasedCourses', userMiddleware, (req, res) => {
    User.findOne({username: req.userInfo.username})
    .then((doc)=>{
       res.status(200).json(doc) 
      // res.status(200).json({msg: "something"})
   }).catch((err)=>{
       res.status(404).json({msg: "user cannot be found"})})
});

module.exports = router
router.listen(3001)