import "../Main/main.css"
import axios from 'axios'
import React, { useState, useEffect } from "react";
import Form from "../FormUser/Form";
import EditUser from "../EditUser/EditUser";
import { Link } from "react-router-dom";
import { SerchBar } from "../SearchBar/SerchBar";
import { SerchBarr } from "../SearchBar/SerchBarr";
import { Cards } from "../Cards/Cards"
import { Sidebar } from "../SideBar/Sidebar";
import Icon from "../Icon/icon";
import { Carouser } from '../carouser/carouser';
import Product from "../product/product";

const Main = (props) => {
  console.log("props", props);
  const [admin, setAdmin] = useState(props.admin);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("");

  const getData = async () => {

    const email = localStorage.getItem("email");
    console.log("email", email);
    const url = `http://localhost:8080/api/users/${email}`;
    await axios.get(url).then((response) => {
      console.log("url", url);
      console.log("res", response.data);
      setData(response.data);
      setName(response.data.firstName);
    }).catch((err) => {
      console.log(err);
    })

  }           
  useEffect(() => {
    getData()
  }, []);
  return (
    <div className="">
      <nav className="navbar">
        
        <Sidebar />
        
        {/* <Link to="/login">
          <h1 className="Header">Roshan</h1>
        </Link> */}

        {/* <Link to="/employeeDetails">
          <h1 className="EmployeeDetails">EmployeeDetails</h1>
        </Link><br /> */}
        {/* {admin === 'true' && <Link to="/EditProfile">
          <h1 className="userDetails">EditUser</h1>
        </Link>} */}
        {/* <Link to="/EditProfile">
          <h1 className="userDetails">EditUser</h1>
        </Link> */}
        <h5 className="EntryHeading">WELCOME {data.firstName.toUpperCase()} {data.lastName.toUpperCase()} !</h5>

        <SerchBar />
        <div>
          <button className="UserProfileButton">
            <ion-icon onClick={() => setOpen(!open)} name="person-circle-outline" size="large " data-bs-toggle="modal" data-bs-target="#staticBackdrop"></ion-icon>
          </button>
        </div>
        {open && <Form data={data} name={data.firstName} />}
      </nav>
      <div className="sizeAdjust">
      <Carouser/>
      </div>
      <div >
        <Cards />
      </div>
      <div><Product/></div>
    </div>


  );
};

export default Main;

