import { useState } from 'react';
import { getToken } from '@/utils/auth';


const useInvoiceManager = () => {
    const [client, setClient] = useState(null);
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchClientByDni = async (dni) => {
        setLoading(true);
        setError(null);
        try {
       
            const token = getToken();
            const response = await fetch(`https://facturacion-servicios.onrender.com/api/client/dni/${dni}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 
                    `Bearer ${token}`,

                }
            });
            if (!response.ok) {
                throw new Error('Cliente no encontrado');
            }
            const data = await response.json();
            if (!data.status) {
                throw new Error('Cliente inactivo');
            }
            setClient(data);
        } catch (error) {
            setClient(null);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchInvoices = async () => {
        setLoading(true);
        setError(null);
        try {
            const token = getToken();
            const response = await fetch('https://facturacion-servicios.onrender.com/api/sales', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization:
                    `Bearer ${token}`,  
                }
            });
            if (!response.ok) {
                throw new Error('Error al obtener las facturas');
            }
            const data = await response.json();
            setInvoices(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return {
        client,
        invoices,
        loading,
        error,
        fetchClientByDni,
        fetchInvoices,
    };
};

export default useInvoiceManager;
