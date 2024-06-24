"use client"

import React, { useState } from 'react';

const DeleteCategoryModal = ({ isOpen, onClose, categories, onDelete }) => {
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleDelete = () => {
        if (selectedCategory) {
            onDelete(selectedCategory);
            setSelectedCategory('');
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 text-black">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Eliminar Categoría</h2>
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="mb-4 p-2 border rounded w-full"
                >
                    <option value="">Seleccione una categoría</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name.toUpperCase()}</option>
                    ))}
                </select>
                <div className="flex justify-end space-x-2">
                    <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded">Eliminar</button>
                    <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancelar</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteCategoryModal;
