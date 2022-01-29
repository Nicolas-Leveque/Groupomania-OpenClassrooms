import React, { useState, useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';
import CommentModForm from './CommentModForm';
import './Comment.css';

const Comment = ({ commentData }) => {
	const [showModifyComment, setShowModifyForm] = useState(false);
	const { setReload, userId, isAdmin } = useContext(AuthContext);
	const myHeaders = new Headers({
		'Content-Type': 'application/json',
		Authorization: 'Bearer ' + localStorage.getItem('token'),
	});
	const handleDeleteComment = (e) => {
		e.preventDefault();
		fetch(`http://localhost:3001/comment/${commentData.id}`, {
			method: 'delete',
			headers: myHeaders,
		})
			.then((res) => console.log(res))
			.then(setReload(true));
	};

	const changeModifyComment = (e) => {
		e.preventDefault();
		setShowModifyForm(!showModifyComment);
	};

	return (
		<article className="comment">
			<div className="comment-profil">
				<img id="photo-profil" src={commentData.user.imageUrl} alt="" />
				<h5>{commentData.name}</h5>
			</div>
			<p className="comment-contenu">{commentData.contenu}</p>
			{showModifyComment && (
				<CommentModForm
					contenu={commentData.contenu}
					id={commentData.id}
					switch={changeModifyComment}
				/>
			)}
			{(userId === commentData.userId || isAdmin === true) && (
				<div className="comment-control">
					<button onClick={changeModifyComment}>Modifier</button>
					<button onClick={handleDeleteComment}>Supprimer</button>
				</div>
			)}
		</article>
	);
};

export default Comment;
