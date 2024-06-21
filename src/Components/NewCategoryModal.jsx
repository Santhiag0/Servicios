"use client"

import React, { useState } from 'react';
import useProductCategoryManager from '../hooks/useProductCategoryManager';
import EditCategory from './EditCategory';
import AddProductButton from './AddProductButton';
import AddCategoryButton from './AddCategoryButton';
import ProductModal from './ProductModal';
import NewCategoryModal from './NewCategoryModal';

const Categories = () => {
    const { categories, products, loading, addCategory, editCategory, deleteCategory, addProduct, editProduct, deleteProduct } = useProductCategoryManager();
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [modalOpen, setModalOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [newCategoryModalOpen, setNewCategoryModalOpen] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null);
    const [categoryName, setCategoryName] = useState('');
    const [categoryDescription, setCategoryDescription] = useState('');

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

    return (
        <div className='bg-gray-100 dark:bg-gray-800 min-h-screen'>
            <div className="flex flex-col items-center p-5 font-sans">
                <div className="w-full max-w-4xl">
                    <h1 className="text-center text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">PRODUCTOS POR CATEGORÍA</h1>
                    <div className="mb-4">
                        <label htmlFor="category" className="block text-gray-700 dark:text-gray-200 mb-2">SELECCIONAR CATEGORÍA:</label>
                        <select
                            id="category"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="mt-2 p-2 border border-gray-300 rounded-md dark:text-black w-full"
                        >
                            <option value="all" className='dark:text-black'>ALL</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.name} className='dark:text-black'>{cat.name.toUpperCase()}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex space-x-4 mb-4">
                        <AddProductButton onClick={handleAddProduct} />
                        <AddCategoryButton onClick={handleAddCategory} />
                        <EditCategory />
                    </div>
                    {loading ? (
                        <p className="text-gray-800 dark:text-gray-200">Loading products...</p>
                    ) : filteredProducts.length ? (
                        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredProducts.map((product) => (
                                <li key={product.id} className="flex flex-col items-center bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-4 shadow-md">
                                    <div className="w-full flex justify-center">
                                        <img src={`data:image/jpeg;base64,${product.imagen}`} alt={product.name} className="w-24 h-24 object-contain" />
                                    </div>
                                    <div className="flex-grow text-center mt-4">
                                        <strong className="block text-lg font-medium text-gray-800 dark:text-gray-200">{product.name.toUpperCase()}</strong>
                                        <p className="mt-2 font-medium text-gray-700 dark:text-gray-300">Precio: ${product.price}</p>
                                        <p className="mt-2 text-gray-700 dark:text-gray-300">Cantidad: {product.stock}</p>
                                    </div>
                                    <div className="flex space-x-2 mt-4">
                                        <button onClick={() => handleEditProduct(product)} className="p-2 bg-yellow-500 text-white rounded">Edit</button>
                                        <button onClick={() => deleteProduct(product.id)} className="p-2 bg-red-500 text-white rounded">Delete</button>
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
