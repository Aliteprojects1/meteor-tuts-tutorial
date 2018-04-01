import React from 'react';
import {AutoForm, AutoField, LongTextField, SelectField, ErrorsField} from 'uniforms-unstyled';
import PostSchema from '/db/posts/schema';
import {PostType}from '../../../../db/posts/enums'

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
                    <ErrorsField/>
                    <AutoField name="title"/>
                    <LongTextField name="description"/>
                    <SelectField
                        name= "type"
                        checkboxes={false}
                        options={PostType}
                    />
                    <button type='submit'>Add post</button>
                    <button onClick={() => history.push('/posts')}>Back to posts</button>
                </AutoForm>
            </div>
        )
    }
}
