const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

// User Routes
router.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    await User.create({
      username:username,
      password:password
    })
    res.json({
      message:"User Created sucessfully"
    })
});

router.get('/courses', async (req, res) => {
    const response = await User.find()
    res.json(response)
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    const courseId = req.params.courseId
    const username = req.header.username

    await User.updateOne({
      username:username
    },{
      "$push":{
        purchases:courseId
      }
    })
});

router.get('/purchasedCourses', userMiddleware, async(req, res) => {
    const username = req.header.username
    const response = await User.findOne({username : username}) 
    res.json(response.purchases)
});

module.exports = router