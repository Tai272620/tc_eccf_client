import React, { useState } from 'react';
import './progressBar.scss';

const ProgressBar: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 6000);
    };

    return (
        <div className={`button ${isLoading ? 'progress' : ''}`} onClick={handleClick}>
            <div className="text-icon">
                <i className="bx bx-cloud-upload"></i>
                <span className="text">{isLoading ? 'Add...' : 'Add'}</span>
            </div>
        </div>
    );
};

export default ProgressBar;
