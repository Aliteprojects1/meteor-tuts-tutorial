import {Meteor} from 'meteor/meteor'
import {Posts, Comments} from '/db';

Meteor.methods({
    'post.create'(post) {
        const currentUser = Meteor.user();
        if (currentUser){
            post['userId'] = currentUser._id;
            post['email'] = currentUser.emails[0].address;

            Posts.insert(post);
        }else {
            throw new Meteor.Error('invalid-access', "You must be logged in to create post");
        }
    },

    'post.list' () {
        return Posts.find().fetch();
    },

    'post.edit' (_id, post) {
        const currentUserId = Meteor.userId()
        if (currentUserId) {
            const postData = Posts.findOne({_id: _id, userId: currentUserId});
            if (postData) {
                Posts.update(_id, {
                    $set: {
                        title: post.title,
                        description: post.description,
                        type: post.type
                    }
                });
            }else{
                throw new Meteor.Error('invalid-access', "Invalid Access");
            }
        }else{
            throw new Meteor.Error('invalid-access', "Invalid Access");
        }
    },

    'post.remove' (postId){
        const currentUserId = Meteor.userId()
        if (currentUserId) {
            const postData = Posts.findOne({_id: postId, userId: currentUserId});
            if (postData) {
                Posts.remove({_id: postId});
                Comments.remove({postId: postId});
            }else {
                throw new Meteor.Error('invalid-access', "Invalid Access");
            }
        }else {
            throw new Meteor.Error('invalid-access', "Invalid Access");
        }
    },

    'post.get' (_id) {
        return Posts.findOne(_id);
    },
    'post.incrementView' (_id) {
        return Posts.update(_id, {
            $inc: {
                views: 1
            }
        });
    }
});