import React, { useState, useContext } from 'react'
import './ShareForm.css'
import { AuthContext } from '../../Contexts/AuthContext'

const NewShare = (props) => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const { reload, setReload } = useContext( AuthContext )

    const createPost = (e) => {
        e.preventDefault()
        const newShare = {
            titre: title,
            contenu: content,
            type_post: "text",
            userId: localStorage.getItem('id')
        }
        const myHeaders = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        })
        fetch('http://localhost:3001/post', {
            method:'post',
            headers: myHeaders,
            body: JSON.stringify(newShare)
        }).then(response => console.log(response))
        .then(setReload( true ))
        .then(props.onCancel())
        console.log(reload)
    }
    return (
        <form onSubmit={createPost}>
            <div className="input-group">
                <input 
                type="text"
                name="title" 
                placeholder="titre"
                className="form-input title-input"
                onChange={(e) => setTitle(e.target.value)}/>
                <textarea 
                name="post" 
                rows="5"
                className="form-input"
                onChange={(e) => setContent(e.target.value)}/>
            </div>
            <div className="control-group">
                <button type="submit">Publier</button>
                <button onClick={props.onCancel} >Annuler</button>
            </div>
            
        </form>
    )
}

export default NewShare