import { CSSProperties, useEffect, useState } from 'react';
import './products.scss'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import api from '@/services/api';
import { useDispatch } from 'react-redux';
import UpdateProduct from '../UpdateProduct/UpdateProduct';
import PulseLoader from 'react-spinners/PulseLoader';
import dateFormat from "dateformat";

interface Product {
    name: string,
    avatar: string,
    price: number,
    des: string,
    categoryId: number,
    categoryName: string,
    updateAt: Date
}

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

export default function Products() {
    let [color, setColor] = useState("grey");
    const [maxItemPage, setMaxItemPage] = useState(7);
    const [skipItem, setSkipItem] = useState(0);
    const [maxPage, setMaxPage] = useState<any[]>([]);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let [loading, setLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [productData, setProductData] = useState(null);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [productVisible, setProductVisible] = useState(false);

    useEffect(() => {
        // Khi component đã được render, sau khoảng thời gian nhất định, hiển thị sản phẩm và tắt loading
        const timeout = setTimeout(() => {
            setProductVisible(true);
        }, 1000); // Giả sử 1000ms là thời gian hiển thị loading

        // Clear timeout khi component bị unmount
        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        setIsLoading(true);
        api.productApi.findAll(maxItemPage, skipItem)
            .then(res => {
                if (res.status == 200) {
                    // console.log("res.data", res.data);
                    let maxPageArr: any[] = [];
                    for (let i = 0; i < res.data.maxPage; i++) {
                        maxPageArr.push({
                            number: Number(i) + 1,
                            skip: res.data.data.length * Number(i)
                        })
                    }
                    setMaxPage(maxPageArr);
                    setSkipItem(res.data.data.length)
                    setProducts(res.data.data)
                }
            })
            .catch(err => {

            })
            .finally(() => {
                setIsLoading(false); // Kết thúc loading
                // setProductVisible(false);
            });
    }, [])

    function changePage(pageItemObj: any) {
        api.productApi.findAll(maxItemPage, pageItemObj.skip)
            .then(res => {
                if (res.status == 200) {
                    console.log("res.data", res.data)
                    let maxPageArr: any[] = [];
                    for (let i = 0; i < res.data.maxPage; i++) {
                        maxPageArr.push({
                            number: Number(i) + 1,
                            skip: res.data.data.length * Number(i)
                        })
                    }
                    setMaxPage(maxPageArr);
                    setSkipItem(res.data.data.length)
                    setProducts(res.data.data)
                }
            })
    }
    return (
        <div className='products-wrapper'>
            <p><Link to="/admin" className='dashboard'>Dashboard</Link> / Products</p>
            <div className='products-admin-box'>
                <div className='products-title'><h2>Products</h2><span>{products.length}</span></div>
                <button onClick={() => navigate("/admin/product/actions/new")}><span className="material-symbols-outlined">
                    add
                </span><span className='create-text'>Create new</span></button>
            </div>
            {/* <PulseLoader
                color={color}
                loading={loading}
                cssOverride={override}
                size={10}
                aria-label="Loading Spinner"
                data-testid="loader"
            /> */}
            <table>
                <thead>
                    <tr>
                        <th scope="col">image</th>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Category</th>
                        <th scope="col">Updated</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? <div className="d-flex justify-content-center loading-wrapper">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div> : products?.map((product, index) => (
                        <tr key={Math.random() * Date.now()} className='product'>
                            <td><img src={(product as Product).avatar} alt="noImage" className={`${productVisible ? 'show' : ''}`} /></td>
                            <td>{index + 1}</td>
                            <td className='name'>{(product as Product).name}</td>
                            <td>{(product as Product).categoryName}</td>
                            <td className='date'>
                                {dateFormat((product as Product).updateAt.toLocaleString(), "dddd, mmmm dS, yyyy, h:MM:ss TT")}
                                {/* {(product as Product).updateAt.toLocaleString()} */}
                            </td>
                            <td>
                                {/* <Action product={product} /> */}
                                <span className="material-symbols-outlined" onClick={() => {
                                    setProductData(product)
                                    setIsOpenModal(true)
                                }}>
                                    edit
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <nav aria-label="Page navigation example page_box">
                <ul className="pagination">
                    <li className="page-item">
                        <a className="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    {
                        maxPage.map(item => {
                            return (
                                <li key={Math.random() * Date.now()} className="page-item"><a className="page-link" href="#" onClick={() => changePage(item)}>{item.number}</a></li>
                            )
                        })
                    }
                    <li className="page-item">
                        <a className="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
            {isOpenModal && productData && <UpdateProduct product={productData} setIsOpenModal={setIsOpenModal} isOpenModal={isOpenModal} />}
        </div>
    )
}
