"use client"

import React, { useEffect, useState } from 'react';

const ProductListByCategory = () => {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState('all');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products');
                const data = await response.json();
                setProducts(data);

                const uniqueCategories = Array.from(new Set(data.map(product => product.category)));
                setCategories(uniqueCategories);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        getData();
    }, []);

    const filteredProducts = category === 'all' ? products : products.filter(product => product.category === category);

    return (
        <div className='bg-gray-100 dark:bg-gray-800'>
            <div className="flex flex-col items-center p-5 font-sans">
                <div className="w-full max-w-2xl">
                    <h1 className="text-center text-2xl font-bold text-gray-800 dark:text-gray-200">PRODUCTOS POR CATEGORÍA</h1>
                    <div className="my-4">
                        <label htmlFor="category" className="block text-gray-700 dark:text-gray-200">SELECCIONAR CATEGORÍA:</label>
                        <select 
                            id="category" 
                            value={category} 
                            onChange={(e) => setCategory(e.target.value)}
                            className="mt-2 p-2 border border-gray-300 rounded-md dark: text-black"
                        >
                            <option value="all" className='dark: text-black'>ALL</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat} className='dark: text-black'>{cat.toUpperCase()}</option>
                            ))}
                        </select>
                    </div>
                    {filteredProducts.length ? (
                        <ul className="list-none p-0">
                            {filteredProducts.map((product) => (
                                <li key={product.id} className="flex items-center bg-white dark:bg-white border-gray-300 dark:border-gray-200 rounded-xl my-2 p-5 shadow-md">
                                <div className="flex-shrink-0 w-24 h-24 flex items-center justify-center mr-5">
                                    <img src={product.image} alt={product.title} className="w-full h-full object-contain" />
                                </div>
                                <div className="flex-grow text-left">
                                    <strong className="block text-lg font-medium text-gray-800 dark:text-black ">{product.title}</strong>
                                    <p className="mt-2 text-gray-600 dark:text-gray-600">Precio: ${product.price}</p>
                                </div>
                            </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-800 dark:text-gray-200">Loading products...</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductListByCategory;
