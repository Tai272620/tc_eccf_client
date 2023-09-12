import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import "./cart.scss"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import api from '@/services/api';
import { useDispatch } from 'react-redux';
import { Modal } from 'antd';
import { message, Popconfirm } from 'antd';
const text = 'Are you sure to delete this task?';
const description = 'Delete product';

// Define a union type for the allowed placement values
type OffcanvasPlacement = 'top' | 'bottom' | 'start' | 'end';

interface OffCanvasExampleProps {
    name: string;
    placement: OffcanvasPlacement | undefined; // Use the defined union type
}

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

function OffCanvasExample({ name, placement }: OffCanvasExampleProps) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [cart, setCart] = useState<CartItemDetail[]>([]);

    async function formatCart() {
        setIsLoading(true);
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
        setIsLoading(false);
    }

    useEffect(() => {
        formatCart();
    }, [localStorage.getItem("carts")])

    const handleIncreaseQuantity = (index: number) => {
        const updatedCart = [...cart];
        updatedCart[index].quantity += 1;
        localStorage.setItem("carts", JSON.stringify(updatedCart));
        setCart(updatedCart);
    };

    const handleDecreaseQuantity = (index: number) => {
        const updatedCart = [...cart];
        if (updatedCart[index].quantity > 1) {
            updatedCart[index].quantity -= 1;
            localStorage.setItem("carts", JSON.stringify(updatedCart));
            setCart(updatedCart);
        }
    };

    const handleDeleteProduct = (productId: string) => {
        let updatedCart = cart.filter((item) => item.productId != productId);
        localStorage.setItem("carts", JSON.stringify(updatedCart));
        setCart(updatedCart);
        // console.log("productId", productId)
    }

    const subTotal = cart.reduce((total, item) => {
        return total + item.quantity * item.productDetail.price
    }, 0)

    const cartQuantity = cart.reduce((total, item) => {
        return total + item.quantity
    }, 0)

    return (
        <>
            <button onClick={handleShow}>
                <i className="fa-solid fa-cart-shopping"></i> {cartQuantity}
            </button>
            <Offcanvas show={show} onHide={handleClose} placement={placement}>
                <Offcanvas.Header className='cart-header'>
                    <Offcanvas.Title>{t("yourCart")} [{cart.length}]</Offcanvas.Title>
                    {/* Close button */}
                    <Button variant="outline-secondary" onClick={handleClose} className='close-button'>
                        <i className="fa-solid fa-xmark"></i>
                    </Button>
                </Offcanvas.Header>
                <Offcanvas.Body className='cart-body'>
                    <p>
                        <img src="https://firebasestorage.googleapis.com/v0/b/coffee-app-bbb51.appspot.com/o/images%2Flogo%2FScreenshot%202023-08-26%20at%2015.40.05.png?alt=media&token=ddfba398-af7f-4f4e-993b-c596d49cd631" alt="" />
                        Congrats! You get free shipping!
                    </p>
                    <div className='cart-products'>
                        {isLoading ? <div className="d-flex justify-content-center loading-wrapper">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div> :
                            cart.length > 0 ?
                                cart?.map((product: any, index: number) => <div className='cart-product' key={product.productId}>
                                    <div className='cart-product-img'>
                                        <img src={product.productDetail.avatar} alt="" />
                                    </div>
                                    <div className='cart-product-infor'>
                                        <h5 className='cart-product-name'>{product.productDetail.name}</h5>
                                        <p className='cart-product-price'>${product.productDetail.price}</p>
                                        <p className='cart-product-quantity-title'>QUANTITY</p>
                                        <div className='cart-product-quantity'>
                                            <button>
                                                <span className="material-symbols-outlined" onClick={() => handleDecreaseQuantity(index)}>
                                                    remove
                                                </span>
                                            </button>
                                            <span className='quantity-number'>{product.quantity}</span>
                                            <button>
                                                <span className="material-symbols-outlined" onClick={() => handleIncreaseQuantity(index)}>
                                                    add
                                                </span>
                                            </button>
                                        </div>
                                        <div className=''>
                                            <p>Frequency</p>
                                            <select name="" id="">
                                                <option value="">1 week ship every</option>
                                                <option value="">2 weeks</option>
                                                <option value="">3 weeks</option>
                                                <option value="">4 weeks</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className='delete-button'>
                                        <Popconfirm
                                            placement="bottomRight"
                                            title={text}
                                            description={description}
                                            onConfirm={() => {
                                                handleDeleteProduct(product.productId)
                                            }}
                                            okText="Yes"
                                            cancelText="No"
                                        >
                                            <button><span className="material-symbols-outlined">
                                                close
                                            </span></button>
                                        </Popconfirm>
                                    </div>
                                </div>)
                                : <div className='cart-empty-text'>Your Shopping cart is empty</div>
                        }
                        {/* {cart.length > 0 ?
                            cart?.map((product: any, index: number) => <div className='cart-product' key={product.productId}>
                                <div className='cart-product-img'>
                                    <img src={product.productDetail.avatar} alt="" />
                                </div>
                                <div className='cart-product-infor'>
                                    <h5 className='cart-product-name'>{product.productDetail.name}</h5>
                                    <p className='cart-product-price'>${product.productDetail.price}</p>
                                    <p className='cart-product-quantity-title'>QUANTITY</p>
                                    <div className='cart-product-quantity'>
                                        <button>
                                            <span className="material-symbols-outlined" onClick={() => handleDecreaseQuantity(index)}>
                                                remove
                                            </span>
                                        </button>
                                        <span className='quantity-number'>{product.quantity}</span>
                                        <button>
                                            <span className="material-symbols-outlined" onClick={() => handleIncreaseQuantity(index)}>
                                                add
                                            </span>
                                        </button>
                                    </div>
                                    <div className=''>
                                        <p>Frequency</p>
                                        <select name="" id="">
                                            <option value="">1 week ship every</option>
                                            <option value="">2 weeks</option>
                                            <option value="">3 weeks</option>
                                            <option value="">4 weeks</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='delete-button'>
                                    <Popconfirm
                                        placement="bottomRight"
                                        title={text}
                                        description={description}
                                        onConfirm={() => {
                                            handleDeleteProduct(product.productId)
                                        }}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <button><span className="material-symbols-outlined">
                                            close
                                        </span></button>
                                    </Popconfirm>
                                </div>
                            </div>)
                            : <div className='cart-empty-text'>Your Shopping cart is empty</div>} */}
                    </div>
                    <div className='cart-footer'>
                        <p className='cart-total'>
                            <span className='cart-total-lable'>Subtotal</span>
                            <span className='cart-total-value'>${subTotal}</span>
                        </p>
                        <button className='checkoutButton' onClick={() => navigate("/checkout")}>Checkout</button>
                        {/* <button className='checkoutButton' onClick={() => handleOrder()}>Checkout</button> */}
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

function Cart() {
    return (
        <>
            <OffCanvasExample placement="end" name="end" />
        </>
    );
}

export default Cart;