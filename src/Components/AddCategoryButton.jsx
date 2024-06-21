import React from 'react';

const AddCategoryButton = ({ onClick }) => {
    return (
        <button onClick={onClick} className="mb-4 p-2 bg-green-500 text-white rounded">Add Category</button>
    );
};

export default AddCategoryButton;
