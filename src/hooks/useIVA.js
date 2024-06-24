import { useState } from "react";
import { getToken } from '@/utils/auth';

export function useIVA() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateIVA = async (iva) => {
    setLoading(true);
    setError(null);

    try {
      const token = getToken();
      const response = await fetch("https://facturacion-servicios.onrender.com/api/productos/iva", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ id: iva })
      });

      if (!response.ok) {
        throw new Error('Failed to update IVA');
      }

      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return { updateIVA, loading, error };
}
