"use client";

import React, { useState } from "react";
import Navbar from "../../Components/navbar";
import Table from "./componentes/Table";
import { useClients } from "../clientes/hooks/useClients";
import ClientModal from "./componentes/Modal";

const PageClient = () => {
  const { clients = [], deleteClient, createClient, updateClient } = useClients();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(undefined);
  const [searchTerm, setSearchTerm] = useState("");

  const onClose = () => {
    setIsOpen(false);
    setSelectedClient(undefined);
  };

  const onEdit = (client) => {
    setSelectedClient(client);
    setIsOpen(true);
  };

  const filteredClients = clients.filter((client) =>
    `${client.name} ${client.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div>
        <Navbar />
        <h1>Hello, World! CLIENTES</h1>
      </div>

      {isOpen && (
        <ClientModal
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={selectedClient ? updateClient : createClient}
          currentClient={selectedClient}
        />
      )}
      <div className="flex justify-normal w-screen">
        <button
          className="mt-5 w-2/12 ml-10 bg-purple-500 hover:bg-purple-900 text-white py-5 px-4 rounded text-xl font-bold"
          onClick={() => setIsOpen(true)}
        >
          Agregar Cliente
        </button>
      </div>
      <div className="flex justify-center mt-5">
        <input
          type="text"
          placeholder="Buscar cliente"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded py-2 px-4 text-black"
        />
      </div>
      <div className="flex py-8 justify-center items-center">
        {clients && (
          <Table clients={filteredClients} onDelete={deleteClient} onEdit={onEdit} />
        )}
      </div>
    </>
  );
};

export default PageClient;
