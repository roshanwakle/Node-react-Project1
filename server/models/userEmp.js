const mongoose = require("mongoose");
// const Joi = require("joi");
const Schema = mongoose.Schema

const EmployeeSchema  = new Schema({
    firstName:
    {
        type: String,
        required: true
    },
    lastName:
    {
        type: String,
        required: true
    },
    mobileNo:
    {
        type: String,
        required: true
    },
    empId:
    {
        type: String,
        required: true
    },
},{timestamps:true});

var Employee = mongoose.model("Employee", EmployeeSchema);

const validate = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().required().label("First Name"),
        lastName: Joi.string().required().label("Last Name"),
        mobileNo: Joi.string().mobileNo().required().label("mobile Number"),
        password: empId().required().label("Employee id"),
    });
    return schema.validate(data);
};

module.exports = Employee;
