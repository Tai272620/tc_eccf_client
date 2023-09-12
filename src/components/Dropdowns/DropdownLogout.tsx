import { useEffect, useState } from 'react';
import './dropdown.scss';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { StoreType } from '@/stores';
import { useTranslation } from 'react-i18next';
import { Modal, message } from "antd";

export default function DropdownLogout() {
    const { t } = useTranslation();
    const [isLogin, setIsLogin] = useState(() => localStorage.getItem("token") || null);
    const [isAdmin, setIsAdmin] = useState(false);
    const store = useSelector(store => store) as StoreType;


    const checkAdmin = () => {
        if (store.userStore.data?.isAdmin) {
            setIsAdmin(!isAdmin)
        }
    }

    useEffect(() => {
        checkAdmin()
    }, [store])

    const navigate = useNavigate();
    const handleLogout = () => {
        Modal.confirm({
            content: t("confirmLogout"),
            onOk: () => {
                localStorage.removeItem("token");
                window.location.href = "/login";
            },
        });
    };
    return (
        <div className="dropdown">
            <button
                className="btn dropdown-toggle account-btn"
                type="button"
                id="dropdownMenuButton"
                data-mdb-toggle="dropdown"
                aria-expanded="false"
            >
                <i className="fa-regular fa-user"></i>
                {isLogin ? <span className='icon_title'>{t("hello")}&ensp;<span className='userName'>{store.userStore.data?.firstName}</span></span> : <></>}
            </button>
            {/* {isLogin ? (<ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li>
                    <a className="dropdown-item" href="/profile">
                        {t("profile")}
                    </a>
                </li>
                <li>
                    <a className="dropdown-item" href='/receipts'>
                        {t("purchaseHistory")}
                    </a>
                </li>
                <li>
                    <a className="dropdown-item" onClick={() => {
                        handleLogout()
                    }}>
                        {t("logout")}
                    </a>
                </li>
            </ul>) : (<ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li>
                    <Link className="dropdown-item" to="register">
                        {t("register")}
                    </Link>
                </li>
                <li>
                    <Link className="dropdown-item" to="login">
                        {t("login")}
                    </Link>
                </li>
            </ul>)} */}
            {isLogin ? (
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <li>
                        <a className="dropdown-item" href="/profile">
                            {t("profile")}
                        </a>
                    </li>
                    <li>
                        <a className="dropdown-item" href='/receipts'>
                            {t("purchaseHistory")}
                        </a>
                    </li>
                    {isAdmin && ( // Kiểm tra nếu người dùng là admin
                        <li>
                            <a className="dropdown-item" href='/admin'>
                                {t("adminPage")}
                            </a>
                        </li>
                    )}
                    <li>
                        <a className="dropdown-item" onClick={() => {
                            handleLogout()
                        }}>
                            {t("logout")}
                        </a>
                    </li>
                </ul>
            ) : (
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <li>
                        <Link className="dropdown-item" to="register">
                            {t("register")}
                        </Link>
                    </li>
                    <li>
                        <Link className="dropdown-item" to="login">
                            {t("login")}
                        </Link>
                    </li>
                    <li>
                        <a className="dropdown-item" href='/receipts'>
                            {t("purchaseHistory")}
                        </a>
                    </li>
                </ul>
            )}

        </div>
    )
}
