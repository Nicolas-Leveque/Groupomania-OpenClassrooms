import React, { useState } from 'react'
import NewShare from './NewShare'
import './ShareForm.css'

const ShareForm = (props) => {
    const [isFormVisible, setIsFormVisible] = useState(false)
    const showForm = () => {
        setIsFormVisible(true)
    }
    const collapseForm = () => {
        setIsFormVisible(false)
    }
    return(
        <div className="share-form">
            {!isFormVisible && (
                <button onClick={ showForm }>Partager</button>)}
            {isFormVisible && (
                <NewShare onCancel={collapseForm} />)}
        </div>
    )

}


export default ShareForm