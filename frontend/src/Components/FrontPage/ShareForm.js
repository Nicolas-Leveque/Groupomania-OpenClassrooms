import './ShareForm.css'

const ShareForm = () => {
    return (
        <form action="">
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
            <button>Publier</button>
        </form>
    )
}

export default ShareForm