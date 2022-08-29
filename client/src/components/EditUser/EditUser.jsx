import { useState, useEffect } from 'react'
import React from 'react'
import "../EditUser/editUser.css"
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditUser = (props) => {
  const [userdata, setUserData] = useState([]);
  const [firstName, setFirstName] = useState("")
  const [lastName, setlastName] = useState("")
  const [email, setEmail] = useState("")
  const [id, setID] = useState("")
  const [admin, setAdmin] = useState(props.admin);
  const params = useParams();

  const getUserDetails = async () => {

  }

  const getUser = async () => {

    const url = `http://localhost:8080/api/users`;
    await axios.get(url).then((response) => {

      localStorage.getItem('admin') === 'true' ? setUserData(response.data) : setUserData(response.data.filter((item) => {
        if ((item.email === localStorage.getItem('email'))) {
          return item
        }
      }))

      // if (localStorage.getItem('admin') === 'true') {

      //   setUserData(response.data)
      // } else if (localStorage.getItem('admin') === 'false') {
      //   setUserData(response.data.filter((item) => {
      //     if ((item.email === localStorage.getItem('email'))) {
      //       return item
      //     }
      //   }))
      // }

    }).catch((err) => {
      console.log(err);
    })
  }
  useEffect(() => {
    getUserDetails();
    getUser();
  }, [])



  const updateUser = async () => {
    console.log(firstName, lastName, email, "+++++++++++++++++");
    if (firstName && lastName && email) {
      const obj = { firstName: firstName, lastName: lastName, email: email };
      const url = `http://localhost:8080/api/users/${id}`;
      console.log("id", url);
      await axios.put(url, obj).then((response) => {

        console.log("res", response.data);
        if (response) {
          getUser();
          setFirstName('');
          setlastName('');
          setEmail('');
          setID('');
        }


      }).catch((err) => {
        console.log(err);
        setFirstName('');
        setlastName('');
        setEmail('');
        setID('');
      })
    }
  }
  const updateOnClick = async (item) => {
    console.log(firstName, lastName, email, "+++++++++++++++++");
    setFirstName(item.firstName);
    setlastName(item.lastName);
    setEmail(item.email);
    setID(item.id);
  }

  const deleteUser = async (id) => {

    const url = `http://localhost:8080/api/users/${id}`;
    console.log("id", url);
    await axios.delete(url).then((response) => {
      toast.error('user deleted succesfuly.!')
      if (response) {
        getUser();
      }
    }).catch((err) => {
      console.log(err);
    })
  }
  return (

    <div className='container'>
      <ToastContainer
      position="top-center"
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover/>
      <div >
        <Link to="/">
          <button className='goButton'>Go back</button>
        </Link>

        <form className='box p-3 mb-3 mt-5 ' >
          <div>
            <label htmlFor="name" >First Name</label>
            <input id="name" type="text" value={firstName} onChange={(e) => { setFirstName(e.target.value) }} />
          </div>
          <div>
            <label htmlFor="name">Last Name</label>
            <input id="name" type="text" value={lastName} onChange={(e) => { setlastName(e.target.value) }} />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input id="email" type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
          </div>
          <button type="submit" className='submitButton' onClick={updateUser}>Submit</button>
        </form>
      </div>
      <div >
        <table >
          <tr >
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Delete</th>
            <th>Update</th>

          </tr>
          {
            userdata.map((item, index) => {
              return (
                <>
                  <tr key={item._id}>
                    <th>{item.firstName}</th>
                    <th>{item.lastName}</th>
                    <th>{item.email}</th>
                    <th>
                      {/* { admin === 'true' &&} */}
                      <button className='deleteButton' onClick={() => { deleteUser(item._id) }}>Delete</button>
                    </th>
                    <th>
                      <button className='updateButton' onClick={() => { updateOnClick(item) }}>Update</button>

                    </th>
                  </tr>
                </>
              );

            })
          }
        </table>
      </div>
    </div>
  )
}
export default EditUser