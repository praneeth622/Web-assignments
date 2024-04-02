const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin,Course  } = require("../db");
const jwt = require("jsonwebtoken");

// Admin Routes
router.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const find = await Admin.findOne({
        username:username,
        password:password
    })
    if(find){

      const token = jwt.sign({username:username},JWT_SECRET)
      res.status(200).json({
        message:"User Created sucessfully",
        token:token
      })
    }else{
      res.status(403).json({
        message:"Admin Does not Exist"
      })
    }

    
});

router.post('/signin',async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    const verify = jwt.verify(username,JWT_SECRET)
    const find = await Admin.findOne({
        username:username,
        password:password
    })
    if(verify.username){
      res.status(200).json({
        message:"Admin Signed In sucessfully",
        token:verify
      })   
    }
  
});

router.post('/courses', adminMiddleware, async (req, res) => {
    const title =req.body.titlle;
    const description = req.body.description;
    const price = req.body.price;
    const imageLink = req.body.imageLink;

    const newCourse = new Course({
        title,
        description,
        price,
        imageLink
    })
    const response = await newCourse.save()
    if(response){
      res.status(200).json({
        message:"Course Created Sucessfully",
        courseId: newCourse._id
      })
    }
    
});

router.get('/courses', adminMiddleware, (req, res) => {
    const courses = Course.find();
    res.status(200).json(courses);
});

module.exports = router;