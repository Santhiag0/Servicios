"use client"

import React, { useEffect } from 'react';
import useInvoiceManager from '../hooks/useInvoiceManager';

const Facturas = () => {
    const { invoices, loading, error, fetchInvoices } = useInvoiceManager();

    useEffect(() => {
        fetchInvoices();
    }, []);

    return (
        <div className="p-6 bg-gray-100 dark:bg-gray-800 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">Facturas</h1>
            {loading ? (
                <p className="text-gray-800 dark:text-gray-200">Cargando...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <div className="space-y-6">
                    {invoices.map(invoice => (
                        <div key={invoice.id} className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg">
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Factura #{invoice.id}</h2>
                            <p className="text-gray-600 dark:text-gray-300">Fecha de Venta: {new Date(invoice.dateSale).toLocaleString()}</p>
                            <div className="mt-4">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Cliente</h3>
                                <p className="text-gray-600 dark:text-gray-300">Nombre: {invoice.client.firstName} {invoice.client.lastName}</p>
                                <p className="text-gray-600 dark:text-gray-300">DNI: {invoice.client.dni}</p>
                                <p className="text-gray-600 dark:text-gray-300">Dirección: {invoice.client.address}</p>
                                <p className="text-gray-600 dark:text-gray-300">Teléfono: {invoice.client.phone}</p>
                                <p className="text-gray-600 dark:text-gray-300">Email: {invoice.client.email}</p>
                            </div>
                            <div className="mt-4">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Detalles de la Venta</h3>
                                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
                                    {invoice.salesDetails.map(detail => (
                                        <li key={detail.id} className="mt-2">
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center">
                                                    <img src={detail.product.imagen} alt={detail.product.name} className="w-12 h-12 object-contain mr-4"/>
                                                    <div>
                                                        <p className="font-medium">{detail.product.name}</p>
                                                        <p>Cantidad: {detail.quantity}</p>
                                                    </div>
                                                </div>
                                                <div>
                                                    <p>Precio: ${detail.product.price.toFixed(2)}</p>
                                                    <p>Subtotal: ${detail.subtotal.toFixed(2)}</p>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-4">
                                <p className="text-gray-600 dark:text-gray-300">Subtotal: ${invoice.subtotal.toFixed(2)}</p>
                                <p className="text-gray-600 dark:text-gray-300">Total: ${invoice.total.toFixed(2)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Facturas;
