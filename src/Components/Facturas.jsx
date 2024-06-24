"use client"

import React, { useEffect, useState } from 'react';
import useInvoiceManager from '../hooks/useInvoiceManager';
import FacturaDetalle from '../app/PDF/FacturaDetalle';

const Facturas = () => {
    const { invoices, loading, error, fetchInvoices } = useInvoiceManager();
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('invoiceNumber');

    useEffect(() => {
        fetchInvoices();
    }, []);

    const handleViewInvoice = (invoice) => {
        setSelectedInvoice(invoice);
    };

    const handleBack = () => {
        setSelectedInvoice(null);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchTypeChange = (e) => {
        setSearchType(e.target.value);
    };

    const filteredInvoices = invoices.filter(invoice => {
        switch (searchType) {
            case 'invoiceNumber':
                return invoice.id.toString().includes(searchTerm);
            case 'clientName':
                return invoice.client.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       invoice.client.lastName.toLowerCase().includes(searchTerm.toLowerCase());
            case 'saleDate':
                return new Date(invoice.dateSale).toLocaleDateString().includes(searchTerm);
            default:
                return true;
        }
    });

    if (selectedInvoice) {
        return <FacturaDetalle invoice={selectedInvoice} onBack={handleBack} />;
    }

    return (
        <div className="p-6 bg-gray-100 dark:bg-gray-800 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">Facturas</h1>
            <div className="my-4">
                <select onChange={handleSearchTypeChange} value={searchType} className="p-2 border border-gray-300 rounded-md mr-4 text-black">
                    <option value="invoiceNumber">Número de Factura</option>
                    <option value="clientName">Nombre del Cliente</option>
                    <option value="saleDate">Fecha de Venta</option>
                </select>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Buscar..."
                    className="p-2 border border-gray-300 rounded-md text-black"
                />
            </div>
            {loading ? (
                <p className="text-gray-800 dark:text-gray-200">Cargando...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <div className="space-y-6">
                    {filteredInvoices.length ? (
                        filteredInvoices.map(invoice => (
                            <div key={invoice.id} className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg">
                                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Factura #{invoice.id}</h2>
                                <p className="text-gray-600 dark:text-gray-300">Fecha de Venta: {new Date(invoice.dateSale).toLocaleString()}</p>
                                <button 
                                    onClick={() => handleViewInvoice(invoice)} 
                                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                                    Ver Factura
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-800 dark:text-gray-200">No se encontraron facturas...</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Facturas;
