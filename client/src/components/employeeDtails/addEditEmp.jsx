import React, { useState } from 'react'
// import { useHistory, useLocation } from 'react-router-dom'
import { Link } from "react-router-dom";
import axios from 'axios'
import "../employeeDtails/addEmp.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddEditEmp = (props) => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [mobileNo, setMobileNumber] = useState("")
    const [empId, setEmpId] = useState("")
    const [error, setError] = useState(false);
   

    console.log({ firstName, lastName, mobileNo, empId, }, ">>>>>>>>>>>>>>>>>>>>")
    // 	const navigate = useNavigate();
    //    let data = {firstName,lastName,mobileNo,empId}

    const addUserDetails = async (e) => {
        // e.preventDefault();
        const EmpDetails = { firstName: firstName, lastName: lastName, mobileNo: mobileNo, empId: empId }
        await axios.post('http://localhost:8080/api/empUser/addEmp', EmpDetails)
        toast.success('record added successfuly')
            .then((res) => {
                window.location.reload()
            })
    };

    return (
        <div>
            <ToastContainer />
            <div className='div' >
                <form className='center' >

                    <h4>Add Details</h4>
                    <div className='inputDesign'>
                        <label htmlFor="firstName" >First Name</label>
                        <input name="firstName" placeholder='Enter your first name' type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}  />
                        {error && !firstName && <spam className="validation">Enter Valid First Name</spam>}
                    </div>
                    <div className='inputDesign'>
                        <label htmlFor="lastName">Last Name</label>
                        <input name="lastName" placeholder='Enter your last name' type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}  />
                        {error && !lastName && <spam className="validation">Enter Valid First Name</spam>}
                    </div>
                    <div className='inputDesign'>
                        <label htmlFor="mobileNo">Mobile Number</label>
                        <input name="mobileNo" placeholder='Enter your mobile number' type="text" value={mobileNo} onChange={(e) => setMobileNumber(e.target.value)}/>
                        {error && !mobileNo && <spam className="validation">Enter Valid First Name</spam>}
                    </div>
                    <div className='inputDesign'>
                        <label htmlFor="empId">Emp Id</label>
                        <input name="empId" placeholder='Enter your Id' type="text" value={empId} onChange={(e) => setEmpId(e.target.value)}  />
                        {error && !empId && <spam className="validation">Enter Valid First Name</spam>}
                    </div>
                    <Link to="/employeeDetails">

                        <button type="submit" className='addSubmitButton' onClick={() => addUserDetails()} >Submit</button>
                    </Link>
                </form>

            </div>
        </div>
    )
}
export default AddEditEmp
