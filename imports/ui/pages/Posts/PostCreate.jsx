import React from 'react';
import {AutoForm, AutoField, LongTextField, SelectField} from 'uniforms-unstyled';
import PostSchema from '/db/posts/schema';

export default class PostCreate extends React.Component {
    constructor() {
        super();
    }

    submit = (post) => {
        Meteor.call('post.create', post, (err) => {
            if (err) {
                return alert(err.reason);
            }
            alert('Post added!')
        });
    };

    render() {
        const {history} = this.props;

        return (
            <div className="post">
                <AutoForm onSubmit={this.submit} schema={PostSchema}>
                    <AutoField name="title"/>
                    <LongTextField name="description"/>
                    <SelectField
                        name= "type"
                        checkboxes={false}
                        options={[
                            {label: 'Nature', value: "Nature"},
                            {label: 'Psychology', value: "Psychology"},
                            {label: 'Music', value: "Music"},
                            {label: 'Programming', value: "Programming"},
                            {label: 'Project Management', value: "Project Management"},
                            {label: 'Other', value: "Other"},
                        ]}
                    />

                    <button type='submit'>Add post</button>
                    <button onClick={() => history.push('/posts')}>Back to posts</button>
                </AutoForm>
            </div>
        )
    }
}
