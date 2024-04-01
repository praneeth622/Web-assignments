const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin,Course  } = require("../db");

// Admin Routes
router.post('/signup', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    
  Admin.create({
    username: username,
    password: password
  })
  res.json({
    'message':"User Created sucessfully"
  })
});

router.post('/courses', adminMiddleware, async(req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const price = req.body.price;
  const imageLink = req.body.imageLink;

  const newCourse = await Course.create({
    title: title,
    description: description,
    price: price,
    imageLink: imageLink
  })
  req.json({
    message:"Course Created sucessfully",
    "Course ID": newCourse._id
  })
});

router.get('/courses', adminMiddleware, async(req, res) => {
    const courses = await Course.find();
    res.json(courses);
});

module.exports = router;