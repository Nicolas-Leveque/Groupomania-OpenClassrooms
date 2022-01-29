import React, { useState, useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';
import NewShare from './NewShare';
import './ShareForm.css';

const ShareForm = () => {
	const [isTextFormVisible, setIsTextFormVisible] = useState(false);

	const { setReload } = useContext(AuthContext);
	const showTextForm = () => {
		setIsTextFormVisible(true);
	};

	const collapseForm = () => {
		setIsTextFormVisible(false);

		setReload(true);
	};
	return (
		<div className="share-form">
			{!isTextFormVisible && (
				<div className="group-trigger">
					<button className="trigger-partage" onClick={showTextForm}>
						Créer un post
					</button>
				</div>
			)}
			{isTextFormVisible && <NewShare onCancel={collapseForm} />}
		</div>
	);
};

export default ShareForm;
