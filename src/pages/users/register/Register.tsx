import React, { useState, memo } from 'react';
import api from '@/services/api';
import './register.scss';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';

export default function Register() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [registrationMessage, setRegistrationMessage] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [userNameError, setUserNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');

    const validatePassword = (password: any) => {
        if (password.length < 6) {
            setPasswordError(t("validatePassword"));
            return false;
        } else {
            setPasswordError('');
            return true;
        }
    };

    const validateUserName = (userName: any) => {
        if (userName.length < 3) {
            setUserNameError(t("validateUserName"));
            return false;
        } else {
            setUserNameError('');
            return true;
        }
    };

    const validateEmail = (email: any) => {
        if (email.length === 0) {
            setEmailError("Please Input Email");
            return true;
        }
        if (!isValidEmail(email)) {
            setEmailError(t("validateEmail"));
            return false;
        } else {
            setEmailError('');
            return true;
        }
    };

    const validateFirstName = (firstName: any) => {
        if (firstName.length === 0) {
            setFirstNameError(t("validateFirstName"));
            return false;
        } else {
            setFirstNameError('');
            return true;
        }
    };

    const validateLastName = (lastName: any) => {
        if (lastName.length === 0) {
            setLastNameError(t("validateLastName"));
            return false;
        } else {
            setLastNameError('');
            return true;
        }
    };

    const handleFormSubmit = async (e: any) => {
        e.preventDefault();

        setLoading(true);

        const password = e.target.password.value;

        // if (!validatePassword(password) || !validateUserName(e.target.userName.value) || !validateEmail(e.target.email.value) || !validateFirstName(e.target.firstName.value) || !validateLastName(e.target.lastName.value)) {
        //     setLoading(false);
        //     return;
        // }

        const newUser = {
            userName: e.target.userName.value,
            email: e.target.email.value,
            firstName: e.target.firstName.value,
            lastName: e.target.lastName.value,
            password: password,
        };

        await api.userApi.register(newUser)
            .then(res => {
                setLoading(false);
                if (res.status != 200) {
                    message.warning(res.data.message);
                } else {
                    message.success(res.data !== undefined ? res.data.message : res.message);
                    setTimeout(() => {
                        window.location.href = "/login"
                    }, 2000)
                }
            })
            .catch(err => {
                message.error('An error occurred during registration. Please try again.');
                setLoading(false);
            })
    };

    return (
        <div className='register_container'>
            <div className='register-left'>
                <h1><strong>First things first...</strong> <br /> Let’s get you set up!</h1>
            </div>
            <div className='register-right'>
                <p>{t("createAccount")} <br />
                    {t("alreadyHaveAccount")}? <a href="/login">{t("loginHere")}</a></p>
                <form onSubmit={handleFormSubmit}>
                    <div className="form_control">
                        <input
                            type="text"
                            name='userName'
                            id='userName'
                            placeholder={t("userName")}
                            // required
                            onChange={(e) => validateUserName(e.target.value)}
                        />
                        {userNameError && <p className="error-message">{userNameError}</p>}
                    </div>
                    <div className="form_control">
                        <input
                            type="text"
                            name='email'
                            id='email'
                            placeholder={t("email")}
                            // required
                            onChange={(e) => validateEmail(e.target.value)}
                        />
                        {emailError && <p className="error-message">{emailError}</p>}
                    </div>
                    <div className="form_control">
                        <input
                            type="text"
                            name='firstName'
                            id='firstName'
                            placeholder={t("firstName")}
                            // required
                            onChange={(e) => validateFirstName(e.target.value)}
                        />
                        {firstNameError && <p className="error-message">{firstNameError}</p>}
                    </div>
                    <div className="form_control">
                        <input
                            type="text"
                            name='lastName'
                            id='lastName'
                            placeholder={t("lastName")}
                            // required
                            onChange={(e) => validateLastName(e.target.value)}
                        />
                        {lastNameError && <p className="error-message">{lastNameError}</p>}
                    </div>
                    <div className="form_control">
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder={t("password")}
                            // required
                            onChange={(e) => validatePassword(e.target.value)}
                        />
                        {passwordError && <p className="error-message">{passwordError}</p>}
                    </div>
                    <button type='submit' className='register_btn' disabled={loading}>
                        {loading ? <span className='loading-spinner'></span> : t("createButtonText")}
                    </button>
                </form>
            </div>
        </div>
    );
}

function isValidEmail(email: any) {
    // You can implement your email validation logic here
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
