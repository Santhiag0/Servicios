"use client";

import React, { useEffect } from "react";
import Navbar from "@/Components/navbar";
import { useUsers } from "@/hooks/useUsers";
import { Datatable } from "@/Components/specific/users/Datatable";

const Page = () => {
  const { users, loading, fetchUsers } = useUsers();

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="w-1/2 mx-auto mt-4">
        {loading ? <p>Cargando...</p> : <Datatable users={users} />}
      </div>
    </div>
  );
};

export default Page;
