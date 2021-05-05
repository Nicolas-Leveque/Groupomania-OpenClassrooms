import './Content.css';

const Content = (props) => {
    return (
        <div className="corps">
            <div className="content">{props.children}</div>
        </div>
    )
}

export default Content;