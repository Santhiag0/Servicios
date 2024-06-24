"use client"

import React, { useEffect, useState } from 'react';
import useInvoiceManager from '../hooks/useInvoiceManager';
import FacturaDetalle from '../app/PDF/FacturaDetalle';

const Facturas = () => {
    const { invoices, loading, error, fetchInvoices } = useInvoiceManager();
    const [selectedInvoice, setSelectedInvoice] = useState(null);

    useEffect(() => {
        fetchInvoices();
    }, []);

    const handleViewInvoice = (invoice) => {
        setSelectedInvoice(invoice);
    };

    const handleBack = () => {
        setSelectedInvoice(null);
    };

    if (selectedInvoice) {
        return <FacturaDetalle invoice={selectedInvoice} onBack={handleBack} />;
    }

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
                            <button 
                                onClick={() => handleViewInvoice(invoice)} 
                                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                                Ver Factura
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Facturas;
