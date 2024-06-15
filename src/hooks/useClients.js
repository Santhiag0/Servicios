import { useEffect, useState } from "react";

export function useClients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://facturacion-servicios.onrender.com/api/client",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYWRtaW4iLCJzdWIiOiJhZG1pbiIsImlhdCI6MTcxODM4NDMwNCwiZXhwIjoxNzE4NDIwMzA0fQ.u6OgeGtGEoGmZQ9GIKEzTlRzmDXe2xfIvL8FHpHElOM",
          },
        }
      );

      if (response.ok) {
        const jsonResponse = await response.json();
        setClients(jsonResponse);
      } else {
        console.error("Error fetching clients data");
      }
    } catch (error) {
      console.error("Error fetching clients data", error);
    } finally {
      setLoading(false);
    }
  };

  const addClient = async (client) => {
    try {
      const response = await fetch(
        "https://facturacion-servicios.onrender.com/api/client",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYWRtaW4iLCJzdWIiOiJhZG1pbiIsImlhdCI6MTcxODM4NDMwNCwiZXhwIjoxNzE4NDIwMzA0fQ.u6OgeGtGEoGmZQ9GIKEzTlRzmDXe2xfIvL8FHpHElOM",
          },
          body: JSON.stringify(client),
        }
      );

      if (response.ok) {
        fetchClients();
      }
    } catch (error) {
      console.error("Error creating client", error);
    }
  };

  const editClient = async (client) => {
    try {
      const response = await fetch(
        `https://facturacion-servicios.onrender.com/api/client/${client.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYWRtaW4iLCJzdWIiOiJhZG1pbiIsImlhdCI6MTcxODM4NDMwNCwiZXhwIjoxNzE4NDIwMzA0fQ.u6OgeGtGEoGmZQ9GIKEzTlRzmDXe2xfIvL8FHpHElOM",
          },
          body: JSON.stringify(client),
        }
      );

      if (response.ok) {
        fetchClients();
      }
    } catch (error) {
      console.error("Error editing client", error);
    }
  };

  const deleteClient = async (id) => {
    try {
      console.log(id);
      const response = await fetch(
        `https://facturacion-servicios.onrender.com/api/client/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYWRtaW4iLCJzdWIiOiJhZG1pbiIsImlhdCI6MTcxODM4NDMwNCwiZXhwIjoxNzE4NDIwMzA0fQ.u6OgeGtGEoGmZQ9GIKEzTlRzmDXe2xfIvL8FHpHElOM",
          },
        }
      );

      if (response.ok) {
        fetchClients();
      }
    } catch (error) {
      console.error("Error deleting client", error);
    }
  };

  return {
    clients,
    loading,
    fetchClients,
    addClient,
    editClient,
    deleteClient,
  };
}
