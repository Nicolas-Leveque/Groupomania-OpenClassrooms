import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthContext';
import Comment from './Comment';
import CommentForm from './CommentForm';
import Post from './Post';
import './Detailpost.css';

const DetailPost = () => {
	const { postId } = useParams();
	const [postData, setPostData] = useState({});
	const [commentData, setCommentData] = useState([]);
	const [showCommentForm, setShowCommentForm] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const { reload, setReload } = useContext(AuthContext);
	console.log(postId);
	useEffect(() => {
		const myHeaders = new Headers({
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		});
		fetch(`http://localhost:3001/post/${postId}`, {
			method: 'GET',
			headers: myHeaders,
		})
			.then((response) => response.json())
			.then((json) => {
				setPostData(json);
				console.log('post data', postData);
			});
		fetch(`http://localhost:3001/comment/post/${postId}`, {
			method: 'GET',
			headers: myHeaders,
		})
			.then((response) => response.json())
			.then((json) => {
				setCommentData(json);
				setIsLoading(false);
			});
		setReload(false);

		// eslint-disable-next-line
	}, [reload, setReload]);
	const handleCommentForm = () => {
		setShowCommentForm(true);
	};
	const hideCommentForm = () => {
		setShowCommentForm(false);
		setReload(true);
	};
	if (isLoading) {
		return <p>Loading...</p>;
	}
	return (
		<div className="detail-post">
			<Post postData={postData} />
			{!showCommentForm && (
				<button className="trigger-comment-form" onClick={handleCommentForm}>
					Laisser un commentaire
				</button>
			)}
			{showCommentForm && (
				<CommentForm onCancel={hideCommentForm} post={postId} />
			)}
			{commentData.map((data, idx) => (
				<Comment key={idx} commentData={data} />
			))}
		</div>
	);
};

export default DetailPost;
