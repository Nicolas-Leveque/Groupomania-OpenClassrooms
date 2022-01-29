import React, { useState } from 'react';
import './ShareForm.css';
// import { AuthContext } from '../../Contexts/AuthContext';

const NewShare = (props) => {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [newPic, setNewPic] = useState();
	// const { setReload } = useContext(AuthContext);

	const createPost = (e) => {
		e.preventDefault();

		const myHeaders = new Headers({
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		});
		const data = new FormData();
		// data.append('userId', localStorage.getItem('id'));
		data.append('image', newPic);
		data.append('titre', title);
		data.append('contenu', content);
		console.log(data);
		fetch('http://localhost:3001/post', {
			method: 'POST',
			headers: myHeaders,
			body: data,
		}).then((response) => console.log(response));
		// setReload(true);
		props.onCancel();
	};
	return (
		<form onSubmit={createPost}>
			<div className="input-group">
				<input
					type="text"
					name="title"
					placeholder="titre"
					className="form-input title-input"
					onChange={(e) => setTitle(e.target.value)}
				/>
				<textarea
					name="post"
					rows="5"
					className="form-input"
					onChange={(e) => setContent(e.target.value)}
				/>
				<input
					className="form-input"
					type="file"
					name="imageUrl"
					accept=".jpg, .jpeg, .png, .gif"
					onChange={(e) => {
						setNewPic(e.target.files[0]);
					}}
				/>
			</div>
			<div className="control-group">
				<button type="submit">Publier</button>
				<button onClick={props.onCancel}>Annuler</button>
			</div>
		</form>
	);
};

export default NewShare;
