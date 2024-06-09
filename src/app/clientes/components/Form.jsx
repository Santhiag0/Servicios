"use client";

import { useState } from "react";
import useClients  from "../hooks/useClients";

export default function Form() {
  const { createClient } = useClients();
  const [client, setClient] = useState({
    dni: "",
    name: "",
    lastName: "",
    address: "",
    phone: "",
  });

  const handleChange = (e) => {
    setClient({
      ...client,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="items-center justify-center">
      <form
        className="bg-gray-500 p-4 rounded-md w-4/12 items-center justify-center"
        onSubmit={(e) => {
          e.preventDefault();
          createClient(client);
        }}
      >
        <div className="flex bg-transparent">
          <label className=" w-4/12" htmlFor="dni">
            Cedula:
          </label>
          <input
            className="text-white bg-transparent rounded-md border"
            type="text"
            name="dni"
            value={client.dni}
            onChange={handleChange}
          />
        </div>
        <div className="flex pt-5">
          <label className="w-4/12" htmlFor="name">
            Name:
          </label>
          <input
            className="text-white bg-transparent rounded-md border"
            type="text"
            name="name"
            value={client.name}
            onChange={handleChange}
          />
        </div>
        <div className="flex pt-5">
          <label className="w-4/12" htmlFor="lastName">
            LastName:
          </label>
          <input
            className="text-white bg-transparent rounded-md border"
            type="text"
            name="lastName"
            value={client.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="flex pt-5">
          <label className="w-4/12" htmlFor="address">
            Address:
          </label>
          <input
            className="text-white bg-transparent rounded-md border"
            type="text"
            name="address"
            value={client.address}
            onChange={handleChange}
          />
        </div>

        <div className="flex pt-5">
          <label className="w-4/12" htmlFor="phone">
            Phone:
          </label>
          <input
            className="text-white bg-transparent rounded-md border"
            type="text"
            name="phone"
            value={client.phone}
            onChange={handleChange}
          />
        </div>

        <div className="flex pt-5 items-center justify-center">
          <button
            className="w-4/12 bg-blue-900 rounded-3xl border p-2 text-white"
            type="submit"
          >
            Agregar
          </button>
        </div>
      </form>
    </div>
  );
}
