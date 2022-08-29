const router = require("express").Router();
const { User} = require("../models/user");
const bcrypt = require("bcrypt");
const passwordComplexity = require("joi-password-complexity");
const Joi = require("joi");

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		console.log(">>>>>>>>>>>>>>>>>",req.body)
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		await new User({ ...req.body, password: hashPassword }).save();
		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.get('/', async (req,res)=> {
    try{
       let user= await User.find();
        res.send(user);
    }catch (e) {
        res.json({message: e.message})
    }
})

router.get('/:email', async (req,res)=> {
    try{
       let user= await User.findOne({email:req.params.email});
        res.json(user);
    }catch (e) {
        res.json({message: e.message})
    }
})

router.put("/:id" ,async (req,res) => {
	try {
		let data = await User.updateOne(req.params,{$set:req.body})
	    res.json(data)
	} catch (e) {
		res.json({message: e.message})

	}
	
})

router.delete("/:id" ,async (req,res) => {
    try{
        await User.deleteOne({_id: req.params.id});
        res.status(201).json("User deleted Successfully");
    } catch (e){
        response.status(409).json({ message: e.message});     
    }
})
    
const validate = (data) => {
	const schema = Joi.object({
		firstName: Joi.string().required().label("First Name"),
		lastName: Joi.string().required().label("Last Name"),
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Password"),
		// isAdmin: Joi.boolean().isAdmin().label("isAdmin"),

	});
	return schema.validate(data);
};

module.exports = router;
