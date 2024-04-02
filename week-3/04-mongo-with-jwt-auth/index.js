const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const adminRouter = require("../04-mongo-with-jwt-auth/routes/admin")
const userRouter = require("./routes/user");
const JWT_SECRET = 'shhhh'
// Middleware for parsing request bodies
app.use(bodyParser.json());
app.use("/admin", adminRouter)
app.use("/user", userRouter)
console.log("Hi there")
app.get("/",(req,res)=>{
    console.log("Hi this is root")
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
module.exports = JWT_SECRET;