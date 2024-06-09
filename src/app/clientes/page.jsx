"use client";

import React from "react";
import Navbar from "../../Components/navbar";
import { useState } from "react";
import Table from "../clientes/components/Table";
import { useClients } from "../clientes/hooks/useClients";
import ClientModal from "../clientes/components/Modal";

const PageClient = () => {
  const { clients, deleteClient, createClient, updateClient } = useClients();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(undefined);

  const onClose = () => {
    setIsOpen(false);
    setSelectedClient(undefined);
  };

  const onEdit = (client) => {
    setSelectedClient(client);
    setIsOpen(true);
  };

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
          currentStudent={selectedClient}
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

      <div className="flex py-8 justify-center items-center">
        {clients && (
          <Table clients={clients} onDelete={deleteClient} onEdit={onEdit} />
        )}
      </div>
    </>
  );
};

export default PageClient;
