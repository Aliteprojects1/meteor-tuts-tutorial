import {Meteor} from 'meteor/meteor'
import CommentService from "./services";

Meteor.methods({
    'comment.add'(comment) {
        return CommentService.createComment(comment);
    },
    'comment.delete'(commentId){
        return CommentService.removeComment(commentId);
    }
});
