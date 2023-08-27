const users = require("../models/userSchema");
const moment = require("moment");

//users posts
exports.userpost = async(req,res) =>{
  
  //  console.log(req.body);
  //  console.log(req.file);
  
     const file = req.file.filename;
     const {fname,lname,email,mobile,gender,location,status} = req.body;

     if(!fname || !lname || !email || !mobile || !gender || !location || !status  || !file){
        res.status(401).json("All Inputs is required");
     }

     try {
        
         const preuser = await users.findOne({email : email});
         
         if(preuser){
            res.status(401).json("This user already exits in our database");
         }else{

             const datacreated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

            const userData = new users({
                fname : fname,
                lname : lname,
                email : email,
                mobile : mobile,
                gender : gender,
                location : location,
                status : status,
                image : file,
                datacreated : datacreated
            });

            await userData.save();

            res.status(200).json(userData);

         }
     } catch (error) {
        res.status(401).json(error);
        console.log("registration respond failed !");
     }
}


//users get
exports.userget = async(req,res)=>{
  try {
   
    const usersdata = await users.find();
    res.status(200).json(usersdata);
  } catch (error) {
    res.status(401).json(error);
  }
}

//get single user
exports.singleuserget = async(req,res)=>{
 
   const {id} = req.params; 

     try {
      const singleuser = await users.findById({_id : id});
      res.status(200).json(singleuser);
     } catch (error) {
      res.status(401).json(error);
     }
  } 

//user edit
exports.useredit = async(req,res)=>{

   
  const {id} = req.params; 
  const {fname,lname,email,mobile,gender,location,status,user_profile} = req.body;
  const file = req.file ? req.file.filename : user_profile  //req.file yani image select karte hai to wo upload hoga nhi to pahle ka jo image rhega wo upload hoga

  const dateUpdated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

  try {
   
    const updateuser = await users.findByIdAndUpdate({_id : id},{
      fname,lname,email,mobile,gender,location,status,image:file,dateUpdated
    });

    await updateuser.save();
    res.status(200).json(updateuser);
  } catch (error) {
   res.status(401).json(error);
  }
}


//delete user
exports.deleteuser = async(req,res)=>{
   
  const {id} = req.params;
  console.log(id);

  try {
   
    const deleteauser = await users.findByIdAndDelete({_id:id})
    res.status(200).json(deleteauser);
  } catch (error) {
   res.status(401).json(error);
  }
}