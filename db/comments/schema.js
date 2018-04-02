import SimplSchema from 'simpl-schema';

export default new SimplSchema({
    text: String,
    ownerUserId: {
        type: String,
        optional: true
    },
    ownerEmail: {
        type: SimplSchema.RegEx.Email,
        optional: true
    },
    postId: String,
    postOwnerEmail: {
        type: SimplSchema.RegEx.Email,
        optional: true
    },
    postOwnerId: {
        type: String,
        optional: true
    },
    createdAt:  {
        type: Date,
        defaultValue: new Date()
    }
});
