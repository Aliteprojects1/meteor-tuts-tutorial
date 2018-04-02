import {Meteor} from 'meteor/meteor'
import PostService from "./services";

Meteor.methods({
    'post.create'(post) {
        return PostService.createPost(post);
    },

    'post.list'() {
        return PostService.listPost();
    },

    'post.edit'(_id, post) {
        return PostService.updatePost(_id, post);
    },

    'post.remove'(postId){
        return PostService.removePost(postId);
    },

    'post.get'(_id) {
        return PostService.getPost(_id);
    },
    'post.incrementPostView'(_id) {
        return PostService.incrementPostView(_id);
    }
});
