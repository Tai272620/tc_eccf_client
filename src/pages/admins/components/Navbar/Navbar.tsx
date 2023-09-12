import React from 'react';
import './navbar.scss';

export default function Navbar() {
    return (
        <div className='navbar-wrapper'>
            <div className='search'>
                <input type="text" placeholder='search...' />
                <span className="material-symbols-outlined">
                    search
                </span>
            </div>

        </div>
    )
}
