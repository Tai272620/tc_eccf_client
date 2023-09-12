import { useState } from 'react';
import './login.scss';
// import validate from '@utils/validate';
import api from '@services/api';
import { useNavigate } from 'react-router-dom';
import { message, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { googleLogin } from '@/firebase';

export default function Login() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [userNameError, setUserNameError] = useState('');

    const validateUserName = (userName: any) => {
        if (userName.length < 3) {
            setUserNameError(t("validateUserName"));
            return false;
        } else {
            setUserNameError('');
            return true;
        }
    };

    const validatePassword = (password: any) => {
        if (password.length < 6) {
            setPasswordError(t("validatePassword"));
            return false;
        } else {
            setPasswordError('');
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

        const data = {
            userName: e.target.userName.value,
            password: password,
        };

        await api.userApi.login(data)
            .then(res => {
                setLoading(false);
                if (res.status != 200) {
                    message.warning(res.data.message);
                } else {
                    message.success(res.data !== undefined ? res.data.message : res.data.message);
                    localStorage.setItem("token", res.data.token);
                    setTimeout(() => {
                        window.location.href = "/"
                    }, 2000)
                }
            })
            .catch(err => {
                message.error('An error occurred during registration. Please try again.');
                setLoading(false);
            })
    };


    return (
        <div className="login_container">
            <div className="login-left">
                <h1>Hello, there.</h1>
            </div>
            <div className="login-right">
                <p>{t("notHaveAccount")} <a href="/register">{t("register")}</a></p>
                <form onSubmit={handleFormSubmit}>
                    <div className="form-control-login">
                        <input type="text" name="userName" id="userName" placeholder="User name" onChange={(e) => validateUserName(e.target.value)} />
                        {userNameError && <p className="error-message">{userNameError}</p>}
                    </div>
                    <div className="form-control-login">
                        <input type="password" name="password" id="password" placeholder="Password" onChange={(e) => validatePassword(e.target.value)} />
                        {passwordError && <p className="error-message">{passwordError}</p>}
                    </div>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <button type="submit" className="login_btn">
                        {loading ? <span className='loading-spinner'></span> : t("login")}
                    </button>
                    <button className='login-google' onClick={() => googleLogin()}>
                        <img src="https://firebasestorage.googleapis.com/v0/b/coffee-app-bbb51.appspot.com/o/images%2Flogo%2Ficons8-google-48.png?alt=media&token=6e6b39dc-afb3-46cf-b7be-288244343803" alt="" />
                        Google
                    </button>
                </form>
            </div>

        </div>
    );
}

