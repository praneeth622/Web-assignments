const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User,Course  } = require("../db");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../index")

// User Routes
router.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const find = await User.findOne({ username: username });

    if (find) {
        return res.status(403).json({ message: "User Already Exists" });
    }

    const newUser = new User({ username, password });
    try {
        const response = await newUser.save();
        const token = jwt.sign({ username }, JWT_SECRET);
        return res.status(200).json({ message: "User Created Successfully", token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to create user" });
    }
          

});

router.post('/signin', async (req, res) => {
  const username = req.body.username
  const password = req.body.password;

  const find = await User.findOne({
    username:username,
    password:password
  })
  if(!find){
    res.status(403).json({
      message:"User Does not Exist"
    })
    return
  }
  else{
    const token = jwt.sign({username},JWT_SECRET)
    res.status(200).json({
      message:"User Signed In sucessfully",
      token:token
    })
    
  }
  
});

router.get('/courses', async (req, res) => {
    const jwt = jwt.verify(req.header.authorization,JWT_SECRET)
    const username = jwt.username
    if(username){
      const courses = await User.find();
      res.status(200).json(courses);
    }
});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
  const courseID = req.params.courseId
  const jwt = jwt.verify(req.header.authorization,JWT_SECRET)
  const username = jwt.username

  await User.updateOne({
    username:username
  },{
    "$push":{
      purchases:courseID
    }
  })
  res.status(200).json({
    message:"Course Added Sucessfully"
  })
  
});

router.get('/purchasedCourses', userMiddleware, (req, res) => {
  const jwt = jwt.verify(req.header.authorization,JWT_SECRET)
  const username = jwt.username

  const courses = User.findOne({
    username:username
  })
  res.status(200).json(courses.purchases)
});

module.exports = router