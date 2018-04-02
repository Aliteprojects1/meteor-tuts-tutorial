import React from 'react';
import { browserHistory } from 'react-router'

export default class PostList extends React.Component {
    constructor() {
        super();
        this.state = {posts: null};
    }

    componentDidMount() {
        Meteor.call('post.list', (err, posts) => {
            this.setState({posts});
        });
    }

    viewPost = (postId) => {
        const { history } = this.props;
        Meteor.call('post.incrementPostView', postId, (err) => {
            if (err) {
                return alert(err.reason);
            }
            history.push('/posts/view/' + postId);
        });
    };

    removePost = (postId) => {
        Meteor.call('post.remove', postId, (err) => {
            if (err) {
                return alert(err.reason);
            }
            alert('post removed');
        });
    }

    render() {
        const {posts} = this.state;
        const {history} = this.props;

        if (!posts) {
            return <div>Loading....</div>
        }

        return (
            <div className="post">
                {
                    posts.map((post) => {
                        return (
                            <div key={post._id}>
                                <p><b>Post id</b> : {post._id} </p>
                                <p><b>Post title</b>: {post.title}, <b>Post Description</b>: {post.description} </p>
                                <p><b>Number of views</b>: {post.views}, <b>Number of comment</b>: {post.comments}</p>
                                <button onClick={() => {
                                    history.push("/posts/edit/" + post._id)
                                }}> Edit post
                                </button>
                                <button onClick={() => this.viewPost(post._id)}>View post</button>
                                { Meteor.userId() === post.userId
                                    ? <button onClick={() => this.removePost(post._id)}>Delete post</button>
                                    : ""
                                }
                            </div>
                        )
                    })}
                <button onClick={() => history.push('/posts/create')}>Create a new post</button>
            </div>
        )
    }
}
