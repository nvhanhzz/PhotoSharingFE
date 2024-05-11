import React, { useState } from 'react';
import "./styles.css";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { postRegister } from '../../services/AuthServices';

const RegisterForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // Thêm state cho confirmPassword
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [location, setLocation] = useState('');
    const [occupation, setOccupation] = useState('');

    const handleRegister = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        const res = await postRegister({ username, password, firstname, lastname, location, occupation });
        if (res.message === 'User registered successfully') {
            alert("Register success !");
            navigate("/login");
        } else if (res.message === 'Username already exists') {
            alert("Username already exists !");
        } else {
            alert("Error !");
        }
    };

    return (
        <div className='register-form'>
            <form className="register-form__form" onSubmit={handleRegister}>
                <div className="register-form__form-group">
                    <label htmlFor="username" className="register-form__label">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        className="register-form__input-field"
                        required
                    />
                </div>
                <div className="register-form__form-group">
                    <label htmlFor="password" className="register-form__label">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className="register-form__input-field"
                        required
                    />
                </div>
                <div className="register-form__form-group">
                    <label htmlFor="confirmPassword" className="register-form__label">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                        className="register-form__input-field"
                        required
                    />
                </div>
                <div className="register-form__form-group">
                    <label htmlFor="first_name" className="register-form__label">First Name:</label>
                    <input
                        type="text"
                        id="first_name"
                        value={firstname}
                        onChange={(event) => setFirstName(event.target.value)}
                        className="register-form__input-field"
                        required
                    />
                </div>
                <div className="register-form__form-group">
                    <label htmlFor="last_name" className="register-form__label">Last Name:</label>
                    <input
                        type="text"
                        id="last_name"
                        value={lastname}
                        onChange={(event) => setLastName(event.target.value)}
                        className="register-form__input-field"
                        required
                    />
                </div>
                <div className="register-form__form-group">
                    <label htmlFor="location" className="register-form__label">Location:</label>
                    <input
                        type="text"
                        id="location"
                        value={location}
                        onChange={(event) => setLocation(event.target.value)}
                        className="register-form__input-field"
                    />
                </div>
                <div className="register-form__form-group">
                    <label htmlFor="occupation" className="register-form__label">Occupation:</label>
                    <input
                        type="text"
                        id="occupation"
                        value={occupation}
                        onChange={(event) => setOccupation(event.target.value)}
                        className="register-form__input-field"
                    />
                </div>
                <button type="submit" className="register-form__btn register-form__btn--primary">Register</button>
            </form>
        </div>
    );
};

export default RegisterForm;
