const zod = require("zod")
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://tejasbayaskar:Omboss8506%40@cluster0.fhjtmo2.mongodb.net/')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));
// Connect to MongoDB
// mongoose.connect('');

// Define schemas

const AdminSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: String
});

const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: String,
    purchasedCourses: [String]
});

const CourseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    imageLink: String,
    published: Boolean
});

async function findUsername(username, tableName){
    const isUser = await tableName.find({username: username})
    console.log(isUser);
    return isUser.length !== 0  
}

async function findUsernamePassword(username, password, tableName){
    const isUser = await tableName.find({username: username,
    password: password})
    console.log(isUser);
    return isUser.length !== 0  
}

function zodValidation(username, password){
    return emailSchema.safeParse(username).success && passwordSchema.safeParse(password).success
}
let emailSchema = zod.string().email()
let passwordSchema = zod.string().min(8)
const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course,
    findUsername,
    zodValidation,
    findUsernamePassword
}

