"use client";

import React, { useEffect } from "react";
import { useRouter } from 'next/navigation';
import Navbar from "../../Components/navbar";
import { useUsers } from "../../hooks/useUsers";
import { Datatable } from "../../Components/specific/users/Datatable";
import withAuth from '@/Components/withAuth';
import { getRole } from '@/utils/auth';

const Page = () => {
  const { users, loading, fetchUsers } = useUsers();
  const router = useRouter();

  useEffect(() => {
    fetchUsers();
    const role = getRole();
    if (role !== 'admin') {
      // Redirect to the main page if the user is not an admin
      router.push('/main');
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div className="w-1/2 mx-auto mt-4">
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <Datatable users={users} fetchUsers={fetchUsers} />
        )}
      </div>
    </div>
  );
};

export default withAuth(Page);
