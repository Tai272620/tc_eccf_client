import React, { useEffect, useState } from 'react';
import './categories.scss';
import { Link, useNavigate } from 'react-router-dom';
import Action from '../Actions/Action';
import api from '@/services/api';
import dateFormat from "dateformat";

interface Category {
    id: string,
    title: String,
    updateAt: Date,
    count: number
}

export default function Categories() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    interface CategoryWithProductCount {  // Thêm trường count vào Category
        id: string,
        title: String,
        updateAt: Date,
        count: number  // Thêm trường count vào Category
    }
    // const [categories, setCategories] = useState([]);
    const [count, setCount] = useState([]);
    // useEffect(() => {
    //     api.categoryApi.findMany()
    //         .then(res => {
    //             if (res.status == 200) {
    //                 setCategories(res.data.data);
    //                 for (let i = 0; i < res.data.data.length; i++) {
    //                     api.productApi.findByCategory(res.data.data[i].id)
    //                         .then(res => {
    //                             console.log("res", res.data.data.length)
    //                         })
    //                 }
    //             }
    //         })
    //         .catch(err => {

    //         })
    // }, [])
    const [categories, setCategories] = useState<CategoryWithProductCount[]>([]); // Cập nhật kiểu dữ liệu
    useEffect(() => {
        setIsLoading(true);
        api.categoryApi.findMany()
            .then(res => {
                if (res.status === 200) {
                    const categoriesWithCount = res.data.data.map((category: any) => {
                        return {
                            ...category,
                            count: 0  // Khởi tạo số lượng sản phẩm ban đầu là 0
                        };
                    });
                    setCategories(categoriesWithCount);

                    // Lặp qua danh sách danh mục và tìm số lượng sản phẩm cho mỗi danh mục
                    categoriesWithCount.forEach((category: { id: string; }) => {
                        api.productApi.findByCategory(category.id)
                            .then(res => {
                                if (res.status === 200) {
                                    const productCount = res.data.data.length;
                                    setCategories(prevCategories => prevCategories.map(prevCategory => {
                                        if (prevCategory.id === category.id) {
                                            return {
                                                ...prevCategory,
                                                count: productCount
                                            };
                                        }
                                        return prevCategory;
                                    }));
                                }
                            })
                            .catch(err => {
                                // Xử lý lỗi nếu cần
                            });
                    });
                }
            })
            .catch(err => {
                // Xử lý lỗi nếu cần
            })
            .finally(() => {
                setIsLoading(false); // Kết thúc loading
            });
    }, [])

    return (
        <div className='categories-wrapper'>
            <p><Link to="/admin" className='dashboard'>Dashboard</Link> / Categoriess</p>
            <div className='categories-admin-box'>
                <div className='categories-title'><h2>Categories</h2><span>{categories.length}</span></div>
                <button onClick={() => navigate("/admin/category/actions/new")}><span className="material-symbols-outlined">
                    add
                </span><span className='create-text'>Create new</span></button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">#Products</th>
                        <th scope="col">Updated</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? <div className="d-flex justify-content-center loading-wrapper">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div> : categories?.map((category, index) => (
                        <tr key={Math.random() * Date.now()} className='category'>
                            <td>{index + 1}</td>
                            <td className='name'>{(category as Category).title}</td>
                            <td>{(category as Category).count}</td>
                            <td>{dateFormat((category as Category).updateAt.toLocaleString(), "dddd, mmmm dS, yyyy, h:MM:ss TT")}</td>
                            <td>
                                <span className="material-symbols-outlined">more_horiz</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}
