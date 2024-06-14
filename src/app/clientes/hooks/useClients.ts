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
      const response = await fetch("https://facturacion-servicios.onrender.com/api/client", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYWRtaW4iLCJzdWIiOiJhZG1pbiIsImlhdCI6MTcxODM4NDMwNCwiZXhwIjoxNzE4NDIwMzA0fQ.u6OgeGtGEoGmZQ9GIKEzTlRzmDXe2xfIvL8FHpHElOM"
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
    const response = await fetch(`https://facturacion-servicios.onrender.com/api/client`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYWRtaW4iLCJzdWIiOiJhZG1pbiIsImlhdCI6MTcxODM4NDMwNCwiZXhwIjoxNzE4NDIwMzA0fQ.u6OgeGtGEoGmZQ9GIKEzTlRzmDXe2xfIvL8FHpHElOM"
      },
      body: JSON.stringify(client),
    });

    if (response.ok) {
      fetchClients();
    }
  };

  const deleteClient = async (id: number) => {
    const response = await fetch(`https://facturacion-servicios.onrender.com/api/client/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYWRtaW4iLCJzdWIiOiJhZG1pbiIsImlhdCI6MTcxODM4NDMwNCwiZXhwIjoxNzE4NDIwMzA0fQ.u6OgeGtGEoGmZQ9GIKEzTlRzmDXe2xfIvL8FHpHElOM"
      },
    });

    if (response.ok) {
      fetchClients();
    }
  };
  const updateClient = async (client: Partial<IClients>) => {
    const response = await fetch("https://facturacion-servicios.onrender.com/api/client/" + client.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYWRtaW4iLCJzdWIiOiJhZG1pbiIsImlhdCI6MTcxODM4NDMwNCwiZXhwIjoxNzE4NDIwMzA0fQ.u6OgeGtGEoGmZQ9GIKEzTlRzmDXe2xfIvL8FHpHElOM"
      },
      body: JSON.stringify({ ...client, id: undefined }),
    });

    
    if (response.ok) {
      await fetchClients();
    }
  };

  // Get client by ID
  const getClientByID = async (id: number) => {
    const response = await fetch("https://facturacion-servicios.onrender.com/api/client/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : "Bearer "
      },
    });
    if (response.ok) {
      return await response.json();
    }
    return null;
  };


  // Get client by Name
  const getClientByEmail = async (email: string) => {
    const response = await fetch("https://facturacion-servicios.onrender.com/api/client/" + email, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : "Bearer "
      },
    });
    if (response.ok) {
      return await response.json();
    }
    return null;
  };

  //Get client by phone
  const getClientByPhone = async (phone: string) => {
    const response = await fetch("https://facturacion-servicios.onrender.com/api/client/" + phone, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : "Bearer "
      },
    });
    if (response.ok) {
      return await response.json();
    }
    return null;
  };

  
  return {
    clients,
    deleteClient,
    fetchClients,
    updateClient,
    createClient,
  };
}
