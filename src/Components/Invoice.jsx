"use client"

import React, { useState, useEffect } from 'react';
import useInvoiceManager from '../hooks/useInvoiceManager';
import PayButton from './PayButton';

const Invoice = ({ addedProducts, onRemoveProduct }) => {
    const { client, loading, error, fetchClientByDni } = useInvoiceManager();
    const [customerType, setCustomerType] = useState('consumer');
    const [dni, setDni] = useState('9999999999999');
    const [ivaPercentage, setIvaPercentage] = useState(15);

    const subtotal = addedProducts.reduce((acc, product) => acc + product.price * product.quantity, 0);
    const iva = subtotal * (ivaPercentage / 100);
    const total = subtotal + iva;

    const handleCustomerTypeChange = (e) => {
        const selectedType = e.target.value;
        setCustomerType(selectedType);
        if (selectedType === 'consumer') {
            setDni('9999999999999');
        } else {
            setDni('');
        }
    };

    const handleValidateClient = () => {
        if (dni) {
            fetchClientByDni(dni);
        }
    };

    useEffect(() => {
        if (customerType === 'consumer') {
            fetchClientByDni('9999999999999');
        }
    }, [customerType]);

    const handlePaymentSuccess = () => {
        alert('Se ha realizado la compra');
    window.location.reload();
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
                    <label htmlFor="dni" className="block text-gray-700 mb-2">Cédula</label>
                    <div className="flex">
                        <input 
                            type="text" 
                            id="dni" 
                            value={dni} 
                            onChange={(e) => setDni(e.target.value)}
                            className="p-2 border border-gray-300 rounded-md w-full text-gray-700"
                        />
                        <button 
                            onClick={handleValidateClient}
                            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md"
                        >
                            Validar
                        </button>
                    </div>
                    {loading && <p className="text-gray-700 mt-2">Cargando...</p>}
                    {error && <p className="text-red-500 mt-2">Cliente no encontrado</p>}
                    {client && (
                        <div className="mt-4">
                            <p className="text-gray-700"><strong>Nombre:</strong> {client.firstName} {client.lastName}</p>
                            <p className="text-gray-700"><strong>Dirección:</strong> {client.address}</p>
                            <p className="text-gray-700"><strong>Teléfono:</strong> {client.phone}</p>
                            <p className="text-gray-700"><strong>Email:</strong> {client.email}</p>
                        </div>
                    )}
                </div>
            )}
            {customerType === 'consumer' && (
                <div className="mt-4">
                    <p className="text-gray-700"><strong>Nombre:</strong> Consumidor Final</p>
                    <p className="text-gray-700"><strong>Dirección:</strong> Dirección Genérica</p>
                    <p className="text-gray-700"><strong>Teléfono:</strong> 9999999999</p>
                    <p className="text-gray-700"><strong>Email:</strong> consumidor@final.com</p>
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
                <div className="flex justify-between items-center text-gray-800">
                    <span>IVA (%):</span>
                    <input 
                        type="number" 
                        value={ivaPercentage} 
                        onChange={(e) => setIvaPercentage(e.target.value)} 
                        className="p-1 border border-gray-300 rounded-md w-16 text-center text-gray-800"
                    />
                </div>
                <div className="flex justify-between text-gray-800">
                    <span>IVA {ivaPercentage}%:</span>
                    <span>${iva.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-gray-800">
                    <span>Total Final:</span>
                    <span>${total.toFixed(2)}</span>
                </div>
            </div>
            <PayButton addedProducts={addedProducts} clientDni={dni} onSuccess={handlePaymentSuccess} />
        </div>
    );
};

export default Invoice;
