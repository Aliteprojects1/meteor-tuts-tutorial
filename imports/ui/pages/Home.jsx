import React from 'react';
import { AutoForm, AutoField } from 'uniforms-unstyled';
import SimpleSchema from 'simpl-schema';
import { Link } from 'react-router-dom'

export default class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            number: -1
        }
    }
    getRandomNumber = () =>  {
        Meteor.call('find.random_number',(err, number) => {
           this.setState({number})
        });
    };

    submit = (data) => {
        Meteor.call('method.checkString', data.myValue, (err, result) => {
            if (err) {
                return alert(err.details);
            }
            console.log(result);
        });
    };

    render() {
        const {number} = this.state;

        return (
            <div className="home">

                <nav>
                    <ul>
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/posts'>Posts</Link></li>
                        <li><Link to='/register'>Register</Link></li>
                        <li><Link to='/login'>Login</Link></li>
                    </ul>
                </nav>

                <button onClick={this.getRandomNumber}>Get Random number</button>
                <p>My random number: {number}</p>

                <AutoForm onSubmit={this.submit} schema={schema} >
                    <AutoField name="myValue" />
                    <button type='submit'> Check my string</button>
                </AutoForm>
            </div>
        )
    }
}

const schema = new SimpleSchema({
    myValue: String
});
