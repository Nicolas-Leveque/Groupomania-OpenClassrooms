import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthContext';
import PostModForm from './PostModForm';
import './Post.css';

const Post = ({ postData }) => {
	const [showModifyPost, setShowModifyPost] = useState(false);
	const { setReload, userId, isAdmin } = useContext(AuthContext);
	let history = useHistory();
	//Formatage de la date du post
	const tempDate = new Date(postData.createdAt);
	postData.createdAt = tempDate.toDateString();

	const myHeaders = new Headers({
		'Content-Type': 'application/json',
		Authorization: 'Bearer ' + localStorage.getItem('token'),
	});
	const handleDeletePost = (e) => {
		e.preventDefault();
		fetch(`http://localhost:3001/post/${postData.id}`, {
			method: 'delete',
			headers: myHeaders,
		}).then((res) => console.log(res));
		setReload(true);
		history.push('/home');
	};
	const changeModifyPost = (e) => {
		e.preventDefault();
		setShowModifyPost(!showModifyPost);
	};

	return (
		<article className="post-container">
			<div className="utilisateur-info">
				<div className="photo-profil">
					<img
						className="profil-pic"
						src={postData.user.imageUrl}
						alt="profil"
					/>
				</div>
				<div className="info-partage">
					<p className="nom-utilsateur">
						{postData.user.firstName} {postData.user.lastName}
					</p>
					<p className="heure-post">{postData.createdAt}</p>
				</div>
			</div>
			<div className="post-info">
				<Link to={`/post/${postData.id}`} postData={postData.id}>
					<h3 className="titre-post">{postData.titre}</h3>
					{postData.imageUrl && (
						<img
							className="post-pic"
							src={postData.imageUrl}
							alt={`post n°${postData.id}`}
						/>
					)}
					<p className="corps-post">{postData.contenu}</p>
				</Link>
				<p className="nbre-comments">{postData.comments.length} Commentaires</p>
			</div>
			{showModifyPost && (
				<PostModForm
					id={postData.id}
					titre={postData.titre}
					contenu={postData.contenu}
					switch={changeModifyPost}
				/>
			)}
			{(userId === postData.userId || isAdmin === true) && (
				<div className="post-control">
					<button onClick={changeModifyPost}>Modifier</button>
					<button onClick={handleDeletePost}>Supprimer</button>
				</div>
			)}
		</article>
	);
};
export default Post;
