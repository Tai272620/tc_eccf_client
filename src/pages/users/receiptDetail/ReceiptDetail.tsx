import { useEffect, useState } from 'react';
import './receiptDetail.scss';
import { Link, useParams } from 'react-router-dom';
import api from '@/services/api';
import dateFormat from 'dateformat';

interface Product {
    name: string,
    avatar: string,
    price: number,
    des: string,
    categoryId: number,
    categoryName: string,
    updateAt: Date
}

interface OrderItem {
    productId: string;
    quantity: number;
    price: number;
}

interface OrderItemDetail extends OrderItem {
    product: Product
}

interface GuestInformation {
    email: string
}

export default function ReceiptDetail() {
    const { orderId } = useParams();
    const [guestInformation, setGuestInformation] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState<OrderItemDetail[]>([]);
    const [isLogin, checkIsLogin] = useState(localStorage.getItem("token"));

    useEffect(() => {
        setIsLoading(true);
        if (orderId) {
            api.purchaseApi.findById(orderId)
                .then(res => {
                    if (res.status == 200) {
                        setIsLoading(false);
                        // console.log("data", res.data.data)
                        setGuestInformation(res.data.data)
                        setProducts(res.data.data.guestReceiptDetail)
                        // console.log("products", products)
                    }
                })
                .catch(err => {
                    setIsLoading(false);
                })
        }
    }, [])

    return (
        <>
            {isLogin ? <></> : <><div className='orderDetail-wrapper'>
                <p><Link to="/" className='dashboard'>Home</Link> / <Link to="/receipts" className='order'>Orders</Link> / Show</p>
                <div className='orderId'>
                    <span className='title'>ID</span><br />
                    <p>{(guestInformation as any)?.id}</p>
                </div>
                <div className='orderCustomer'>
                    <span className='title'>Customer</span><br />
                    <p>{(guestInformation as any)?.email}</p>
                </div>
                <div className='orderDelivery'>
                    <span className='title'>Delivery Address</span><br />
                    <p>Address</p>
                </div>
                <div className='orderCreated'>
                    <span className='title'>Created</span><br />
                    <p>{dateFormat((guestInformation as any)?.createAt, "dddd, mmmm dS, yyyy, h:MM:ss TT")}</p>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Product</th>
                            <th scope="col">Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Price (per item)</th>
                            <th scope="col">Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? <div className="d-flex justify-content-center loading-wrapper-receipt">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div> : products?.map((product, index) => (
                            <tr key={index} className='orderProductDetail'>
                                <td>{index + 1}</td>
                                <td><img src={product.product.avatar} alt="noImage" /></td>
                                <td className='orderProductDetail-name'>{product.product.name}</td>
                                <td className='orderProductDetail-name'>{product.quantity}</td>
                                <td>${product.product.price}</td>
                                <td>${product.quantity * product.product.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div></>}
        </>


    )
}
