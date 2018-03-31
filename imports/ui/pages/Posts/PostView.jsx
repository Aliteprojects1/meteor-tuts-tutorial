import React from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import {Posts} from '/db';

class PostListReactive extends React.Component {
    constructor() {
        super();
    }

    render() {
        const {post, history} = this.props;

        if (!post) {
            return <div>Loading....</div>
        }

        return (
            <div className="post">
                <p>Post id: {post._id} </p>
                <p>Post title: {post.title} </p>
                <p>Post Description: {post.description} </p>
                <button onClick={() => history.push('/posts')}>Back to posts</button>
            </div>
        )
    }
}


export default withTracker(props => {

    const handle = Meteor.subscribe('postsById', props.match.params._id);

    return {
        loading: !handle.ready(),
        post: Posts.findOne({_id: props.match.params._id}),
        ...props
    };
})(PostListReactive);