import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';
import './UserProfil.css';
import FormProfil from './FormProfil';
import FormAvatar from './FormAvatar';

const UserProfil = () => {
	const [data, setData] = useState([]);
	const [showFormPicture, setShowFormPicture] = useState(false);
	const { reload, setReload } = useContext(AuthContext);
	const myHeaders = new Headers({
		'Content-Type': 'application/json',
		Authorization: 'Bearer ' + localStorage.getItem('token'),
	});

	useEffect(() => {
		fetch('http://localhost:3001/me', {
			method: 'GET',
			headers: myHeaders,
		})
			.then((response) => response.json())
			.then((json) => {
				const tempDate = new Date(json.createdAt);
				json.createdAt = tempDate.toDateString();
				setData(json);
			});
		setReload(false);
		// eslint-disable-next-line
	}, [reload, setReload]);

	const handleShowFormPicture = (e) => {
		e.preventDefault();
		setShowFormPicture(!showFormPicture);
	};

	return (
		<div className="user-profil">
			<h2>{data.fullName}</h2>
			<p>Inscrit depuis {data.createdAt}</p>
			<div className="user-container">
				<div className="profil-photo">
					<img src={data.imageUrl} alt="profil" />
					<button onClick={handleShowFormPicture}>Choisir une photo</button>
					{showFormPicture && <FormAvatar />}
				</div>
				<FormProfil data={data} />
			</div>
		</div>
	);
};

export default UserProfil;
