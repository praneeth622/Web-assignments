const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://praneethdevarasetty31:8qgJLzdzAjMvKssx@cluster0.myjyejx.mongodb.net/?retryWrites=true&w=majority').then(()=>{
  console.log("Connected to MongoDB");
});

// Define schemas
const AdminSchema = new mongoose.Schema({
    userName :{
      type: String,
      required: true
    },
    password:{
      type: String,
      required: true,
    }
    
});

const UserSchema = new mongoose.Schema({
    username:{
      type:string,
      required:true
    }
});

const CourseSchema = new mongoose.Schema({
    // Schema definition here
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}