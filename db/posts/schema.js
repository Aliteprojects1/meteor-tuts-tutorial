import SimplSchema from 'simpl-schema';

export default new SimplSchema({
    title: String,
    description: String,
    userId: {
        type: String,
        optional: true
    },
    email: {
        type: SimplSchema.RegEx.Email,
        optional: true
    },
    views:  {
        type: Number,
        defaultValue: 0
    },
    createdAt:  {
        type: Date,
        defaultValue: new Date()
    },
    type: String,
    comments:  {
        type: Number,
        defaultValue: 0
    },
});