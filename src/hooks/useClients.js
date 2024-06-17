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
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYWRtaW4iLCJzdWIiOiJhZG1pbiIsImlhdCI6MTcxODU4ODE3OSwiZXhwIjoxNzE4NjI0MTc5fQ.9_jZHAk7Xjfo3CMZusWlwkLFlDEswPmDO9HWlwyI_GA",
          },
        }
      );

      if (response.ok) {
        const jsonResponse = await response.json();
        const formtedClients = jsonResponse;
        setClients(formtedClients);
      } else {
        throw new Error("Error fetching clients data");
      }
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const addClient = async (client) => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://facturacion-servicios.onrender.com/api/client",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYWRtaW4iLCJzdWIiOiJhZG1pbiIsImlhdCI6MTcxODU4ODE3OSwiZXhwIjoxNzE4NjI0MTc5fQ.9_jZHAk7Xjfo3CMZusWlwkLFlDEswPmDO9HWlwyI_GA",
          },
          body: JSON.stringify(client),
        }
      );

      if (response.ok) {
        await fetchClients();
      } else {
        throw new Error("Error al agregar un cliente");
      }
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const editClient = async (client) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://facturacion-servicios.onrender.com/api/client/${client.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYWRtaW4iLCJzdWIiOiJhZG1pbiIsImlhdCI6MTcxODU4ODE3OSwiZXhwIjoxNzE4NjI0MTc5fQ.9_jZHAk7Xjfo3CMZusWlwkLFlDEswPmDO9HWlwyI_GA",
          },
          body: JSON.stringify(client),
        }
      );

      if (response.ok) {
        await fetchClients();
        console.log("Cliente editado correctamente");
      } else {
        throw new Error("Error al editar el cliente");
      }
    } catch (error) {
      console.error (error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteClient = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://facturacion-servicios.onrender.com/api/client/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYWRtaW4iLCJzdWIiOiJhZG1pbiIsImlhdCI6MTcxODU4ODE3OSwiZXhwIjoxNzE4NjI0MTc5fQ.9_jZHAk7Xjfo3CMZusWlwkLFlDEswPmDO9HWlwyI_GA",
          },
        }
      );

      if (response.ok) {
        await fetchClients();
      } else {
        throw new Error("Error al eliminar el cliente");
      }
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
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
