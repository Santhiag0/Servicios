import { useState } from 'react';
import { getToken } from '@/utils/auth';

const useSalesManager = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const createSale = async (saleData) => {
        setLoading(true);
        setError(null);
        try {
            const token = getToken();
            const response = await fetch('https://facturacion-servicios.onrender.com/api/sales', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization:
                    `Bearer ${token}`,},

                body: JSON.stringify(saleData),
            });

            if (!response.ok) {
                throw new Error('Error al crear la venta');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const updateProductStock = async (productId, newStock) => {
        setLoading(true);
        setError(null);
        try {
            if (newStock === 0) {
                const token = getToken();

                const deactivateResponse = await fetch(`https://facturacion-servicios.onrender.com/api/productos/activation/${productId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 
                        `Bearer ${token}`,

                    },
                });

                if (!deactivateResponse.ok) {
                    throw new Error('Error al desactivar el producto');
                }
            }

            const token = getToken();
            const response = await fetch(`https://facturacion-servicios.onrender.com/api/productos/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization:
                    `Bearer ${token}`,

                },
                body: JSON.stringify({ stock: newStock }),
            });

            if (!response.ok) {
                throw new Error('Error al actualizar el stock del producto');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        createSale,
        updateProductStock,
    };
};

export default useSalesManager;
