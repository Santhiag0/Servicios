import { useState } from "react";
import { getToken } from '@/utils/auth';


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
      const token = getToken();

      const response = await fetch(
        "https://facturacion-servicios.onrender.com/auth",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: 
            `Bearer ${token}`,

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
      throw error;
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
     
      const token = getToken();
      const response = await fetch(
        "https://facturacion-servicios.onrender.com/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: 
            `Bearer ${token}`

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
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const editUser = async (user) => {
    setLoading(true);

    try {
      const token = getToken();
      const response = await fetch("../data/users.json", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: 
          `Bearer ${token}`,
        },
        body: JSON.stringify(user),
      });


      if (response.ok) {
        await fetchUsers();
        console.log("Usuario editado correctamente");
      } else {
        throw new Error("Error al editar el usuario");
      }
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (username) => {
    setLoading(true);

    try {
      const token = getToken();

      const response = await fetch(
        `https://facturacion-servicios.onrender.com/auth/${username}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: 
            `Bearer ${token}`,

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
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { users, loading, fetchUsers, addUser, editUser, deleteUser };
};
