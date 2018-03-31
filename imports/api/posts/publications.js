import {Posts} from '/db';
import {Meteor} from "meteor/meteor";

Meteor.publish('posts', function() {
    return Posts.find();
});


Meteor.publish('postsById', function(postsById) {
    return Posts.find({_id: postsById});
});