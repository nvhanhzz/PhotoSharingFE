import React, { useState } from 'react';
import "./styles.css";
import { useNavigate, Link } from 'react-router-dom'; // Thêm import Link từ 'react-router-dom'
import { useDispatch } from 'react-redux';
import { login } from '../../actions/Login';
import { postLogin } from '../../services/AuthServices';

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();
        const res = await postLogin({ username, password });
        if (res.message === 'Login success') {
            dispatch(login());
            navigate("/");
        } else {
            alert("Login fail!");
        }
    };

    return (
        <div className='custom-form'>
            <form className="custom-login-form" onSubmit={handleLogin}>
                <div className="custom-form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        className="custom-form-control"
                    />
                </div>
                <div className="custom-form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className="custom-form-control"
                    />
                </div>
                <button type="submit" className="custom-btn custom-btn-primary">Login</button>
                <Link to="/register" className="custom-link">Register</Link>
            </form>
        </div>
    );
};

export default LoginForm;
