import React from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import {Posts, Comments} from '/db';
import PostSchema from "../../../../db/posts/schema";
import PostComments from "../../../../db/comments/schema";
import {AutoForm, LongTextField, HiddenField, ErrorsField} from 'uniforms-unstyled';


class PostListReactive extends React.Component {
    constructor() {
        super();
    }

    submitComment = (comment) => {
        Meteor.call('comment.add', comment, (err) => {
            if (err) {
                return alert(err.reason);
            }
            alert('Comment added!')
        });
    };

    deleteComment = (commentId) => {
        Meteor.call('comment.delete', commentId, (err) => {
            if (err) {
                return alert(err.reason);
            }
            alert('Comment deleted!')
        })
    }

    render() {
        const {post, history, comments} = this.props;

        if (!post) {
            return <div>Loading....</div>
        }

        if (!comments) {
            return <div>Loading....</div>
        }

        return (
            <div className="post">
                <p>Post id: {post._id} </p>
                <p>Post title: {post.title} </p>
                <p>Post Description: {post.description} </p>
                <button onClick={() => history.push('/posts')}>Back to posts</button>

                <p><b>Add Comments</b></p>

                <AutoForm onSubmit={this.submitComment} schema={PostComments}>
                    <ErrorsField />
                    <LongTextField name="text"/>
                    <HiddenField name="postId" value={post._id} />
                    <button type='submit'>Add comment</button>
                </AutoForm>

                <p><b>List comment</b></p>
                {
                    comments.map((comment) => {
                        return (
                            <div key={comment._id}>
                                <p><b>Comment</b>: {comment.text}, <b>Author Email</b>: {comment.ownerEmail}}</p>
                                <p>
                                    { Meteor.userId() == comment.postOwnerId
                                        ? <button onClick={() => this.deleteComment(comment._id)}>Delete comment as owner</button>
                                        : ( Meteor.userId() == comment.ownerUserId
                                        ? <button onClick={() => this.deleteComment(comment._id)}>Delete comment as post</button>
                                        :  ""
                                        )
                                    }
                                </p>
                            </div>
                        )
                    })}


            </div>
        )
    }
}


export default withTracker(props => {

    const handle = Meteor.subscribe('postsById', props.match.params._id);
    const postComments = Meteor.subscribe('commentsByPostId', props.match.params._id);

    return {
        loading: !handle.ready(),
        loading: !postComments.ready(),
        post: Posts.findOne({_id: props.match.params._id}),
        comments: Comments.find({postId: props.match.params._id}, {createdAt: -1}).fetch(),
        ...props
    };
})(PostListReactive);