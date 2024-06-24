import { useState } from 'react';

const useInvoiceManager = () => {
    const [client, setClient] = useState(null);
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchClientByDni = async (dni) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`https://facturacion-servicios.onrender.com/api/client/dni/${dni}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYWRtaW4iLCJzdWIiOiJhZG1pbiIsImlhdCI6MTcxOTE4MDA5MSwiZXhwIjoxNzE5MjE2MDkxfQ.q15jKQUikeuqATseVkGYLb3vkflwIuWT3m_0sXdJbo0",

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
            const response = await fetch('https://facturacion-servicios.onrender.com/api/sales', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYWRtaW4iLCJzdWIiOiJhZG1pbiIsImlhdCI6MTcxOTE4MDA5MSwiZXhwIjoxNzE5MjE2MDkxfQ.q15jKQUikeuqATseVkGYLb3vkflwIuWT3m_0sXdJbo0",
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
