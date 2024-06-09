"use client";

import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const CustomModal = ({ open, handleClose, title, onSubmit, currentUser }) => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    id_role: "",
    status: true,
  });

  useEffect(() => {
    if (currentUser) {
      setUser(currentUser);
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUser((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(user);
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 bg-[#6f859b] rounded-lg shadow-lg p-6">
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          className="text-white mb-4"
        >
          {title}
        </Typography>
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            label="Nombre de Usuario"
            name="username"
            value={user.username}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{
              className: "text-white",
            }}
            InputProps={{
              className: "bg-white",
            }}
          />
          <TextField
            label="Contraseña"
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{
              className: "text-white",
            }}
            InputProps={{
              className: "bg-white",
            }}
          />
          <TextField
            label="Rol"
            name="id_role"
            value={user.id_role}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{
              className: "text-white",
            }}
            InputProps={{
              className: "bg-white",
            }}
          />
          <div className="flex items-center space-x-2">
            <label htmlFor="status" className="text-white">
              Estado
            </label>
            <input
              type="checkbox"
              name="status"
              checked={user.status}
              onChange={handleChange}
              className="form-checkbox text-[#6f859b]"
            />
          </div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className="bg-[#020201] text-[#c2c5cb]"
          >
            Submit
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default CustomModal;
