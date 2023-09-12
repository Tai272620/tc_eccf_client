import React from 'react';
import { Outlet } from 'react-router-dom'
import AdminNavbar from './components/Sidebar/Sidebar';
import './admin.scss';
import Navbar from './components/Navbar/Navbar';

export default function Admin() {
    return (
        <div className='admin-page'>
            <div className='admin-page-content'>
                <AdminNavbar />
                <div className='admin-content-body'>
                    <Navbar />
                    <Outlet />
                </div>
                {/* <Footer /> */}
            </div>
        </div>
    )
}
