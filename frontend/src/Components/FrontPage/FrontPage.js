import React, { useState, useEffect, useContext } from 'react';
import './FrontPage.css';
import ShareForm from '../FrontPage/ShareForm';
import { AuthContext } from '../../Contexts/AuthContext';
import Post from '../FrontPage/Post';

const FrontPage = () => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const { reload, setReload } = useContext(AuthContext);
	useEffect(() => {
		const myHeaders = new Headers({
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		});
		fetch('http://localhost:3001/post', {
			method: 'get',
			headers: myHeaders,
		})
			.then((response) => response.json())
			.then((json) => {
				setData(json);
				console.log(data);
				setIsLoading(false);
			});
		setReload(false);
		// eslint-disable-next-line
	}, [reload, setReload]);
	if (isLoading) {
		return <p>Loading...</p>;
	}
	return (
		<div className="frontpage">
			<ShareForm />
			{console.log(data)}
			{data.map((data, idx) => (
				<Post postData={data} key={idx} />
			))}
		</div>
	);
};

export default FrontPage;
