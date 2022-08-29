import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
export const SerchBarr = (props) => {
    const [data, setData] = useState([])
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [mobileNo, setmobileNumber] = useState("")
    const [empId, setempId] = useState("")
    const [admin, setAdmin] = useState(props.admin);
    const [inputText, setInputText] = useState('roshan')


    console.log('====================================');
    console.log("adminEmpDetails", props.admin);
    console.log('====================================');

    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = async (e) => {
        // e.preventDefault()
        const response = await axios.get(`http://localhost:8080/api/empUser/getEmp`)
        if (response.status === 200) {
            setData(response.data.message)
        }
    }
    console.log("data>>>>>>>", data);

    const deleteEmployee = async (empId) => {
        const url = `http://localhost:8080/api/empUser//deleteEmp/${empId}`;
        console.log("empId", url);
        await axios.delete(url).then((response) => {
            alert("record deleted")
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
            console.log("id", url);
            await axios.put(url, obj).then((response) => {

                console.log("res", response.data);
                if (response) {
                    getUsers();
                    setFirstName('');
                    setLastName('');
                    setmobileNumber('');
                    setempId('')

                }
                alert("record updated")
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

    const onChangeHandler =(e)=>{
        setInputText(e.target.value.toLowerCase())
    }

    return (
        <div className='div'>
            <div className='center'>
                <form className="d-flex" role="search">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={onChangeHandler}/>
                    {/* <button className="btn btn-outline-dark" type="submit">Search</button> */}
                </form>
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
                <table>
                    <thead>
                        <tr>
                            <th>sr</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Mobile Number</th>
                            <th>Emp Id</th>
                           
                        </tr>
                    </thead>
                    <tbody>
                        {
                         data.filter((el)=>{
                            if(el === ''){
                              return el
                            }else{
                              return(el.firstName.toLowerCase().includes(inputText) || el.empId.toLowerCase().includes(inputText) )
                            }
                          }).map((item, index) => {
                            return (
                                <tr key={index}>
                                    <th scope='row'>{index + 1}</th>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.mobileNo}</td>
                                    <td>{item.empId}</td>

                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
