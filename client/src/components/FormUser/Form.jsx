import React, { useEffect, useState } from 'react'
import EditUser from '../EditUser/EditUser';
import "../FormUser/form.css"
import { Link } from "react-router-dom";

export const Form = (props) => {
  const [name, setName] = useState("");
  const [edit, setEdit] = useState(false)

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };
  const fname = props.data.firstName;
  console.log(fname.charAt(0));
  return (

    <div style={{ marginTop: "3.6%" }}>
      <div className="upperContainer">
        <div className="imageContainer">
          <p className="profile">{props.data.firstName.charAt(0).toUpperCase()}</p>
        </div>

      </div>
      <div className="lowerContainer">
        <h3>{props.data.firstName}</h3>
        <h4>{props.data.lastName}</h4>
        <p>{props.data.email}</p> 
        <button className="logoutButton" onClick={handleLogout}>Log-Out</button><br />
  
        {/* <Link to="/EditProfile">
          <button  className="logoutButton">EditUser</button>
        </Link> */}

      </div>
    </div>
  )
}

export default Form;