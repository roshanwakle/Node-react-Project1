const router = require("express").Router();
const Emp = require("../models/userEmp");
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')

router.post("/addEmp",async (req, res) => {
   try {
    const userEmployee = req.body
    console.log(req.body, ">>>>>>>>>>>>>>>>>>>>>>>>");
   if(await Emp.findOne({empId:userEmployee.empId})){
      res.status(201).send({ message: "Already hai " });
      
   }
   else{
      let data = new Emp(userEmployee)
      let result = await data.save()
      res.status(201).send({ message: result });

   }
   } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
   }
});

router.get("/getEmp" ,async (req, res) => {
    try {
    const result = await Emp.find()
     res.status(200).send({ message: result });
    } catch (error) {
     res.status(500).send({ message: "Internal Server Error" });
    }
 });
 
 router.delete("/deleteEmp/:empId", async (req, res) => {
    try {
        console.log(req.params.empId,">>>>>>>>>>>");
     await Emp.deleteOne({empId: req.params.empId});
     res.status(200).send("Employee record deleted Successfully");
    } catch (error) {
     res.status(500).send({ message: "Internal Server Error" });
    }
 });

//  router.delete("/delete/:id",auth, async (req, res) => {
//    try {
//        console.log(req.params.id,">>>>>>>>>>>");
//     await Emp.deleteOne({_id: req.params.id});
//     res.status(200).send("Employee record deleted Successfully............");
//    } catch (error) {
//     res.status(500).send({ message: "Internal Server Error" });
//    }
// });


 router.put("/updateEmp/:empId" ,async (req,res) => {
	try {
		let data = await Emp.updateOne(req.params,{$set:req.body})
        res.status(200).send({data});

	} catch (e) {
		res.json({message: e.message})

	}
	
})
module.exports = router;
