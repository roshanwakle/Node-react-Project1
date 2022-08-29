import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

export const View = (props) => {

  const [data, setData] = useState([]);
  const [sdata, setSData] = useState({});
  const searchData = async (e) => {
    // e.preventDefault()
    const response = await axios.get(`http://localhost:8080/api/empUser/getEmp`)
    setData(response.data.message);
    const name = localStorage.getItem("name");
    const result = response.data.message.filter((val) => {
      if (val.firstName === name) {
        setSData(val);
      }
    })
  }
 
  useEffect(() => {
    searchData();
  }, [])

  return (
    <div className='container' style={{ marginTop: "3.6%" }}>
      <table class="table table-dark table-hover">
        <thead>
          <tr>
            <th scope="col">sr No</th>
            <th scope="col">firstName</th>
            <th scope="col">lastName</th>
            <th scope="col">mobileNo</th>
            <th scope="col">empId</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>{sdata.firstName}</td>
            <td>{sdata.lastName}</td>
            <td>{sdata.mobileNo}</td>
            <td>{sdata.empId}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
