"use client"

import React, { useEffect, useRef } from 'react';

const NewCategoryModal = ({ isOpen, onClose, onSave, name, setName, description, setDescription, currentCategory }) => {
    const nameRef = useRef(null);

    useEffect(() => {
        if (isOpen && nameRef.current) {
            nameRef.current.focus();
        }
    }, [isOpen]);

    const handleSave = () => {
        onSave({ name, description });
        setName('');
        setDescription('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="text-black fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">{currentCategory ? 'Edit Category' : 'Add Category'}</h2>
                <input
                    type="text"
                    placeholder="Category Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    ref={nameRef}
                    className="mb-2 p-2 border rounded w-full"
                />
                <input
                    type="text"
                    placeholder="Category Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mb-2 p-2 border rounded w-full"
                />
                <div className="flex justify-end space-x-2">
                    <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
                    <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Close</button>
                </div>
            </div>
        </div>
    );
};

export default NewCategoryModal;
