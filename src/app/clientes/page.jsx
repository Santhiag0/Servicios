"use client";

import React, { useEffect } from "react";
import Navbar from "../../Components/navbar";
import { useClients } from "../../hooks/useClients";
import { Datatable } from "../../Components/specific/clients/Datatable";
import withAuth from '@/Components/withAuth';


const PageClient = () => {
  const { clients, loading, fetchClients } = useClients();

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="w-3/4 mx-auto mt-4">
        {loading ? <p>Cargando...</p> : <Datatable clients={clients} />}
      </div>
    </div>
  );
};

export default withAuth(PageClient);
