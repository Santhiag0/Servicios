"use client"

import React, { useState, useEffect, useRef } from 'react';

const ProductModal = ({ isOpen, onClose, onSave, product, categories }) => {
    const [name, setName] = useState(product ? product.name : '');
    const [category, setCategory] = useState(product ? product.category : '');
    const [image, setImage] = useState(product ? product.image : '');
    const [stock, setStock] = useState(product ? product.stock : 0);
    const [price, setPrice] = useState(product ? product.price : 0.0);
    const [newCategory, setNewCategory] = useState('');
    const [fileName, setFileName] = useState('');

    const nameRef = useRef(null);

    useEffect(() => {
        if (product) {
            setName(product.name);
            setCategory(product.category);
            setImage(product.image);
            setStock(product.stock);
            setPrice(product.price);
        }
    }, [product]);

    useEffect(() => {
        if (isOpen && nameRef.current) {
            nameRef.current.focus();
        }
    }, [isOpen]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result.split(',')[1];
            setImage(base64String);
            setFileName(file.name);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        const selectedCategory = newCategory ? newCategory : category;
        onSave({ id: product ? product.id : null, name, category: selectedCategory, image, stock, price });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-slate-900 p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4 text-white">{product ? 'Edit Product' : 'Add Product'}</h2>

                <div className="mb-2">
                    <label className="block text-gray-200 mb-1">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        ref={nameRef}
                        className="p-2 border rounded w-full text-black"
                    />
                </div>

                <div className="mb-2">
                    <label className="block text-gray-200 mb-1">Image</label>
                    <input
                        type="file"
                        onChange={handleImageChange}
                        className="mt-2 p-2 border rounded w-full text-black"
                    />
                    {fileName && <p className="mt-2 text-green-500">Archivo subido: {fileName}</p>}
                </div>

                <div className="mb-2">
                    <label className="block text-gray-200 mb-1">Stock</label>
                    <input
                        type="number"
                        value={stock}
                        onChange={(e) => setStock(Math.max(0, e.target.value))}
                        className="p-2 border rounded w-full text-black"
                    />
                </div>

                <div className="mb-2">
                    <label className="block text-gray-200 mb-1">Price</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(Math.max(0, e.target.value))}
                        className="p-2 border rounded w-full text-black"
                    />
                </div>

                <div className="mb-2">
                    <label className="block text-gray-200 mb-1">Category</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="p-2 border rounded w-full text-black"
                    >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.name}>{cat.name.toUpperCase()}</option>
                        ))}
                    </select>
                </div>

                <div className="flex justify-end space-x-2">
                    <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
                    <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Close</button>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;
