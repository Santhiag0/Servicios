"use client";

import { useEffect, useState } from "react";

export default function StudentModal({
  isOpen,
  onClose,
  onSubmit,
  currentStudent,
}) {
  const [student, setStudent] = useState(
    currentStudent || {
      dni: "",
      name: "",
      lastName: "",
      address: "",
      phone: "",
    }
  );

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (currentStudent) {
      setStudent(currentStudent);
    } else {
      setStudent({
        dni: "",
        name: "",
        lastName: "",
        address: "",
        phone: "",
      });
    }
  }, [currentStudent]);

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!student.dni) newErrors.dni = "Cedula es requerida";
    if (!student.name) newErrors.name = "Nombre es requerido";
    if (!student.lastName) newErrors.lastName = "Apellido es requerido";
    if (!student.address) newErrors.address = "Direccion es requerida";
    if (!student.phone) newErrors.phone = "Telefono es requerido";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(student);
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
                {currentStudent ? "Editar Estudiante" : "Agregar Estudiante"}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4 text-purple-950">
                  <label htmlFor="dni" className="block text-gray-700">
                    Cedula:
                  </label>
                  <input
                    type="text"
                    name="dni"
                    value={student.dni || ""}
                    onChange={handleChange}
                    readOnly={!!currentStudent}
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
                    value={student.name || ""}
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
                    value={student.lastName || ""}
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
                    value={student.address || ""}
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
                    value={student.phone || ""}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>
                <div className="flex">
                  <button
                    className="btn bg-indigo-500 w-6/12 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded"
                    type="submit"
                  >
                    {currentStudent ? "Editar" : "Agregar"}
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
