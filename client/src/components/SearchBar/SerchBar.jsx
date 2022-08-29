import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import '../SearchBar/SearchBar.css'

export const SerchBar = () => {
    const [data, setData] = useState([]);
    const [sdata, setSData] = useState('');
    const navigate = useNavigate();
    const searchData = async (e) => {
        // e.preventDefault()
        const response = await axios.get(`http://localhost:8080/api/empUser/getEmp`)
        setData(response.data.message);
    }
    console.log("data>>>>>>>>>>>", data);
    useEffect(() => {
        searchData();
    }, [])

    const search = (e) => {
        e.preventDefault();
        setSData(e.target.value)
    }

    const onSearch = (serach) => {
        setSData(serach)
        console.log("serach>>>>>>>>>>>", serach);
        navigate("/View");
        localStorage.setItem("name",serach);
    }
    return (
        <div>
            <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={sdata} onChange={search} />
                {/* <Link to="/View"> */}
                    {/* <button className="btn btn-outline-dark" type="submit" onClick={() => onSearch(sdata)}>Search</button> */}
                {/* </Link> */}
            </form>
            {
                data && data.filter(item => {
                    const searchItem = sdata.toLowerCase()
                    const fullName = item.firstName.toLowerCase()
                    return searchItem && fullName.startsWith(searchItem) && fullName !== searchItem
                }).slice(0, 4)
                    .map((item, index) => {
                        return (
                            <div onClick={() => onSearch(item.firstName)} key={index} className="dropdown-row">
                                {item.firstName} &nbsp;
                                {item.lastName}
                            </div>
                        )
                    })
            }
        </div>
    )
}
