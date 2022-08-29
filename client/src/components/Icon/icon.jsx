import "../Main/main.css"
import axios from 'axios'
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Form from "../FormUser/Form";

const Icon = (props) => {
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
                <h5 className="EntryHeading">WELCOME {data.firstName.toUpperCase()} {data.lastName.toUpperCase()} !</h5>
                <div>
                    <button className="UserProfileButton">
                        <ion-icon onClick={() => setOpen(!open)} name="person-circle-outline" size="large " data-bs-toggle="modal" data-bs-target="#staticBackdrop"></ion-icon>
                    </button>
                </div>
                {open && <Form data={data} name={data.firstName} />}

            </nav>
            <div >
            </div>
        </div>
    );
};

export default Icon;

