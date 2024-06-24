"use client";

import React, { useState, useEffect } from "react";
import { useIVA } from "../hooks/useIVA";

const IVAButton = () => {
  const [comboBoxVisible, setComboBoxVisible] = useState(false);
  const { updateIVA, loading, error } = useIVA();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleOpenComboBox = () => {
    setComboBoxVisible(true);
  };

  const handleSelectChange = (event) => {
    const value = parseInt(event.target.value, 10);
    updateIVA(value);
    setComboBoxVisible(false);
  };

  if (!mounted) {
    return null; // No renderizar nada en el servidor
  }

  return (
    <div>
      <button
        onClick={handleOpenComboBox}
        className="mb-4 p-2 bg-green-500 text-white rounded"
        disabled={loading}
      >
        {loading ? "Actualizando..." : "Editar IVA"}
      </button>
      {comboBoxVisible && (
        <select
          onChange={handleSelectChange}
          className="p-2 border rounded mb-4"
        >
          <option value="">Seleccione IVA</option>
          <option value="1">IVA 12%</option>
          <option value="2">IVA 15%</option>
          <option value="3">IVA 18%</option>
        </select>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default IVAButton;
