"use client"

import React, { useState } from 'react';
import useProductCategoryManager from '../hooks/useProductCategoryManager';

const EditCategory = () => {
    const { categories, editCategory } = useProductCategoryManager();
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [categoryDescription, setCategoryDescription] = useState('');

    const handleEditCategory = (category) => {
        setSelectedCategory(category.id);
        setCategoryName(category.name);
        setCategoryDescription(category.description);
        setEditModalOpen(true);
    };

    const handleSaveCategory = () => {
        if (selectedCategory) {
            const updatedCategory = { name: categoryName, description: categoryDescription };
            editCategory(selectedCategory, updatedCategory);
        }
        setEditModalOpen(false);
        window.location.reload()
    };

    const handleCategoryChange = (e) => {
        const categoryId = e.target.value;
        const category = categories.find(cat => cat.id === parseInt(categoryId));
        handleEditCategory(category);
    };

    return (
        <div className='text-black'>
            <button onClick={() => setEditModalOpen(true)} className="p-2 bg-yellow-500 text-white rounded">Edit Category</button>
            {editModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Edit Category</h2>
                        <select
                            className="mb-2 p-2 border rounded w-full"
                            onChange={handleCategoryChange}
                            value={selectedCategory}
                        >
                            <option value="">Select Category to Edit</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>{cat.name.toUpperCase()}</option>
                            ))}
                        </select>
                        <input
                            type="text"
                            placeholder="Category Name"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            className="mb-2 p-2 border rounded w-full"
                        />
                        <input
                            type="text"
                            placeholder="Category Description"
                            value={categoryDescription}
                            onChange={(e) => setCategoryDescription(e.target.value)}
                            className="mb-2 p-2 border rounded w-full"
                        />
                        <div className="flex justify-end space-x-2">
                            <button onClick={handleSaveCategory } className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
                            <button onClick={() => setEditModalOpen(false)} className="px-4 py-2 bg-gray-300 rounded">Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditCategory;
