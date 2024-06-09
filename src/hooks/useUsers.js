import { useState } from "react";

function User({ id, username, password, id_role, status }) {
  this.id = id;
  this.username = username;
  this.password = password;
  this.id_role = id_role;
  this.status = status;
}

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);

    try {
      const response = await fetch("../data/users.json", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        const usersArray = data.users;
        const formtedUsers = usersArray.map((user) => new User(user));

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
      const response = await fetch("../data/users.json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        fetchUsers();
        console.log("Usuario agregado correctamente");
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

  const deleteUser = async (id) => {
    setLoading(true);

    try {
      const response = await fetch(`../data/users/${id}.json`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        fetchUsers();
        console.log("Usuario eliminado correctamente");
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
