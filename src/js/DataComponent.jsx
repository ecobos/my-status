import React, { Component } from 'react';
import axios from 'axios';

class CommentBox extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [] };
        this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this);
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    }
    loadCommentsFromServer() {
        axios.get('http://localhost:3001/candidate')
            .then(res => {
                this.setState({ data: res.data });
            })
    }
    handleCommentSubmit(comment) {
        //add POST request
    }
    componentDidMount() {
        const T = this;
        setTimeout(() => {
            T.props.componentReady();
            //T.loadCommentsFromServer();
            
        }, 5000);
        //setInterval(this.loadCommentsFromServer, this.props.pollInterval);

    }
    render() {
        return (
            <div>
                <h2>Waiting to load {this.props.match.params.candidate}: </h2>
                {this.state.data.map((item) => {
                    return(
                        <div key={item['_id']}>{item.firstName} {item.lastName} {item.status} {item.phoneNumber}</div>
                    );
                })}
            </div>
        )
    }
}
export default CommentBox;