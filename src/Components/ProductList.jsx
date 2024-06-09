"use client"

import React, { useEffect, useState } from 'react';
import Invoice from './Invoice';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [counters, setCounters] = useState({});
    const [addedProducts, setAddedProducts] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products');
                const data = await response.json();
                setProducts(data);

                const initialCounters = data.reduce((acc, product) => {
                    acc[product.id] = 0;
                    return acc;
                }, {});
                setCounters(initialCounters);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        getData();
    }, []);

    const increaseCounter = (id) => {
        setCounters((prevCounters) => {
            const newCounters = { ...prevCounters, [id]: prevCounters[id] + 1 };
            updateAddedProducts(id, newCounters[id]);
            return newCounters;
        });
    };

    const decreaseCounter = (id) => {
        setCounters((prevCounters) => {
            const newCounters = { ...prevCounters, [id]: Math.max(prevCounters[id] - 1, 0) };
            updateAddedProducts(id, newCounters[id]);
            return newCounters;
        });
    };

    const updateAddedProducts = (id, quantity) => {
        setAddedProducts((prevProducts) => {
            const product = products.find(p => p.id === id);
            if (quantity > 0) {
                const existingProduct = prevProducts.find(p => p.id === id);
                if (existingProduct) {
                    return prevProducts.map(p => p.id === id ? { ...p, quantity } : p);
                } else {
                    return [...prevProducts, { ...product, quantity }];
                }
            } else {
                return prevProducts.filter(p => p.id !== id);
            }
        });
    };

    const removeProduct = (id) => {
        setCounters((prevCounters) => ({ ...prevCounters, [id]: 0 }));
        setAddedProducts((prevProducts) => prevProducts.filter(p => p.id !== id));
    };

    return (
        <div className='bg-gray-100 dark:bg-gray-800 flex'>
            <div className="flex flex-col items-center p-5 font-sans w-3/5">
                <div className="w-full max-w-2xl">
                    <h1 className="text-center text-2xl font-bold text-gray-800 dark:text-gray-200">LISTA DE PRODUCTOS</h1>
                    {products.length ? (
                        <ul className="list-none p-0">
                            {products.map((product) => (
                                <li key={product.id} className="flex items-center bg-white dark:bg-white border border-gray-300 dark:border-gray-600 rounded-lg my-2 p-5 shadow-md dark:shadow-lg">
                                    <div className="flex-shrink-0 w-24 h-24 flex items-center justify-center mr-5">
                                        <img src={product.image} alt={product.title} className="w-full h-full object-contain" />
                                    </div>
                                    <div className="flex-grow text-left">
                                        <strong className="block text-lg font-medium text-gray-800 ">{product.title}</strong>
                                        <p className="mt-2 text-gray-600">Precio: ${product.price}</p>
                                    </div>
                                    <div className="flex items-center mt-4">
                                        <button
                                            onClick={() => decreaseCounter(product.id)}
                                            className="px-4 py-2 bg-red-500 text-white rounded-md focus:outline-none"
                                        >
                                            -
                                        </button>
                                        <span className="px-4 py-2 text-gray-800">{counters[product.id]}</span>
                                        <button
                                            onClick={() => increaseCounter(product.id)}
                                            className="px-4 py-2 bg-green-500 text-white rounded-md focus:outline-none"
                                        >
                                            +
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-800 dark:text-gray-200">Loading products...</p>
                    )}
                </div>
            </div>
            <Invoice addedProducts={addedProducts} onRemoveProduct={removeProduct} />
        </div>
    );
};

export default ProductList;
