"use client"

import React, { useState, useEffect } from 'react';
import useProductCategoryManager from '../hooks/useProductCategoryManager';
import EditCategory from './EditCategory';
import { getRole } from '../utils/auth';


const Categories = () => {
    const { categories, products, loading, addCategory, editCategory, deleteCategory, addProduct, editProduct, deleteProduct } = useProductCategoryManager();
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [modalOpen, setModalOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [newCategoryModalOpen, setNewCategoryModalOpen] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null);
    const [categoryName, setCategoryName] = useState('');
    const [categoryDescription, setCategoryDescription] = useState('');

    const role = getRole();

    const filteredProducts = selectedCategory === 'all'
        ? products
        : products.filter(product => product.category === selectedCategory);

    const handleAddProduct = () => {
        setCurrentProduct(null);
        setModalOpen(true);
    };

    const handleEditProduct = (product) => {
        setCurrentProduct(product);
        setModalOpen(true);
    };

    const handleSaveProduct = (product) => {
        const productData = {
            ...product,
            category: categories.find(cat => cat.name === product.category).id,
        };
        if (product.id) {
            editProduct(product.id, productData);
        } else {
            addProduct(productData);
        }
    };

    const handleAddCategory = () => {
        setCurrentCategory(null);
        setCategoryName('');
        setCategoryDescription('');
        setNewCategoryModalOpen(true);
    };

    const handleEditCategory = (category) => {
        setCurrentCategory(category);
        setCategoryName(category.name);
        setCategoryDescription(category.description);
        setNewCategoryModalOpen(true);
    };

    const handleSaveCategory = () => {
        const categoryData = { name: categoryName, description: categoryDescription };
        if (currentCategory && currentCategory.id) {
            editCategory(currentCategory.id, categoryData);
        } else {
            addCategory(categoryData);
        }
        setNewCategoryModalOpen(false);
    };

    const ProductModal = ({ isOpen, onClose, onSave, product, categories }) => {
        const [name, setName] = useState(product ? product.name : '');
        const [category, setCategory] = useState(product ? product.category : '');
        const [image, setImage] = useState(product ? product.image : '');
        const [stock, setStock] = useState(product ? product.stock : 0);
        const [price, setPrice] = useState(product ? product.price : 0.0);
        const [newCategory, setNewCategory] = useState('');
        const [fileName, setFileName] = useState('');

        useEffect(() => {
            if (product) {
                setName(product.name);
                setCategory(product.category);
                setImage(product.image);
                setStock(product.stock);
                setPrice(product.price);
            }
        }, [product]);

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

    const NewCategoryModal = ({ isOpen, onClose, onSave, name, setName, description, setDescription }) => {

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

    return (
        <div className='bg-gray-100 dark:bg-gray-800'>
            <div className="flex flex-col items-center p-5 font-sans">
                <div className="w-full max-w-2xl">
                    <h1 className="text-center text-2xl font-bold text-gray-800 dark:text-gray-200">PRODUCTOS POR CATEGORÍA</h1>
                    <div className="my-4">
                        <label htmlFor="category" className="block text-gray-700 dark:text-gray-200">SELECCIONAR CATEGORÍA:</label>
                        <select
                            id="category"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="mt-2 p-2 border border-gray-300 rounded-md dark:text-black"
                        >
                            <option value="all" className='dark:text-black'>ALL</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.name} className='dark:text-black'>{cat.name.toUpperCase()}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex space-x-4">
                        <button onClick={handleAddProduct} className="mb-4 p-2 bg-blue-500 text-white rounded">Add Product</button>
                     
                        <button onClick={handleAddCategory} className="mb-4 p-2 bg-green-500 text-white rounded">Add Category</button>
                      
                            <EditCategory />

                    </div>
                    {loading ? (
                        <p className="text-gray-800 dark:text-gray-200">Loading products...</p>
                    ) : filteredProducts.length ? (
                        <ul className="list-none p-0">
                            {filteredProducts.map((product) => (
                                <li key={product.id} className="flex items-center bg-white dark:bg-white border-gray-300 dark:border-gray-200 rounded-xl my-2 p-5 shadow-md">
                                    <div className="flex-shrink-0 w-24 h-24 flex items-center justify-center mr-5">
                                        <img src={product.imagen} alt={product.name} className="w-full h-full object-contain" />
                                    {/* //<img src={product.imagen} alt={product.name} className="w-full h-full object-contain" /> */}
                                    </div>
                                    <div className="flex-grow text-left">
                                        <strong className="block text-lg font-medium text-gray-800 dark:text-black ">{product.name.toUpperCase()}</strong>
                                        <p className="mt-2  font-medium text-black dark:text-black">Precio: ${product.price}</p>
                                        <p className="mt-2 text-black dark:text-black">Cantidad: {product.stock}</p>
                                        
                                        
                                        <button onClick={() => handleEditProduct(product)} className="mt-2 p-2 bg-yellow-500 text-white rounded">Edit</button>
                                    
                                        {role === 'admin' && (
                                            <button onClick={() => deleteProduct(product.id)} className="mt-2 ml-2 p-2 bg-red-500 text-white rounded">Delete</button>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-800 dark:text-gray-200">No products found</p>
                    )}
                </div>
            </div>
            <ProductModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onSave={handleSaveProduct}
                product={currentProduct}
                categories={categories}
            />
            <NewCategoryModal
                isOpen={newCategoryModalOpen}
                onClose={() => setNewCategoryModalOpen(false)}
                onSave={handleSaveCategory}
                name={categoryName}
                setName={setCategoryName}
                description={categoryDescription}
                setDescription={setCategoryDescription}
            />
        </div>
    );
};

export default Categories;
