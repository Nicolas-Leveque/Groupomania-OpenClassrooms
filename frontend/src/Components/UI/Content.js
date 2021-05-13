import React from 'react'

import './Content.css';

class Content extends React.Component {
    constructor(props) {
        super(props);
        this.rerenderParentCallback = this.rerenderParentCallback.bind(this)
    }
    rerenderParentCallback() {
        this.forceUpdate()
    }

    render() {
        return (
            <div className="content" >
                {this.props.children}
            </div>
        )
    }
}
export default Content;