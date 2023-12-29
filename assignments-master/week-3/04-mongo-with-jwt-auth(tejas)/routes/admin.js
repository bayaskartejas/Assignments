const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const jwt = require("jsonwebtoken")
const router = Router();
const {Admin, emailSchema, passwordSchema, secretKey, Course} = require("../db")


// Admin Routes
router.post('/signup', (req, res) => {
    let input = req.body.username
    let username = input.toLowerCase()
    let password = req.body.password
    if(emailSchema.safeParse(username).success && passwordSchema.safeParse(password).success){
        Admin.find({username: username})
        .then((data)=>{
            if(data.length==0){
                const user = new Admin({username: username, password: password})
                user.save()
                .then(()=>{
                    res.status(200).json({msg: "Admin created successfully"})
                })
            }
            else{
                res.status(404).json({msg: "User already exists"})
            }
        })
        .catch((err)=>{
            res.status(404).json(err)
        })
    }    
    else if(!emailSchema.safeParse(username).success && !passwordSchema.safeParse(password).success){
        res.status(404).json({msg: "Invalid username and password schema"})
    }
    else if(!emailSchema.safeParse(username).success){
        res.status(404).json({msg: "Invalid username schema"})
    }
    else if(!passwordSchema.safeParse(password).success){
        res.status(404).json({msg: "Invalid password schema"})
    }
});

router.post('/signin', (req, res) => {
    let input = req.body.username
    let username = input.toLowerCase()
    let password = req.body.password
    Admin.find({
        username: username,
        password: password
    })
    .then((data)=>{
        if(data.length == 1){
        let token = jwt.sign({username},secretKey)
        res.status(200).json({token: token})            
        }
        else{
            res.status(404).json({err: "User not found"})
        }
    })
    .catch((err)=>{
        res.status(404).json(err)
    })
});

router.post('/courses', adminMiddleware, (req, res) => {
    let title = req.body.title
    let description = req.body.description
    let price = req.body.price
    let imageLink = req.body.imageLink
    
    const course = new Course({
        title: title,
        description: description,
        price: price,
        imageLink: imageLink,
        published: true
    })
    course.save()
    .then((data)=>{
        res.status(200).json({msg: "Course created successfully", courseId: data._id})
    })
});

router.get('/courses', adminMiddleware, (req, res) => {
    Course.find({})
    .then((data)=>{
        res.status(200).json(data)
    })
});

module.exports = router;