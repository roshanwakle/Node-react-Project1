import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmpDetails = (props) => {
    const [data, setData] = useState([])
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [mobileNo, setmobileNumber] = useState("")
    const [empId, setempId] = useState("")
    const [admin, setAdmin] = useState(props.admin);
    const [filterValue, setFilterValue] = useState("")
    const [searchApiData, setSearchApiData] = useState("")



    // console.log("adminEmpDetails",props.admin);

    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = async (e) => {
        const response = await axios.get(`http://localhost:8080/api/empUser/getEmp`)
        if (response.status === 200) {
            setData(response.data.message)
        }
        setSearchApiData(response.data.message)
    }

    const deleteEmployee = async (empId) => {
        const url = `http://localhost:8080/api/empUser//deleteEmp/${empId}`;
        toast.error("record deleted", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
        console.log("empId", url);
        await axios.delete(url).then((response) => {
            // alert("record deleted")
            console.log("res", response.data);
            if (response) {
                getUsers();

            }

        }).catch((err) => {
            console.log(err);
        })
    }
    //update Employee

    const updateOnClick = (item) => {
        console.log(firstName, lastName, mobileNo, "+++++++++++++++++");
        setFirstName(item.firstName);
        setLastName(item.lastName);
        setmobileNumber(item.mobileNo);
        setempId(item.empId);

    }
    const updateEmployee = async () => {
        console.log(firstName, lastName, mobileNo, empId, "+++++++++++++++++");
        if (firstName && lastName && mobileNo && empId) {
            const obj = { firstName: firstName, lastName: lastName, mobileNo: mobileNo, empid: empId };
            const url = `http://localhost:8080/api/empUser/updateEmp/${empId}`;
            toast.success('record updated succesfuly')
            await axios.put(url, obj).then((response) => {
                

                if (response) {
                    getUsers();
                    setFirstName('');
                    setLastName('');
                    setmobileNumber('');
                    setempId('')

                }
                // alert("record updated")

            }).catch((err) => {
                console.log(err);
                getUsers();
                setFirstName('');
                setLastName('');
                setmobileNumber('');
                setempId('')

            })
        }
    }


    const handleFilter = (e) => {
        if (e.target.value === ' ') {
            setData(searchApiData)
        } else {
            const filterResult = searchApiData.filter(item => item.firstName.toLowerCase().includes(e.target.value.toLowerCase()) || item.empId.toLowerCase().includes(e.target.value.toLowerCase()))
            setData(filterResult)
        }
        setFilterValue(e.target.value)
    }

    return (

        <div className='div'>
            <ToastContainer
               position="top-center"
               autoClose={1000}
               hideProgressBar={false}
               newestOnTop={false}
               closeOnClick
               rtl={false}
               pauseOnFocusLoss
               draggable
               pauseOnHover />
            <div className='center'>
                <input className="form-control me-2" type="search" placeholder="Search Employees" aria-label="Search" value={filterValue} onInput={(e) => handleFilter(e)} />

                {admin === 'true' && <form className='box p-3 mb-3 mt-5 ' >
                    <div className='inputDesign'>
                        <label htmlFor="name" >First Name</label>
                        <input id="name" placeholder='Enter your first name' type="text" value={firstName} onChange={(e) => { setFirstName(e.target.value) }} />
                    </div>
                    <div className='inputDesign'>
                        <label htmlFor="name">Last Name</label>
                        <input id="name" placeholder='Enter your last name' type="text" value={lastName} onChange={(e) => { setLastName(e.target.value) }} />
                    </div>
                    <div className='inputDesign'>
                        <label htmlFor="email">Mobile Number</label>
                        <input id="email" placeholder='mobile number' type="text" value={mobileNo} onChange={(e) => { setmobileNumber(e.target.value) }} />
                    </div>
                    <div className='inputDesign'>
                        <label htmlFor="email">Emp Id</label>
                        <input id="email" placeholder='Enter your ID' type="text" value={empId} onChange={(e) => { setempId(e.target.value) }} />
                    </div>
                    <button type="submit" className='addSubmitButton' onClick={updateEmployee}>Submit</button>
                </form>}

            </div>
            <div>
                <table className='table table-dark table-hover'>
                    <thead>
                        <tr>
                            <th>sr</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Mobile Number</th>
                            <th>Emp Id</th>
                            {admin === 'true' && <th>Action</th>}

                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <th scope='row'>{index + 1}</th>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.mobileNo}</td>
                                    <td>{item.empId}</td>
                                    {
                                        admin === 'true' && <td>
                                            <Link to={`/AddEditEmp/${item.id}`}>
                                                <button className='submitButton'>Add Emp</button>
                                            </Link>
                                            <button className='deleteButton' onClick={() => deleteEmployee(item.empId)}>Delete</button>

                                            <button className='updateButton' onClick={() => { updateOnClick(item) }}>Update</button>
                                        </td>
                                    }
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

            </div>
        </div>
    )
}
export default EmpDetails
