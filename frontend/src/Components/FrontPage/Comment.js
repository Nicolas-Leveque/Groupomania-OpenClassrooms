import React, { useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthContext'
import './Comment.css'

const Comment = (props) => {
    const { setReload, userId, isAdmin } = useContext( AuthContext )
    const myHeaders = new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    })
    const handleDeleteComment = (e) => {
        e.preventDefault()
        fetch(`http://localhost:3000/comment/${props.id}`, {
            method: 'delete',
            headers: myHeaders
        }).then(res => console.log(res))
        setReload( true )

    }
    return (  
        <div className="comment">
            <div className="comment-profil">
                <img id="photo-profil" src={`data:${props.typeImage};base64,${props.avatar}`} alt="" />
                <h5>{props.name}</h5>
            </div>
            <p className="comment-contenu">{props.contenu}</p>
            <div className="comment-control">
                {(userId === props.userId || isAdmin) && <button onClick={handleDeleteComment}>Supprimer</button>}
            </div>
        </div>
    );
}

export default Comment;