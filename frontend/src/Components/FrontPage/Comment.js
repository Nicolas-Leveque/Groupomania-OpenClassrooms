import React, { useState, useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthContext'
import CommentModForm from './CommentModForm'
import './Comment.css'

const Comment = (props) => {
    const [ showModifyComment, setShowModifyForm] = useState(false)
    const { setReload, userId, isAdmin } = useContext( AuthContext )
    const myHeaders = new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    })
    const handleDeleteComment = (e) => {
        
        e.preventDefault()
        fetch(`http://localhost:3001/comment/${props.id}`, {
            method: 'delete',
            headers: myHeaders
        })
        .then(res => console.log(res))
        .then(setReload( true ))
    }
    
    const changeModifyComment = (e) => {
        e.preventDefault()
        setShowModifyForm(!showModifyComment)
    }
    
    return (  
        < div className="comment">
            <div className="comment-profil">
                <img id="photo-profil" src={`data:${props.typeImage};base64,${props.avatar}`} alt="" />
                <h5>{props.name}</h5>
            </div>
            <p className="comment-contenu">{props.contenu}</p>
            {(showModifyComment) && <CommentModForm contenu={props.contenu} id={props.id} switch={changeModifyComment}/>}
            {(userId === props.userId || isAdmin === true) && (
                <div className="comment-control">
                    <button onClick={changeModifyComment}>Modifier</button>
                    <button onClick={handleDeleteComment}>Supprimer</button>
                </div> 
            )}
                
        </div>
    );
}

export default Comment;