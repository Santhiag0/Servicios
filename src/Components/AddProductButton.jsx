import React from 'react';

const AddProductButton = ({ onClick }) => {
    return (
        <button onClick={onClick} className="mb-4 p-2 bg-blue-500 text-white rounded">Add Product</button>
    );
};

export default AddProductButton;
