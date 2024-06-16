"use client"

import Link from 'next/link';
import React, { useState } from 'react';

const Invoice = ({ addedProducts, onRemoveProduct }) => {
    const [customerType, setCustomerType] = useState('consumer');
    const [idNumber, setIdNumber] = useState('');

    const subtotal = addedProducts.reduce((acc, product) => acc + product.price * product.quantity, 0);
    const iva = subtotal * 0.15;
    const total = subtotal + iva;

    const handleCustomerTypeChange = (e) => {
        setCustomerType(e.target.value);
        if (e.target.value === 'consumer') {
            setIdNumber('9999999999');
        } else {
            setIdNumber('');
        }
    };

    const handleInvoice = () => {
        
        if (addedProducts.length === 0) {
            alert('No hay productos añadidos.');
            return;
        }
        alert('Compra realizada con éxito!');
        <Link href={'./facturas'}></Link>
    };

    


    return (
        <div className="w-2/5 bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-700">FACTURA</h2>
            <div className="mb-4">
                <label htmlFor="customerType" className="block text-gray-700 mb-2">Tipo de Cliente</label>
                <select
                    id="customerType"
                    value={customerType}
                    onChange={handleCustomerTypeChange}
                    className="p-2 border border-gray-300 rounded-md w-full text-gray-700"
                >
                    <option value="consumer" className='text-gray-700'>Consumidor Final</option>
                    <option value="data" className='text-gray-700'>Datos</option>
                </select>
            </div>
            {customerType === 'data' && (
                <div className="mb-4">
                    <label htmlFor="idNumber" className="block text-gray-700 mb-2">Cédula</label>
                    <input
                        type="text"
                        id="idNumber"
                        value={idNumber}
                        onChange={(e) => setIdNumber(e.target.value)}
                        className="p-2 border border-gray-300 rounded-md w-full text-gray-700"
                    />
                </div>
            )}
            <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Lista de Productos:</h3>
                <div className="flex justify-between mb-2 font-bold">
                    <span className='text-gray-800 w-2/5'>Nombre</span>
                    <span className='text-gray-800 w-1/5 text-center'>Cantidad</span>
                    <span className='text-gray-800 w-1/5 text-right mx-12'>Precio</span>
                </div>
                {addedProducts.map(product => (
                    <div key={product.id} className="flex justify-between items-center mb-2">
                        <span className='text-gray-800 w-2/5 truncate'>{product.name}</span>
                        <span className='text-gray-800 w-1/5 text-center'>{product.quantity}</span>
                        <span className='text-gray-800 w-1/5 text-right'>${product.price.toFixed(2)}</span>
                        <button onClick={() => onRemoveProduct(product.id)} className="ml-4 text-red-500">X</button>
                    </div>
                ))}
                <hr className="my-2" />
                <div className="flex justify-between">
                    <span className='text-gray-800'>Subtotal:</span>
                    <span className='text-gray-800'>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-800">
                    <span>IVA 15%:</span>
                    <span>${iva.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-gray-800">
                    <span>Total Final:</span>
                    <span>${total.toFixed(2)}</span>
                </div>
            </div>
            <button
                onClick={handleInvoice}
                className="mt-4 w-full bg-green-500 text-white p-2 rounded-md"
            >
                COMPRAR
            </button>
        </div>
    );
};

export default Invoice;
