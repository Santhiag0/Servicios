import { useState } from "react";

function User({ id, username, password, role, status }) {
  this.id = id;
  this.username = username;
  this.password = password;
  this.role = role;
  this.status = status;
}

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        "https://facturacion-servicios.onrender.com/auth",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYWRtaW4iLCJzdWIiOiJhZG1pbiIsImlhdCI6MTcxODYzNjYwOCwiZXhwIjoxNzE4NjcyNjA4fQ.0ptjMx1OMvmNMJuJD-ns1zb8HQYQSkRZrzPnjddSchY",            
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const formtedUsers = data;
        setUsers(formtedUsers);
      } else {
        throw new Error("Error al cargar los usuarios");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const addUser = async (user) => {
    setLoading(true);

    try {
      const userBody = {
        username: user.username,
        password: user.password,
        role: user.role === 1 ? "cajero" : "admin",
      };

      const response = await fetch(
        "https://facturacion-servicios.onrender.com/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYWRtaW4iLCJzdWIiOiJhZG1pbiIsImlhdCI6MTcxODYzNjYwOCwiZXhwIjoxNzE4NjcyNjA4fQ.0ptjMx1OMvmNMJuJD-ns1zb8HQYQSkRZrzPnjddSchY",         
          },
          body: JSON.stringify(userBody),
        }
      );

      if (response.ok) {
        await fetchUsers();
      } else {
        throw new Error("Error al agregar el usuario");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const editUser = async (user) => {
    setLoading(true);

    try {
      const response = await fetch("../data/users.json", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYWRtaW4iLCJzdWIiOiJhZG1pbiIsImlhdCI6MTcxODYzNjYwOCwiZXhwIjoxNzE4NjcyNjA4fQ.0ptjMx1OMvmNMJuJD-ns1zb8HQYQSkRZrzPnjddSchY",       
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        fetchUsers();
        console.log("Usuario editado correctamente");
      } else {
        throw new Error("Error al editar el usuario");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (username) => {
    setLoading(true);

    try {
      const response = await fetch(
        `https://facturacion-servicios.onrender.com/auth/${username}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYWRtaW4iLCJzdWIiOiJhZG1pbiIsImlhdCI6MTcxODYzNjYwOCwiZXhwIjoxNzE4NjcyNjA4fQ.0ptjMx1OMvmNMJuJD-ns1zb8HQYQSkRZrzPnjddSchY",         
          },
        }
      );

      if (response.ok) {
        await fetchUsers();
      } else {
        throw new Error("Error al eliminar el usuario");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { users, loading, fetchUsers, addUser, editUser, deleteUser };
};
