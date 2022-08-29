import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Singup";
import Login from "./components/Login";
// import Form from "./components/FormUser/form";
import EditUser from "./components/EditUser/EditUser";
import  EmpDetails  from "./components/employeeDtails/empDetails";
import  AddEditEmp  from "./components/employeeDtails/addEditEmp";
import { View } from "./components/employeeDtails/View";
import { Cards } from "./components/Cards/Cards";
import { CardInfo } from "./components/Cards/CardInfo";
import Icon from "./components/Icon/icon";
import { Carouser } from "./components/carouser/carouser";
import Product from "./components/product/product"

function App() {
	const user = localStorage.getItem("token");
	const admin = localStorage.getItem("admin");

	return (	
		<Routes>
			{user && <Route path="/" exact element={<Main admin={admin}/>} />}
			{/* <Route path="/" exact element={<Main/>} /> */}
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/EditProfile" exact element={<EditUser />} />
			<Route path="/employeeDetails" exact element={<EmpDetails admin={admin}/>} />
			<Route path="/" element={<Navigate replace to="/login" />} />
			<Route path="/AddEditEmp/:id" exact element={<AddEditEmp />} />
			<Route path="/View" exact element={<View />} />
			<Route path="/Cards" exact element={<Cards />} />
			<Route path="/CardInfo" exact element={<CardInfo />} />
			<Route path="/Icon" exact element={<Icon />} />
			<Route path="/carouser" exact element={<Carouser />} />
			<Route path="/Product" exact element={<Product />} />

		



			{/* <Route path="/Sidebar" exact element={<Sidebar />} /> */}


			{/* <Route path="/SerchBarr" exact element={<SerchBarr />} /> */}

		
		</Routes>
	);
}

export default App;
