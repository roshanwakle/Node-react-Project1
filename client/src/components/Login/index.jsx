import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../Login/loginUser.css"
const Login = () => {
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");
	
	console.log(data, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>")

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8080/api/auth";
			const { data: res } = await axios.post(url, data);
			//token Storage
			// toast("Wow so easy!");
			console.log("resp................", res.data.admin);
			localStorage.setItem("token", res.data.token, "email", data.email);
			localStorage.setItem("email", data.email);
			localStorage.setItem("admin", res.data.admin);

			window.location = "/";

		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};
	

	return (
		<div className="login_container">
			<div className="login_form_container">
				<div className="left">
					<form className="form_container" onSubmit={handleSubmit} >
						<h1  >Login Hear</h1>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className="input"
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className="input"
						/>
						{/* <label class="switch">
							<input type="checkbox" onChange={toggler} />
							<span class="slider round" ></span>
							{toggle ? <h4 className="toggleTrue">you are admin</h4>:<h4 className="toggleFalse">you are not admin</h4>}

						</label> */}
						{error && <div className="error_msg">{error}</div>}
						<button type="submit" className="green_btn" >
							Sign In
						</button>
					</form>
				</div>
				<div className="right">
					<h1 className="newColor">New Hear?</h1>
					<Link to="/signup">
						<button type="button" className="white_btn">
							Sign Up
						</button>
					</Link>
				</div>
			</div>
			
		</div>

	);
};

export default Login;
