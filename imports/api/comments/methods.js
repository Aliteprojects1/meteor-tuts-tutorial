import {Meteor} from 'meteor/meteor'
import {Comments, Posts} from '/db';
import SimplSchema from "simpl-schema";

Meteor.methods({
    'comment.add'(comment) {
        const currentUser = Meteor.user();
        if (currentUser){
            const postId = comment.postId;
            if (postId) {
                const postOwner = Posts.findOne({_id: postId});
                if (postOwner) {
                    comment['ownerUserId'] = currentUser._id;
                    comment['ownerEmail'] = currentUser.emails[0].address;
                    comment['postOwnerEmail'] = postOwner.email;
                    comment['postOwnerId'] = postOwner.userId;
                    Comments.insert(comment);
                    Posts.update({_id: postId}, {
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
    },
    'comment.delete'(commentId){
        const currentUserId = Meteor.userId();
        const commentData = Comments.findOne({_id: commentId});
        if ( currentUserId && commentData && ( currentUserId == commentData.postOwnerId || currentUserId == commentData.ownerUserId)) {
            Comments.remove({_id: commentId});
            Posts.update({_id: commentData.postId}, {
                $inc: {
                    comments: -1
                }
            });
        } else {
            throw new Meteor.Error('invalid-access', "You don't have rights to delete comment");
        }
    }

});
