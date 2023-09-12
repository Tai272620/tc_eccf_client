import { useEffect, useRef, useState } from 'react'
import './addProduct.scss';
import api from '@/services/api';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';
import ProgressBar from '../ProgressBar/ProgressBar';

interface Category {
    id: string;
    title: string;
    avatar: string;
}
interface Picture {
    file: File;
    url: string;
}

export default function AddProduct() {
    const imgPreviewRef = useRef();
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [pictures, setPictures] = useState<Picture[]>([]);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    useEffect(() => {
        api.categoryApi.findMany()
            .then(res => {
                if (res.status != 200) {
                    alert(res.data.message)
                } else {
                    setCategories(res.data.data)
                    console.log("categories", categories)
                }
            })
    }, [])

    function addNewProduct(e: FormDataEvent) {
        e.preventDefault();
        setLoading(true);
        let formData = new FormData();
        if ((e.target as any).categoryId.value == "" || (e.target as any).name.value == "" || (e.target as any).des.value == "" || (e.target as any).price.value == "") {
            message.warning("Please enter full field")
        }
        formData.append("product", JSON.stringify({
            categoryId: (e.target as any).categoryId.value,
            name: (e.target as any).name.value,
            des: (e.target as any).des.value,
            price: (e.target as any).price.value,
        }))
        formData.append("imgs", avatarFile!)
        // for (let i in pictures) {
        //     formData.append("imgs", pictures[i].file)
        // }

        api.productApi.create(formData)
            .then((res: any) => {
                // console.log("res", res)
                setLoading(false);
                message.success(res.data.message);
                (document.getElementById("name") as HTMLInputElement).value = "";
                (document.getElementById("des") as HTMLInputElement).value = "";
                (document.getElementById("price") as HTMLInputElement).value = "";
                (imgPreviewRef.current! as HTMLImageElement).src = "";
            })
            .catch((err: any) => {
                message.error('An error occurred during registration. Please try again.');
                setLoading(false);
            })
    }

    return (
        <div className='addProduct-container'>
            <nav>
                <ol className='addProduct-nav'>
                    <li>Dasboard /</li>
                    <li>Product /</li>
                    <li>Create new</li>
                </ol>
            </nav>
            <h2>Create new</h2>
            <form action="" onSubmit={(e) => { addNewProduct(e as any) }}>
                <div className='form-group'>
                    <label htmlFor="">Name</label><br />
                    <input type="text" name='name' id='name' />
                </div>
                <div className="form-group">
                    <label htmlFor="">Category</label><br />
                    <select name='categoryId'>
                        {
                            categories.map(category => <option key={Math.random() * Date.now()} value={(category as Category).id}>{(category as Category).title}</option>)
                        }
                    </select>
                </div>
                <div className='form-group'>
                    <label htmlFor="">Description</label><br />
                    <input type="text" name='des' id='des' />
                </div>
                <div className='form-group'>
                    <label htmlFor="">Price</label><br />
                    <input type='currency' name='price' id='price' />
                </div>
                <div className='form-group'>
                    Avatar
                    <input name='imgs' type="file" onChange={(e) => {
                        if (e.target.files) {
                            if (e.target.files.length > 0) {
                                (imgPreviewRef.current! as HTMLImageElement).src = URL.createObjectURL(e.target.files[0]);
                                setAvatarFile(e.target.files[0])
                            }
                        }
                    }} />
                    <img ref={imgPreviewRef} style={{ width: "100px", height: "100px", borderRadius: "50%" }} />
                </div>
                {/* <div className='form-group'>
                    Pictures
                    <input name="imgs" type="file" multiple onChange={(e) => {
                        if (e.target.files) {
                            if (e.target.files.length > 0) {
                                let tempPictures: Picture[] = [];
                                for (let i in e.target.files) {
                                    if (i == "length") {
                                        break
                                    }
                                    tempPictures.push({
                                        file: e.target.files[i],
                                        url: URL.createObjectURL(e.target.files[i])
                                    })
                                }
                                setPictures(tempPictures)
                            }
                        }
                    }} />
                    <div>
                        {
                            pictures.map(picture => <img key={Math.random() * Date.now()} src={picture.url} style={{ width: "100px", height: "100px", borderRadius: "50%" }} />)
                        }
                    </div>
                </div> */}
                <button type='submit' className='save-button'>
                    {loading ? <span className='loading-spinner'></span> : "Save"}
                </button>
            </form>
        </div>
    )
}
