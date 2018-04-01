import {Meteor} from 'meteor/meteor'
import {Comments, Posts} from '/db';
import SimplSchema from "simpl-schema";
import CommentService from "./services";

Meteor.methods({
    'comment.add'(comment) {
        return CommentService.createComment(comment);
    },
    'comment.delete'(commentId){
        return CommentService.removeComment(commentId);
    }

});
