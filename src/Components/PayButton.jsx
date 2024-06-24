import React from 'react';
import useSalesManager from '../hooks/useSalesManager';

const PayButton = ({ addedProducts, clientDni, onSuccess }) => {
    const { loading, error, createSale, updateProductStock } = useSalesManager();

    const handlePay = async () => {
        const saleDetails = addedProducts.map(product => ({
            productId: product.id,
            quantity: product.quantity,
        }));

        const saleData = {
            clientDni,
            saleDetails,
        };

        try {
            await createSale(saleData);

            for (let product of addedProducts) {
                const newStock = product.stock - product.quantity;
                await updateProductStock(product.id, newStock);
            }

            onSuccess();
        } catch (err) {
            console.error("Error during payment process:", err);
        }
    };

    return (
        <div>
            <button 
                onClick={handlePay}
                className="mt-4 w-full bg-green-500 text-white p-2 rounded-md"
                disabled={loading}
            >
                {loading ? 'Procesando...' : 'PAGAR'}
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
    );
};

export default PayButton;
