import { useState, useEffect } from 'react';
import './addCategory.scss';
import api from '@/services/api';
import { message } from 'antd';

export default function AddCategory() {
    const [loading, setLoading] = useState(false);
    function addNewCategory(e: FormDataEvent) {
        e.preventDefault();
        setLoading(true);
        if ((e.target as any).title.value != "") {
            let newCategory = {
                title: (e.target as any).title.value,
            }

            api.categoryApi.create(newCategory)
                .then((res: any) => {
                    if (res.status == 200) {
                        setLoading(false);
                        message.success(res.data.message);
                    } else {
                        setLoading(false);
                        message.warning(res.data.message);
                    }
                })
                .catch((err: any) => {
                    message.error('An error occurred during registration. Please try again.');
                    setLoading(false);
                })
        } else {
            message.warning("Category name is required");
            setLoading(false);
        }

    }

    return (
        <div className='addProduct-container'>
            <nav>
                <ol className='addProduct-nav'>
                    <li>Dasboard /</li>
                    <li>Category /</li>
                    <li>Create new</li>
                </ol>
            </nav>
            <h2>Create new</h2>
            <form action="" onSubmit={(e) => { addNewCategory(e as any) }}>
                <div className='form-group'>
                    <label htmlFor="">Name</label><br />
                    <input type="text" name='title' />
                </div>
                <button type='submit' className='save-button'>
                    {loading ? <span className='loading-spinner'></span> : "Save"}
                </button>
            </form>
        </div>
    )
}
