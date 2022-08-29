// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// import  EmpDetails  from "../employeeDtails/addEditEmp";
// import  GetEmpDetails  from "../employeeDtails/empDetails";

// export const Role = () => {
//     const [role, setRole] = useState();

//     axios.defaults.withCredentials = "true"

//     useEffect(() => {
//         const url = `http://localhost:8080/api/users`;
//          axios.get(url).then((response) => {
//             console.log("url", url);
//             console.log("res", response.data);
//             setRole(response.data.isAdmin)
//         }).catch((err) => {
//             console.log(err);
//         })
//     }, [])

//     return (
//         <div>
//             <h1>Roshan</h1>
//             {/* {role == 'false' && <GetEmpDetails/>} */}
//             {role == 'true' && <GetEmpDetails/>}

//         </div>
//     )
// }
