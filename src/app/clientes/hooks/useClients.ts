"use clients";

import { useEffect, useState } from "react";
import { IClients } from "../types/IClients";

export function useClients() {
  const [clients, setClients] = useState<IClients[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    setLoading(true);
    try {
      const response = await fetch("../data/clients.json", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        setClients(jsonResponse);
      } else {
        console.error("Error fetching clients data");
      }
    } catch (error) {
      console.error("Error fetching clients data", error);
    }
  };

  const createClient = async (client: Partial<IClients>) => {
    const response = await fetch(`http://localhost:3000/clients`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(client),
    });

    if (response.ok) {
      fetchClients();
    }
  };

  const deleteClient = async (id: number) => {
    const response = await fetch(`http://localhost:3000/clients/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      fetchClients();
    }
  };
  const updateClient = async (client: Partial<IClients>) => {
    const response = await fetch("http://localhost:3000/clients/" + client.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...client, id: undefined }),
    });

    if (response.ok) {
      await fetchClients();
    }
  };

  return {
    clients,
    deleteClient,
    fetchClients,
    updateClient,
    createClient,
  };
}
