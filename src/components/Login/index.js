import React, { useState } from 'react';
import "./styles.css";
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../actions/Login';
import { postLogin } from '../../services/AuthServices';

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleInputBlur = (event, setStateFunction) => {
        const trimmedValue = event.target.value.trim();
        setStateFunction(trimmedValue);
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        const res = await postLogin({ email, password });
        const json = await res.json();
        // console.log(res, json);
        if (res.status === 200) {
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
                    <label htmlFor="email">Email:</label> {/* Thay đổi label của username thành Email */}
                    <input
                        type="email" // Thay đổi type của input thành text để hiển thị email
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={(event) => handleInputBlur(event, setEmail)}
                        className="custom-form-control"
                        required
                    />
                </div>
                <div className="custom-form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onBlur={(event) => handleInputBlur(event, setPassword)}
                        className="custom-form-control"
                        required
                    />
                </div>
                <button type="submit" className="custom-btn custom-btn-primary">Login</button>
                <Link to="/register" className="custom-link">Register</Link>
            </form>
        </div>
    );
};

export default LoginForm;
