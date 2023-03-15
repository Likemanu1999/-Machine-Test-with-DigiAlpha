const UserModel = require("../model/UserModel")
const {isValidObjectId , isValidEmail, isValidPhone } = require("../validator/validator");
const createuser = async (req, res) => {
    try {
        let requestbody = req.body
        let { firstname, lastname, email, phone } = requestbody;
        if (!firstname) return res.status(400).send({ status: false, message: "firstname required" });
        if (!lastname) return res.status(400).send({ status: false, message: "lastname required" });
        if (!isValidEmail(email)) return res.status(400).send({ status: false, message: "email required" });
        if (!isValidPhone(phone)) return res.status(400).send({ status: false, message: "phone required" });
        let UserSaved = await UserModel.create(requestbody);
        res.status(201).send({ status: true, message: "user successfully created", data: UserSaved });
    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}

const UserById = async (req, res) => {
    try {
        const UserId = req.params.UserId;
        if (!isValidObjectId(UserId)){
            return res.status(400).send({ status: false, message: "Please enter UserId in params" })
        } 
        let UserCard = await UserModel.findById({ _id: UserId });  
        res.status(201).send({ status: true, message: "User data", data: UserCard });
    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}

const updateUser = async (req,res)=>{
    try{
       const UserId = req.params.UserId;
       let requestBody = req.body;
       let { firstname, lastname, email, phone } = requestBody;

       if (!isValidObjectId(UserId)){
        return res.status(400).send({ status: false, message: "Please enter UserId in params" })
       } 
       let user = await UserModel.findOne({ _id: UserId})
        if (!UserId) return res.status(404).send({ status: false, message: "UserId Not Found" })

        let updateData = await UserModel.updateOne({  _id: UserId }, { $set: { firstname: requestBody.firstname, lastname: requestBody.lastname, email: requestBody.email, phone: requestBody.phone, } });
       return res.status(200).send({ status : true , message: "Success" , data : updateData })
    }  
    catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}

const DeleteUser = async function (req,res){
    try{
        const UserId = req.params.UserId;
        if (!isValidObjectId(UserId))
        return res.status(400).send({ status: false, message: "Please enter UserId in params" });

        let RemoveUser = await UserModel.findOneAndDelete(UserId);  
        return res.status(200).send({ status : true , message: "User delete Successfully " })
      } 
      catch (error) {
          return res.status(500).send({ status: false, message: error.message });
      }
}
const getUserByFilter = async (req, res) => {
    try {
        let data =  req.query;
        let { firstname, lastname, email, phone } = data;
        let filter = {...data};
        let dataInfo = await UserModel.find(filter).select({_id:1,firstname:1,lastname:1,email:1,phone:1})
        return res.status(200).send({status: true,message: "Success",data: dataInfo });
      } catch (err) {
        return res.status(500).send({ status: false, error: err.message });
      }
};

module.exports = { createuser, UserById , updateUser , DeleteUser , getUserByFilter }