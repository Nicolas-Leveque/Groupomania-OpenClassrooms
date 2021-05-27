const Comment = (props) => {
    return (  
        <div className="Comment">
            <h5>{props.name}</h5>
            <p>{props.contenu}</p>
        </div>
    );
}

export default Comment;