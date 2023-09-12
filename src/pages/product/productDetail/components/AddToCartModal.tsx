import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './addToCartModal.scss';

function AddToCartModal() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <button onClick={handleShow} className='addToCart-button'>
                <span>Add to cart</span>
                <span>+</span>
            </button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                    <button onClick={handleClose} className='close-button'>
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                    <h3>French Roast</h3>
                    <p className='product-desc'>This toasty, organic blend redefines what a classic dark roast can be. It’s big and smoky, but never burnt.</p>
                    <p className='product-price'>100$</p>
                    <p className='product-quantity-label'>QUANTITY</p>
                    <div className='product-quantity'>
                        <button>
                            <span className="material-symbols-outlined">
                                add
                            </span>
                        </button>
                        <span>0</span>
                        <button>
                            <span className="material-symbols-outlined">
                                remove
                            </span>
                        </button>
                    </div>
                    <button className='addToCart-button'>Add to cart</button>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default AddToCartModal;