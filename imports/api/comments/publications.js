import {Comments} from '/db/index';
import {Meteor} from "meteor/meteor";

Meteor.publish('commentsByPostId', function(postsById) {
    return Comments.find({postId: postsById}, {createdAt: -1});
});
