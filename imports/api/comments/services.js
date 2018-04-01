import {Meteor} from 'meteor/meteor'
import {Posts, Comments} from '/db';


class CommentService {
    static createComment(comment) {
        const currentUser = Meteor.user();
        if (currentUser){
            const _id = comment.postId;
            if (_id) {
                console.log(1)
                const postOwner = this._getPostById(_id);
                console.log(2, postOwner)
                if (postOwner) {
                    comment['ownerUserId'] = currentUser._id;
                    comment['ownerEmail'] = currentUser.emails[0].address;
                    comment['postOwnerEmail'] = postOwner.email;
                    comment['postOwnerId'] = postOwner.userId;
                    Comments.insert(comment);
                    Posts.update(_id, {
                        $inc: {
                            comments: 1
                        }
                    });
                }else {
                    throw new Meteor.Error('invalid-access', "Invalid Access1");
                }

            }else {
                throw new Meteor.Error('invalid-access', "Invalid Access");
            }
        }else {
            throw new Meteor.Error('invalid-access', "You must be logged in to comment");
        }
    }

    static removeComment(_id) {
        const currentUserId = Meteor.userId();
        const commentData = this._getComment(_id);
        if ( currentUserId && commentData && ( currentUserId == commentData.postOwnerId || currentUserId == commentData.ownerUserId)) {
            Comments.remove(_id);
            Posts.update({_id: commentData.postId}, {
                $inc: {
                    comments: -1
                }
            });
        } else {
            throw new Meteor.Error('invalid-access', "You don't have rights to delete comment");
        }
    }

    static _getComment(_id) {
        return Comments.findOne(_id);
    }

    static _getPostById(_id) {
        return Posts.findOne(_id);
    }
}

export default CommentService;
