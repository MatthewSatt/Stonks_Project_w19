import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom';
import { signUp } from '../../../store/session';
import './SignUpForm.css'

const SignUpForm = () => {
    const [errors, setErrors] = useState([]);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();

    const onSignUp = async (e) => {
        e.preventDefault();
        if (password === repeatPassword) {
            const data = await dispatch(signUp(username, email, password));
            if (data) {
                setErrors(data)
            }
            else {
                history.push('/home')
            }
        }
    };

    const updateUsername = (e) => {
        setUsername(e.target.value);
    };

    const updateEmail = (e) => {
        setEmail(e.target.value);
    };

    const updatePassword = (e) => {
        setPassword(e.target.value);
    };

    const updateRepeatPassword = (e) => {
        setRepeatPassword(e.target.value);
    };

    if (user) {
        return <Redirect to='/' />;
    }

    return (
        <form className='signupformmodel' onSubmit={onSignUp}>
            <h2>Sign Up</h2>
            <div>
                {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                ))}
            </div>
            <div>
                <input className='form-inpuut'
                    type='text'
                    name='username'
                    placeholder='User Name'
                    onChange={updateUsername}
                    value={username}
                ></input>
            </div>
            <div>
                <input className='form-inpuut'
                    type='text'
                    name='email'
                    placeholder='Email'
                    onChange={updateEmail}
                    value={email}
                ></input>
            </div>
            <div>
                <input className='form-inpuut'
                    type='password'
                    name='password'
                    placeholder='Password'
                    onChange={updatePassword}
                    value={password}
                ></input>
            </div>
            <div>
                <input className='form-inpuut'
                    type='password'
                    name='repeat_password'
                    placeholder='Confirm Password'
                    onChange={updateRepeatPassword}
                    value={repeatPassword}
                    required={true}
                ></input>
            </div>
            <button className='form-button' type='submit'>Sign Up</button>
        </form>
    );
};

export default SignUpForm;
