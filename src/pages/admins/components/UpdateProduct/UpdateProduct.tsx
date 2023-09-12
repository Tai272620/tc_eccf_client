import { useState, useRef } from 'react';
import './updateProduct.scss';
import { StoreType } from '@/stores';
import { useSelector } from 'react-redux';
import api from '@/services/api';
import { message, Modal } from 'antd';

type UpdateProductProp = {
    product: any,
    setIsOpenModal: Function,
    isOpenModal: boolean
}

interface Category {
    id: string;
    title: string;
    avatar: string;
}

export default function UpdateProduct(props: UpdateProductProp) {
    const [loading, setLoading] = useState(false);
    const urlPreviewRef = useRef<HTMLImageElement>(null);
    const categoryStore = useSelector((store: StoreType) => store.categoryStore);
    let cols: number = 40;
    let rows: number = 5;

    const closeModal = () => {
        props.setIsOpenModal(false);
    }

    const openModal = () => {
        props.setIsOpenModal(true);
    }

    async function updateProduct(eventForm: FormDataEvent) {
        setLoading(true);
        eventForm.preventDefault();
        let updateInfor = {
            categoryId: (eventForm.target as any).categoryId.value,
            name: (eventForm.target as any).name.value,
            des: (eventForm.target as any).des.value,
            price: Number((eventForm.target as any).price.value),
        };
        let formData = new FormData();
        if ((eventForm.target as any).avatar.files.length > 0) {
            formData.append("avatar", (eventForm.target as any).avatar.files[0]);
        }
        formData.append("product_infor", JSON.stringify(updateInfor));

        api.productApi.update((props.product).id, formData).then(res => {
            if (res.status == 200) {
                setLoading(false);
                message.success("Update product successfully")
            } else {
                setLoading(false);
                Modal.error({
                    content: res.data.message
                })
            }
        }).catch(err => {
            setLoading(false);
            console.log("err", err)
        })
    }

    return (
        <form className={`update-product ${props.isOpenModal ? 'open' : 'closed'}`} onSubmit={(e) => {
            updateProduct(e as any)
        }}>
            <div className='overlay' onClick={closeModal}></div>
            <div className='product-image'>
                <img style={{ width: "100px" }} src={props.product.avatar} alt="Product Avatar" ref={urlPreviewRef} />
                <input
                    name="avatar"
                    onChange={(event) => {
                        if ((event.target).files && (event.target).files.length == 0) {
                            console.log("Chưa chọn hình!");
                        } else {
                            if ((event.target).files) {
                                let blodUrl = URL.createObjectURL(event.target.files[0]);
                                if (urlPreviewRef.current) {
                                    urlPreviewRef.current.src = blodUrl;
                                }
                            }
                        }
                    }}
                    type="file"
                />
            </div>
            <div className='form-group'>
                <label htmlFor="">Name</label><br />
                <input type="text" defaultValue={props.product.name} name='name' />
            </div>
            <div className='form-group'>
                <label htmlFor="">Price</label><br />
                <input type="text" defaultValue={props.product.price} name='price' />
            </div>
            <div className="form-group">
                <label htmlFor="">Category</label><br />
                <select name='categoryId' defaultValue={props.product.categoryId}>
                    {
                        categoryStore.data?.map((category: Category) => <option key={Math.random() * Date.now()} value={(category as Category).id}>{(category as Category).title}</option>)
                    }
                </select>
            </div>
            <div className='form-group'>
                <label htmlFor="">Description</label><br />
                <textarea name="des" id="" cols={cols} rows={rows} defaultValue={props.product.des}></textarea>
            </div>
            <button type='submit' className='save-button'>
                {loading ? <span className='loading-spinner'></span> : "Save"}
            </button>
        </form>
    )
}
