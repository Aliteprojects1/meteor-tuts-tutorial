import {Meteor} from 'meteor/meteor'
import {Posts, Comments} from '/db';


class PostService {
    static createPost(post) {
        const currentUser = Meteor.user();
        if (currentUser){
            post['userId'] = currentUser._id;
            post['email'] = currentUser.emails[0].address;

            Posts.insert(post);
        } else {
            throw new Meteor.Error('invalid-access', "You must be logged in to create post");
        }
    }

    static listPost() {
        return Posts.find().fetch();
    }

    static updatePost(id, data) {
        const item = this._getPost(id)

        const currentUserId = Meteor.userId()
        if (currentUserId) {
            const postData = this._getPost({_id: _id, userId: currentUserId});
            if (postData) {
                Posts.update(_id, {
                    $set: {
                        title: post.title,
                        description: post.description,
                        type: post.type
                    }
                });
            } else {
                throw new Meteor.Error('invalid-access', "Invalid Access");
            }
        } else {
            throw new Meteor.Error('invalid-access', "Invalid Access");
        }
    }

    static removePost(postId) {
        const currentUserId = Meteor.userId()
        if (currentUserId) {
            const postData = this._getPost({_id: postId, userId: currentUserId});
            if (postData) {
                Posts.remove({_id: postId});
                Comments.remove({postId: postId});
            } else {
                throw new Meteor.Error('invalid-access', "Invalid Access");
            }
        } else {
            throw new Meteor.Error('invalid-access', "Invalid Access");
        }
    }

    static _getPost(query) {
        return Posts.findOne(query);
    }

    static getPost(_id) {
        return Posts.findOne(_id);
    }

    static incrementPostView(_id) {
        return Posts.update(_id, {
            $inc: {
                views: 1
            }
        });
    }
}

export default PostService;
