import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import "./search.scss"
import { useState } from 'react';
import api from '@/services/api';
import { useNavigate } from 'react-router-dom';
import { StoreType } from '@/stores';
import { useSelector } from 'react-redux';


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

function OffCanvasExample({ name, placement }: OffCanvasExampleProps) {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [searchStatus, setSearchStatus] = useState(false);
    const [searchData, setSearchData] = useState<Product[]>([]);

    const categoryStore = useSelector((store: StoreType) => store.categoryStore);

    let timeOut: any;
    function search(e: any) {
        // console.log("search", e.target.value);
        clearTimeout(timeOut);
        if (e.target.value == "") {
            setSearchData([])
            return;
        };
        timeOut = setTimeout(async () => {
            //  call api
            setSearchStatus(true)
            try {
                if (searchStatus) {
                    return
                }
                let result = await api.productApi.search(e.target.value);
                if (result.status == 200) {
                    // sau 1.5s set lai data & tat loading
                    setTimeout(() => {
                        setSearchStatus(false);
                        // console.log("res", result.data.data);
                        setSearchData(result.data.data);

                    }, 1500)

                } else {
                    // failed
                    setSearchStatus(false);
                }
            } catch (err) {
                console.log("loi call api search");
            }
        }, 600)
    }

    return (
        <>
            <button onClick={handleShow}>
                <i className="fa-solid fa-magnifying-glass"></i>
            </button>
            <Offcanvas show={show} onHide={handleClose} placement={placement}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title className='search_top'>
                        <div className='search_input'>
                            <i style={{ padding: "0 15px 0 0" }} className="fa-solid fa-magnifying-glass"></i>
                            <input className='inputSearch' type="text" placeholder='what do you need ?' onChange={(e) => search(e)} />
                        </div> </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className='search_body'>
                    <div className='search_categories'>
                        <h4>List Categories</h4>
                        {categoryStore.data?.map((category: any, index: number) => <p key={Math.random() * Date.now()} onClick={() => {
                            navigate(`/collections/${category.id}`)
                            handleClose()
                        }}>{category.title}</p>)}
                    </div>
                    <div className='container_search'>
                        {searchData?.map((product, index) => (
                            <div className='search_item' key={product.id}>
                                <img src={product.avatar} alt="" onClick={() => {
                                    navigate(`/products/${product.id}`)
                                    handleClose()
                                }} />
                                <div className='name_item_search'>{product.name}</div>
                            </div>
                        ))}
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

function Search() {
    return (
        <>
            <OffCanvasExample placement="top" name="top" />
        </>
    );
}

export default Search;