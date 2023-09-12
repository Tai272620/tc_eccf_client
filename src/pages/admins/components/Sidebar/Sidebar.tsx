import React from 'react';
import './sideBar.scss';
import { Link, useNavigate } from 'react-router-dom';
// import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

export default function AdminNavbar() {
    const navigate = useNavigate();
    return (
        <div className='adminNav-container'>
            <h1>Admin</h1>
            <span className='navLink' onClick={() => navigate("customer")}>
                <span className="material-symbols-outlined">
                    person
                </span>
                <span>Customers</span>
            </span>
            <span className='navLink' onClick={() => navigate("category")}>
                <span className="material-symbols-outlined">
                    label
                </span>
                <span>Categories</span>
            </span>
            <span className='navLink' onClick={() => navigate("product")}>
                <span className="material-symbols-outlined">
                    shopping_bag
                </span>
                <span>Products</span>
            </span>
            <span className='navLink' onClick={() => navigate("order")}>
                <span className="material-symbols-outlined">
                    local_shipping
                </span>
                <span>Orders</span>
            </span>
        </div>
    )
} 
