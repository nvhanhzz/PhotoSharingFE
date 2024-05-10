import React, { useState } from 'react';
import "./styles.css";
import { postLogin } from '../../services/AuthServices';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const Login = async (un, pw) => {
        const res = await postLogin({ username: un, password: pw });

        if (res) {
            console.log(res);
        } else {
            console.log("0");
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        Login(username, password);
    };

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="form-control"
                />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
        </form>
    );
};

export default LoginForm;
