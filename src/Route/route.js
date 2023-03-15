const express = require("express")
const router = express.Router()
const UserController = require("../Controllers/UserController")



// <-----------User register----------------->
router.post("/UserCreate",UserController.createuser);
router.get("/getUser/:UserId",UserController.UserById);
router.patch("/UpdateUser/:UserId",UserController.updateUser);
router.delete("/DeleteUser/:UserId",UserController.DeleteUser);
router.get("/User", UserController.getUserByFilter)


// <-----------No Page Found----------------->
 router.all('*', (req, res) => {res.status(404).send({status : false, message:"No Page Found !!"})})

module.exports=router