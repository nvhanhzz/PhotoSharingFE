import React, { useState } from 'react';
import "./styles.css";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { postRegister } from '../../services/AuthServices';

const RegisterForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [location, setLocation] = useState('');
    const [occupation, setOccupation] = useState('');
    const [description, setDescription] = useState('');

    const handleInputBlur = (event, setStateFunction) => {
        const trimmedValue = event.target.value.trim();
        setStateFunction(trimmedValue);
    };

    const handleRegister = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        const res = await postRegister({ email, password, firstname, lastname, location, occupation, description });
        const json = await res.json();
        // console.log(json);

        if (res.status === 201) {
            alert("Register success !");
            navigate("/");
        } else if (res.status === 400 && json.message === 'Email already exists') {
            alert("Email already exists !");
            console.error(res.status);
        } else {
            console.error(res.status);
        }
    };

    return (
        <div className='register-form'>
            <form className="register-form__form" onSubmit={handleRegister}>
                <div className="register-form__form-group">
                    <label htmlFor="email" className="register-form__label">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={(event) => handleInputBlur(event, setEmail)}
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
                        onChange={(e) => setPassword(e.target.value)}
                        onBlur={(event) => handleInputBlur(event, setPassword)}
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
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onBlur={(event) => handleInputBlur(event, setConfirmPassword)}
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
                        onChange={(e) => setFirstName(e.target.value)}
                        onBlur={(event) => handleInputBlur(event, setFirstName)}
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
                        onChange={(e) => setLastName(e.target.value)}
                        onBlur={(event) => handleInputBlur(event, setLastName)}
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
                        onChange={(e) => setLocation(e.target.value)}
                        onBlur={(event) => handleInputBlur(event, setLocation)}
                        className="register-form__input-field"
                    />
                </div>
                <div className="register-form__form-group">
                    <label htmlFor="occupation" className="register-form__label">Occupation:</label>
                    <input
                        type="text"
                        id="occupation"
                        value={occupation}
                        onChange={(e) => setOccupation(e.target.value)}
                        onBlur={(event) => handleInputBlur(event, setOccupation)}
                        className="register-form__input-field"
                    />
                </div>
                <div className="register-form__form-group">
                    <label htmlFor="description" className="register-form__label">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        onBlur={(event) => handleInputBlur(event, setDescription)}
                        className="register-form__input-field"
                    />
                </div>
                <div className='outer-button'>
                    <button type="submit" className="register-form__btn register-form__btn--primary">Register</button>
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;
