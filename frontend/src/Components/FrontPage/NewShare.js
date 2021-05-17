import './NewShare.css'

const NewShare = (props) => {

    return (
        <form onSubmit="">
            <div className="input-group">
                <input 
                type="text"
                name="title" 
                placeholder="titre"
                className="form-input"/>
                <textarea 
                name="post" 
                rows="5"
                className="form-input"/>
            </div>
            <div className="control-group">
                <button type="submit">Publier</button>
                <button onClick={props.onCancel} >Annuler</button>
            </div>
            
        </form>
    )
}

export default NewShare