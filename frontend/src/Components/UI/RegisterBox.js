import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthContext';
import './LoginRegister.css';

const RegisterBox = () => {
	const [email, setEmail] = useState();
	const [firstName, setFirstName] = useState();
	const [lastName, setLastName] = useState();
	const [password, setPassword] = useState();
	const [passwordCheck, setPasswordCheck] = useState();
	const [profilPicture, setProfilPicture] = useState();
	const [isRegisterOk, setIsRegisterOk] = useState(true);
	const { setToken, setUserId, setIsAdmin } = useContext(AuthContext);
	let history = useHistory();

	const submitRegister = (e) => {
		e.preventDefault();
		const registerRequest = {
			email: email,
			firstName: firstName,
			lastName: lastName,
			password: password,
			imageUrl: profilPicture,
		};
		const myHeaders = new Headers({
			'Content-Type': 'application/json',
		});

		if (password === passwordCheck) {
			fetch('http://localhost:3001/signup', {
				method: 'post',
				headers: myHeaders,
				body: JSON.stringify(registerRequest),
			})
				.then((response) => response.json())
				.then((json) => {
					localStorage.setItem('token', json.token);
					localStorage.setItem('id', json.user.id);
					localStorage.setItem('admin', json.user.admin);
					setToken(json.token);
					setUserId(json.user.id);
					setIsAdmin(json.user.admin);
					history.push('/home');
				});
		} else {
			setIsRegisterOk(false);
		}
	};

	return (
		<div className="inner-container">
			<div className="header">Register</div>
			<form className="box" onSubmit={submitRegister}>
				<div className="input-group">
					<label htmlFor="email">Email</label>
					<input
						type="text"
						name="email"
						className="login-input"
						placeholder="Email"
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className="input-group">
					<label htmlFor="firstname">Prénom</label>
					<input
						type="text"
						name="firstname"
						className="login-input"
						placeholder="Prénom"
						onChange={(e) => setFirstName(e.target.value)}
					/>
				</div>
				<div className="input-group">
					<label htmlFor="lastname">Nom</label>
					<input
						type="text"
						name="lastname"
						className="login-input"
						placeholder="Nom"
						onChange={(e) => setLastName(e.target.value)}
					/>
				</div>
				<div className="input-group">
					<label htmlFor="password">Mot de passe</label>
					<input
						type="password"
						name="password"
						className="login-input"
						placeholder="Password"
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<div className="input-group">
					<label htmlFor="password-check">Verifier Mot de passe</label>
					<input
						type="password"
						name="password-check"
						className="login-input"
						placeholder="Password"
						onChange={(e) => setPasswordCheck(e.target.value)}
					/>
				</div>
				<div className="input-group">
					<label htmlFor="imageUrl"></label>
					<input
						type="file"
						id="avatar"
						name="imageUrl"
						accept=".jpg, .jpeg, .png"
						onChange={(e) => {
							setProfilPicture(e.target.files[0]);
						}}
					/>
				</div>
				{!isRegisterOk && (
					<p>Les mots ne correspondent pas, veuillez essayer à nouveau</p>
				)}
				<button type="submit" className="login-btn">
					Register
				</button>
			</form>
		</div>
	);
};

export default RegisterBox;
