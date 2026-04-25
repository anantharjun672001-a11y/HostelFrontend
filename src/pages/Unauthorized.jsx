import React from 'react';

const Unauthorized = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold text-center text-white mb-2">
                403 - Unauthorized
            </h1>
            <p className="text-center text-gray-200 mb-6">
                You do not have permission to access this page.
            </p>
        </div>
    );
};

export default Unauthorized;