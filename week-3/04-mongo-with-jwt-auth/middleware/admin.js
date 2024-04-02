const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../index")
// Middleware for handling auth
function adminMiddleware(req, res, next) {
    const token = req.header.authorization;
    const words = token.split(" ");
  //will split the the sentence in to words by space
    //we will get in array of 2 ['barder','token']
  //we are taking 2nd i.e (1) in array
  const jwtToken = words[1];
    const verify = jwt.verify(jwtToken, JWT_SECRET)
    if(verify.username){
      next()
    }
  else{
    res.status(403).json({
      message:"Admin Does not Exist"
    })
  }
}

module.exports = adminMiddleware;