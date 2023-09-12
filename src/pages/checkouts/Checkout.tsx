import { useEffect, useState } from 'react';
import './checkout.scss';
import api from '@/services/api';
import { message } from 'antd';
import { StoreType } from '@/stores';
import { useSelector } from 'react-redux';

interface Product {
    id: string;
    name: string;
    avatar: string;
    price: number;
    des: string;
    categoryId: string;
    productPictures: {
        id: string;
        path: string;
    }[]
}

interface CartItem {
    productId: string;
    quantity: number;
    price: number;
}

interface CartItemDetail extends CartItem {
    productDetail: Product
}

interface newGuestReceipt {
    email: string;
    phoneNumber: string;
    total: number;
    payMode: string;
}

interface newUserReceipt {
    total: number;
    payMode: string;
}

export default function Checkout() {
    const [cart, setCart] = useState<CartItemDetail[]>([]);
    const [loading, setLoading] = useState(false);
    const [isLogin, checkIsLogin] = useState(localStorage.getItem("token"));
    const userStore = useSelector((store: StoreType) => store.userStore);
    // console.log("userStore", userStore.data.id)

    async function formatCart() {
        let cartTemp: CartItemDetail[] = [];
        let carts: CartItem[] = JSON.parse(localStorage.getItem("carts") ?? "[]");
        for (let i in carts) {
            let productDetail = await api.productApi.findById(carts[i].productId).then(res => res.data.data)
            cartTemp.push({
                ...carts[i],
                productDetail
            })
        }
        setCart(cartTemp);
    }

    useEffect(() => {
        formatCart();
    }, [localStorage.getItem("carts")]);

    function handleOrder(e: any) {
        setLoading(true);
        e.preventDefault();
        let newGuestReceipt: newGuestReceipt = {
            email: e.target.email.value,
            phoneNumber: e.target.phone.value,
            total: cart.reduce((value, cur) => {
                return value + cur.quantity * cur.productDetail.price
            }, 0),
            payMode: e.target.payMode.value
        }

        let newUserReceipt: newUserReceipt = {
            total: cart.reduce((value, cur) => {
                return value + cur.quantity * cur.productDetail.price
            }, 0),
            payMode: e.target.payMode.value
        }

        if (isLogin) {
            let userReceiptDetailList = JSON.parse(localStorage.getItem("carts") ?? "[]")

            api.purchaseApi.createUserReceipt(newUserReceipt, userReceiptDetailList, userStore.data.id)
                .then(res => {
                    console.log("res", res)
                    if (res.status == 200) {
                        setLoading(false);
                        localStorage.removeItem("carts");
                        message.success(res.data.message);
                        window.location.href = "/thanks"
                    } else {
                        message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log("err", err)
                    setLoading(false);
                })
        } else {
            let guestReceiptDetailList = JSON.parse(localStorage.getItem("carts") ?? "[]")

            api.purchaseApi.createGuestReceipt(newGuestReceipt, guestReceiptDetailList)
                .then(res => {
                    console.log("res", res)
                    if (res.status == 200) {
                        setLoading(false);
                        localStorage.removeItem("carts");
                        message.success(res.data.message);
                        window.location.href = "/thanks"
                    } else {
                        message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log("err", err)
                    setLoading(false);
                })
        }
    }

    return (
        <div className='checkout-container'>
            <div className='main'>
                <header className='checkout-header'>
                    <a href="/">
                        <img className="logo-image" src="https://firebasestorage.googleapis.com/v0/b/coffee-app-bbb51.appspot.com/o/images%2Flogo%2FStumptown-logo-light_4x_f778dc10-f45e-4d8c-ace3-ee394a6cc89e.avif?alt=media&token=befb19ab-3ac4-45bb-a216-02ea79bfcd52" alt="" />
                    </a>
                </header>
                <nav className='checkout-nav'>
                    <ol>
                        <li>
                            Cart
                            <span className="material-symbols-outlined">
                                chevron_right
                            </span>
                        </li>
                        <li>
                            Information
                            <span className="material-symbols-outlined">
                                chevron_right
                            </span>
                        </li>
                        <li>
                            Shipping
                            <span className="material-symbols-outlined">
                                chevron_right
                            </span>
                        </li>
                        <li>Payment</li>
                    </ol>
                </nav>
                <form action="" onSubmit={(e) => handleOrder(e)}>
                    <div className="form-group">
                        <input type="text" placeholder='First name' required className='firstName' />
                        <input type="text" placeholder='Last name' required className='lastName' />
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder='Email' required className='email' name='email' />
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder='Address' required className='address' />
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder='Apartment, suite, etc. (optional)' required className='apartment' />
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder='city' required className='city' />
                        <select placeholder='Province' required>
                            <option disabled selected hidden>Province</option>
                            <option value="">A</option>
                            <option value="">B</option>
                        </select>
                        <input type="text" placeholder='Postal code' required className='postalCode' />
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder='Phone (optional)' required className='phone' name='phone' />
                    </div>
                    <div className='payMode'>
                        <div className='cash'>
                            <input type="radio" name='payMode' value="CASH" /> <span>CASH</span> <img src="https://firebasestorage.googleapis.com/v0/b/coffee-app-bbb51.appspot.com/o/images%2Flogo%2Fdollar.png?alt=media&token=1c7122a8-d844-4a4a-bf3b-10da944e1f71" alt="" />
                        </div>
                        {/* <div className='zalo'>
                            <input type="radio" name='payMode' value="ZALO" /> <span>ZALO</span> <img src="https://firebasestorage.googleapis.com/v0/b/coffee-app-bbb51.appspot.com/o/images%2Flogo%2Fzalo.webp?alt=media&token=a125c1dc-0788-48da-a0ea-24ba4b45d406" alt="" />
                        </div> */}
                    </div>
                    {/* <div className="form-group checkbox-container">
                        <input type="checkbox" id='checkbox' />
                        <label htmlFor="checkbox">Save this information for next time</label>
                    </div> */}
                    <button className='continue-button' type='submit'>
                        {loading ? <span className='loading-spinner'></span> : "Continue to shipping"}
                    </button>
                </form>
                <div className='checkout-content'></div>
            </div>
            <aside className='sidebar'>
                <div className="sidebar-content">
                    <div className="order-products">
                        {cart.length > 0 ?
                            cart?.map((product, index) => (
                                <div className="order-product" key={product.productId}>
                                    <div className='order-product-left'>
                                        <img src={product.productDetail.avatar} alt="" />
                                        <h5>{product.productDetail.name}</h5>
                                        <p className='order-product-quantity'>{product.quantity}</p>
                                    </div>
                                    <div className='order-product-infor'>
                                        <p>${product.productDetail.price}</p>
                                    </div>
                                </div>
                            ))
                            : <div>Your Order is empty</div>}
                    </div>
                    <div className="order-total">
                        <div className='subtotal'>
                            <p className='subtotal-name'>Subtotal</p>
                            <p className='subtotal-price'>100$</p>
                        </div>
                        <div className='shipping'>
                            <p className='shipping-name'>Shipping</p>
                            <p className='shipping-price'>100$</p>
                        </div>
                    </div>
                    <div className='total'>
                        <p className='total-name'>Total</p>
                        <p className='total-price'>100$</p>
                    </div>
                </div>
            </aside>
        </div>
    )
}
