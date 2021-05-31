import React, { useState, useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthContext'
import './ShareForm.css'

const NewPic = (props) => {
    const [title, setTitle] = useState('')
    const [ newPic, setNewPic ] = useState()
    const { reload, setReload } = useContext( AuthContext )
    const handleNewPicShare = (e) => {
        e.preventDefault()

        const myHeaders = new Headers({
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        })

        function setNewPicShare() {
            const data = new FormData()
            data.append('userId', localStorage.getItem('id'))
            data.append('imageData', newPic)
            data.append('titre', title)
            console.log(data)
            fetch(`http://localhost:3000/post/pic`, {
                method: 'post',
                headers: myHeaders,
                body:  data
            }).then(res => console.log(res))
            .then(setReload(true))
            .then(props.onCancel())
            console.log(reload)

        }
        setNewPicShare()
    }
    return (  
        <form onSubmit={handleNewPicShare} className="pic-share">
            <input 
                type="text"
                name="title" 
                placeholder="titre"
                className="form-input title-input"
                onChange={(e) => setTitle(e.target.value)}/>
            <input 
                className="form-input" 
                type="file" 
                id="new-pic-share" 
                name="imageData" 
                accept=".jpg, .jpeg, .png, .gif" 
                onChange={(e) => {setNewPic(e.target.files[0])}} />
            <div className="control-group">
                <button type="submit">Publier</button>
                <button onClick={props.onCancel} >Annuler</button>
            </div>
        </form>
    );
}

export default NewPic;