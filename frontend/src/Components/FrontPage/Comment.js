import './Comment.css'

const Comment = (props) => {
    return (  
        <div className="comment">
            <h5 className="comment-nom" >{props.name}</h5>
            <p className="comment-contenu">{props.contenu}</p>
        </div>
    );
}

export default Comment;