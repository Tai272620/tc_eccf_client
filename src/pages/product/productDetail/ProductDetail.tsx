import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './productDetail.scss';
import AddToCartModal from './components/AddToCartModal';
import { useDispatch } from 'react-redux';
import api from '@/services/api';
import { productAction } from '@/stores/slices/product.slice';
import { message } from 'antd';
import { cartAction } from '@/stores/slices/cart.slice';

interface Product {
    id: string,
    name: string,
    avatar: string,
    price: number,
    des: string,
    categoryId: number,
    categoryName: string,
    updateAt: Date
}

interface CartItem {
    productId: string,
    quantity: number
}

export default function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    // console.log("id", id)
    const [product, setProduct] = useState({})
    const [productVisible, setProductVisible] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();

    useEffect(() => {
        // Khi component đã được render, sau khoảng thời gian nhất định, hiển thị sản phẩm và tắt loading
        const timeout = setTimeout(() => {
            setProductVisible(true);
        }, 300); // Giả sử 1000ms là thời gian hiển thị loading

        // Clear timeout khi component bị unmount
        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        if (id) {
            api.productApi.findById(id)
                .then(res => {
                    // console.log("res", res)
                    if (res.status == 200) {
                        setProduct(res.data.data)
                    } else {
                    }
                })
                .catch(err => {

                })
        }
    }, [id])

    function handleAddToCart(productId: string, quantity: number) {
        let carts: CartItem[] = JSON.parse(localStorage.getItem("carts") ?? "[]");
        if (carts.length == 0) {
            // cart rỗng
            carts.push({
                productId,
                quantity
            });
            message.success("addToCartSuccess");
        } else {
            // cart có sản phẩm
            let flag: boolean = false;
            carts = carts.map(item => {
                if (item.productId == productId) {
                    message.success("addToCartSuccess");
                    item.quantity += quantity
                    flag = true;
                }
                return item
            })
            if (!flag) {
                carts.push({
                    productId,
                    quantity
                })
                message.success("addToCartSuccess");
            }
        }
        localStorage.setItem("carts", JSON.stringify(carts)) // save to local
    }

    return (
        <>
            <div className='productDetail-container'>
                <div className={`product-gallery${productVisible ? ' show' : ''}`}>
                    <img src={(product as Product).avatar} alt="" />
                </div>
                <div className='product-essential'>
                    <header className='product-header'>
                        <h1 className='product-title'>{(product as Product).name}</h1>
                    </header>
                    <p className='product-price'>${(product as Product).price}</p>
                    <p className='product-description'>
                        {(product as Product).des}
                    </p>
                    <p className='product-quantity-label'>QUANTITY</p>
                    <div className='product-quantity'>
                        <button>
                            <span className="material-symbols-outlined" onClick={() => {
                                if (quantity > 1) {
                                    setQuantity(quantity - 1)
                                }
                            }}>
                                remove
                            </span>
                        </button>
                        <span>{quantity}</span>
                        <button>
                            <span className="material-symbols-outlined" onClick={() => setQuantity(quantity + 1)}>
                                add
                            </span>
                        </button>
                    </div>
                    <button className='addToCart-button' onClick={() => handleAddToCart((product as Product).id, quantity)}>Add to cart</button>
                </div>
            </div>
            <div className='recommend-products-container'>
                <h2>Recommended For You</h2>
                <div className='recommend-products'>
                    <div className='recommend-product'>
                        <div className='recommend-product-image' onClick={() => navigate(`/products/64f97691b16996d6828e4984`)}>
                            <img src="https://firebasestorage.googleapis.com/v0/b/coffee-app-bbb51.appspot.com/o/images%2Fbanner%2Fproduct-01.webp?alt=media&token=965263a5-09cd-4b70-ba04-8e598fdd092c" alt="" />
                        </div>
                        <div className='recommend-product-desc'>
                            <p className='recommend-product-name'>Hair Bender</p>
                            <p>$16</p>
                        </div>
                        <AddToCartModal />
                    </div>
                    <div className='recommend-product'>
                        <div className='recommend-product-image' onClick={() => navigate(`/products/64f990873f283f37f9cfa639`)}>
                            <img src="https://firebasestorage.googleapis.com/v0/b/coffee-app-bbb51.appspot.com/o/md4%2F528638600829.74097.avif?alt=media&token=6d818010-820b-4d69-b1b1-6b3d70e43237" alt="" />
                        </div>
                        <div className='recommend-product-desc'>
                            <p className='recommend-product-name'>AeroPress Original Coffee Maker</p>
                            <p>$46</p>
                        </div>
                        <AddToCartModal />
                    </div>
                    <div className='recommend-product'>
                        <div className='recommend-product-image' onClick={() => navigate(`/products/64fe9f44e89639a29accfb99`)}>
                            <img src="https://firebasestorage.googleapis.com/v0/b/coffee-app-bbb51.appspot.com/o/md4%2F597915735750.0906.avif?alt=media&token=2dd21571-36df-4957-8e43-2531096151ca" alt="" />
                        </div>
                        <div className='recommend-product-desc'>
                            <p className='recommend-product-name'>Chemex Brewer with Wood Collar</p>
                            <p>$49</p>
                        </div>
                        <AddToCartModal />
                    </div>
                </div>
            </div>
        </>

    )
}
