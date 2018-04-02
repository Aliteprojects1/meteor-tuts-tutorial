import {Posts, Comments} from '/db';

//Chapter 3 - A post has an user
Posts.addLinks({
    'usersData': {
        type: 'one',
        collection: Meteor.users,
        field: 'userId'
    }
});


//Chapter 3 - A post can have multiple comments
Comments.addLinks({
    'commentData': {
        type: 'one',
        collection: Posts,
        field: 'postId'
    }
});



Posts.addLinks({
    'comments': {
        collection: Comments,
        inversedBy: 'commentData'
    }
})


/*
TODO  we can use below code in meteor methods or server function to get desire result
 let post = Posts.createQuery({
            $filters: {_id: postId},
            title: 1,
            description: 1,
            createdBy: 1,
            usersData: {
                emails: 1,
                _id: 1
            },
            comments:{
                _id: 1,
                text: 1
            }
        });
        return post.fetchOne();
 */
