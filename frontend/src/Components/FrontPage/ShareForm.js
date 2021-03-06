import React, { useState, useContext } from 'react'
import { AuthContext } from '../../Contexts/AuthContext'
import NewShare from './NewShare'
import NewPic from './NewPic'
import './ShareForm.css'

const ShareForm = () => {
    const [isTextFormVisible, setIsTextFormVisible] = useState(false)
    const [isPicFormVisible, setIsPicFormVisible] = useState(false)
    const { setReload } = useContext( AuthContext )
    const showTextForm = () => {
        setIsTextFormVisible(true)
    }
    const showPicForm = () => {
        setIsPicFormVisible(true)
    }
    const collapseForm = () => {
        setIsTextFormVisible(false)
        setIsPicFormVisible(false)
        setReload(true)
    }
    return(
        <div className="share-form">
            {(!isTextFormVisible && !isPicFormVisible )&& (
                <div className="group-trigger"><button className="trigger-partage" onClick={ showTextForm }>Envoyer un message</button><button className="trigger-partage" onClick={ showPicForm }>Envoyer une image</button></div> )}
            {isTextFormVisible && (
                <NewShare onCancel={collapseForm} />)}
            {isPicFormVisible && (
                <NewPic onCancel={collapseForm} />)}
        </div>
    )

}


export default ShareForm