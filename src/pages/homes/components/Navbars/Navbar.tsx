import './navbar.scss';
import { useNavigate, Link } from 'react-router-dom';
import React, { useEffect, useRef, useState, useContext } from "react";
import { Carousel } from "antd";
import Search from '@/components/Search/Search';
import Cart from '@/components/Cart/Cart';
import DropdownLogout from '@components/Dropdowns/DropdownLogout';
import ToggleLanguage from '@/components/ToggleLanguage/ToggleLanguage';
import { useTranslation } from 'react-i18next';
import { RootContext } from '@/App';
import { useSelector } from 'react-redux';
import { StoreType } from '@/stores';

interface Category {
    title: string
}

interface CartItem {
    productId: string;
    quantity: number;
    price: number;
}

export default function Navbar() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(() => localStorage.getItem("token") || null);

    const cartStore = useSelector((store: StoreType) => store.categoryStore);

    console.log("cartStore", cartStore)

    const [banners, setBanners] = useState([
        {
            id: 1,
            title: t("freeship")
        },
        {
            id: 2,
            title: t("sale")
        },
    ]);

    return (
        <nav>
            <div className='carousel-container'>
                <Carousel
                    autoplay
                    autoplaySpeed={2000}
                    effect={"fade"}
                    dots={false}
                    dotPosition={"bottom"}
                >
                    {banners.map((banner, index) => (
                        <div className="items" key={banner.id + index}>
                            <p className='title'>{banner.title}</p>
                        </div>
                    ))}
                </Carousel>
                <div>
                    <ToggleLanguage />
                </div>
            </div>
            <div className='nav-container'>
                <div className='logo' onClick={() => navigate("/")}>
                    <img src="https://firebasestorage.googleapis.com/v0/b/coffee-app-bbb51.appspot.com/o/images%2Flogo%2FScreenshot%202023-08-28%20at%2014.14.07.png?alt=media&token=2c7faaeb-8775-4d95-9558-71bc12cc09c0" alt="" />
                </div>
                <div className='middle-nav'>
                    <span onClick={() => navigate("/collections/64f975f8b16996d6828e4982")}>{t("shop")}</span>
                    <span>{t("Subscribe")}</span>
                    <span>{t("ColdBrew")}</span>
                    <span>{t("BrewGuides")}</span>
                    <span>{t("Locations")}</span>
                    <span>{t("Wholesale")}</span>
                </div>
                <div className='right-nav'>
                    <span className='right-nav-icon'><Search /></span>
                    <span className='right-nav-icon'>
                        <DropdownLogout />
                    </span>
                    <span className='right-nav-icon cart-icon'><Cart /></span>
                </div>
            </div>
        </nav>
    )
}
