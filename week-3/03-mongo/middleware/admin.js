// Middleware for handling auth
const { Admin } = require("../db");

function adminMiddleware(req, res, next) {
  username = req.header.username;
  password = req.header.password
  
      Admin.findOne({
      userName:username,
      password:password
    }).then((value)=>{
      if(value){
        next();
      }
      else{
        res.status(401).json({
          message:"Admin Does not Exist"
        })
      }
    })
}

module.exports = adminMiddleware;