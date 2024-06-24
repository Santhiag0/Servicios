"use client";

import React, { useState } from 'react';
import useProductCategoryManager from '../hooks/useProductCategoryManager';
import EditCategory from './EditCategory';
import { getRole } from '../utils/auth';        
import ProductModal from './ProductModal';
import NewCategoryModal from './NewCategoryModal';
import DeleteCategoryButton from './DeleteCategoryButton';
import IVAButton from './IVAButton';

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

    const handleSaveCategory = (categoryData) => {
        if (currentCategory && currentCategory.id) {
            editCategory(currentCategory.id, categoryData);
        } else {
            addCategory(categoryData);
        }
        setNewCategoryModalOpen(false);
    };

    const handleDeleteCategory = (categoryId) => {
        deleteCategory(categoryId);
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

                    {role === 'admin' && (
                    <div className="flex space-x-4">
                        <button onClick={handleAddProduct} className="mb-4 p-2 bg-blue-500 text-white rounded">Agregar Producto</button>
                        <button onClick={handleAddCategory} className="mb-4 p-2 bg-green-500 text-white rounded">Agregar Categoria</button>
                        <DeleteCategoryButton categories={categories} onDelete={handleDeleteCategory} />
                        <EditCategory />
                        <IVAButton />
                    </div>
                    )}

                    {loading ? (
                        <p className="text-gray-800 dark:text-gray-200">Loading products...</p>
                    ) : filteredProducts.length ? (
                        <ul className="list-none p-0">
                            {filteredProducts.map((product) => (
                                <li key={product.id} className="flex items-center bg-white dark:bg-white border-gray-300 dark:border-gray-200 rounded-xl my-2 p-5 shadow-md">
                                    <div className="flex-shrink-0 w-24 h-24 flex items-center justify-center mr-5">
                                        <img src={product.imagen} alt={product.name} className="w-full h-full object-contain" />
                                    </div>
                                    <div className="flex-grow text-left">
                                        <strong className="block text-lg font-medium text-gray-800 dark:text-black ">{product.name.toUpperCase()}</strong>
                                        <p className="mt-2 font-medium text-black dark:text-black">Precio: ${product.price}</p>
                                        <p className="mt-2 text-black dark:text-black">Cantidad: {product.stock}</p>
                                        {role === 'admin' && (
                                        <button onClick={() => handleEditProduct(product)} className="mt-2 p-2 bg-yellow-500 text-white rounded">Edit</button>
                                        )}
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
                currentCategory={currentCategory}
            />
        </div>
    );
};

export default Categories;
