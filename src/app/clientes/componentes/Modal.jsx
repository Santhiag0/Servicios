"use client";

import { useEffect, useState } from "react";

export default function StudentModal({
  isOpen,
  onClose,
  onSubmit,
  currentClient,
}) {
  const [client, setClient] = useState(
    currentClient || {
      dni: "",
      firstName: "",
      lastName: "",
      address: "",
      phone: "",
      email: "",
      dniType: "",
    }
  );

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (currentClient) {
      setClient(currentClient);
    } else {
      setClient({
        dni: "",
        firstName: "",
        lastName: "",
        address: "",
        phone: "",
        email: "",
        dniType: "",
      });
    }
  }, [currentClient]);

  const handleChange = (e) => {
    setClient({
      ...client,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!client.dni) newErrors.dni = "Cedula es requerida";
    if (!client.firstName) newErrors.name = "Nombre es requerido";
    if (!client.lastName) newErrors.lastName = "Apellido es requerido";
    if (!client.address) newErrors.address = "Direccion es requerida";
    if (!client.phone) newErrors.phone = "Telefono es requerido";
    if (!client.email) newErrors.email = "Email es requerido";
    if (!client.dniType) newErrors.dniType = "DniType es requerido";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(client);
      onClose();
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="relative bg-white rounded-lg p-8 max-w-md">
              <button
                onClick={onClose}
                className="absolute top-0 right-0 p-2 m-2 text-gray-600 hover:text-gray-800"
              >
                X
              </button>
              <h2 className="text-xl font-semibold mb-4 text-purple-950">
                {currentClient ? "Editar Cliente" : "Agregar Cliente"}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4 text-purple-950">
                  <label htmlFor="dni" className="block text-gray-700">
                    Tipo de Documento:
                  </label>
                  <select
                    name="dniType"
                    value={client.dniType || ""}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  >
                    <option value="">Seleccione...</option>
                    <option value="Cedula">Cedula</option>
                    <option value="Pasaporte">Pasaporte</option>
                    <option value="Ruc">Ruc</option>
                  </select>
                  {errors.dniType && (
                    <p className="text-red-500 text-xs mt-1">{errors.dniType}</p>
                  )}
                </div>
                <div className="mb-4 text-purple-950">
                  <label htmlFor="dni" className="block text-gray-700">
                    {client.dniType === "Ruc" ? "RUC" : "Cedula"}:
                  </label>
                  <input
                    type="text"
                    name="dni"
                    value={client.dni || ""}
                    onChange={handleChange}
                    readOnly={!!currentClient}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  {errors.dni && (
                    <p className="text-red-500 text-xs mt-1">{errors.dni}</p>
                  )}
                </div>
                <div className="mb-4 text-purple-950">
                  <label htmlFor="name" className="block text-gray-700">
                    Nombre:
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={client.firstName || ""}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>
                <div className="mb-4 text-purple-950">
                  <label htmlFor="lastName" className="block text-gray-700">
                    Apellido:
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={client.lastName || ""}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.lastName}
                    </p>
                  )}
                </div>
                <div className="mb-4 text-purple-950">
                  <label htmlFor="address" className="block text-gray-700">
                    Direccion:
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={client.address || ""}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.address}
                    </p>
                  )}
                </div>
                <div className="mb-4 text-purple-950">
                  <label htmlFor="phone" className="block text-gray-700">
                    Telefono:
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={client.phone || ""}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>
                <div className="mb-4 text-purple-950">
                  <label htmlFor="email" className="block text-gray-700">
                    Email:
                  </label>
                  <input
                    type="text"
                    name="email"
                    value={client.email || ""}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
                <div className="flex">
                  <button
                    className="btn bg-indigo-500 w-6/12 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded"
                    type="submit"
                  >
                    {currentClient ? "Editar" : "Agregar"}
                  </button>
                  <button
                    className="btn bg-red-600 w-7/12 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded"
                    type="button"
                    onClick={onClose}
                  >
                    CANCELAR
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
