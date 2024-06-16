"use client";

import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const ClientModal = ({ open, handleClose, title, onSubmit, currentClient }) => {
  const [client, setClient] = useState({
    firstName: "",
    secondName: "",
    lastName: "",
    secondLastName: "",
    email: "",
    address: "",
    phone: "",
    dniType: "cedula",
    dni: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (currentClient) {
      setClient(currentClient);
    }
  }, [currentClient]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setClient((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!client.dni) newErrors.dni = "La cédula es requerida";
    if (!client.firstName) newErrors.firstName = "El nombre es requerido";
    if (!client.lastName) newErrors.lastName = "El apellido es requerido";
    if (!client.email) newErrors.email = "El email es requerido";
    if (!client.phone) newErrors.phone = "El teléfono es requerido";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const clientToSubmit = { ...client };
    if (clientToSubmit.secondName === "") clientToSubmit.secondName = null;
    if (clientToSubmit.secondLastName === "") clientToSubmit.secondLastName = null;

    onSubmit(clientToSubmit);
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-4xl bg-[#6f859b] rounded-lg shadow-lg p-6">
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          className="text-white mb-4"
        >
          {title}
        </Typography>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <select
              name="dniType"
              value={client.dniType}
              onChange={handleChange}
              className="bg-white text-black w-full p-2 rounded-lg"
              disabled={!!currentClient}
            >
              <option value="cedula">Cedula</option>
              <option value="pasaporte">Pasaporte</option>
              <option value="RUC">RUC</option>
            </select>
            <TextField
              label="Número de Documento"
              name="dni"
              value={client.dni}
              onChange={handleChange}
              fullWidth
              error={!!errors.dni}
              helperText={errors.dni}
              InputLabelProps={{
                className: "text-gray-500",
              }}
              InputProps={{
                className: "bg-white",
              }}
              disabled={!!currentClient}
            />
            <TextField
              label="Nombre"
              name="firstName"
              value={client.firstName}
              onChange={handleChange}
              fullWidth
              error={!!errors.firstName}
              helperText={errors.firstName}
              InputLabelProps={{
                className: "text-gray-500",
              }}
              InputProps={{
                className: "bg-white",
              }}
            />
            <TextField
              label="Segundo Nombre"
              name="secondName"
              value={client.secondName}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{
                className: "text-gray-500",
              }}
              InputProps={{
                className: "bg-white",
              }}
            />
            <TextField
              label="Apellido"
              name="lastName"
              value={client.lastName}
              onChange={handleChange}
              fullWidth
              error={!!errors.lastName}
              helperText={errors.lastName}
              InputLabelProps={{
                className: "text-gray-500",
              }}
              InputProps={{
                className: "bg-white",
              }}
            />
            <TextField
              label="Segundo Apellido"
              name="secondLastName"
              value={client.secondLastName}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{
                className: "text-gray-500",
              }}
              InputProps={{
                className: "bg-white",
              }}
            />
            <TextField
              label="Email"
              name="email"
              value={client.email}
              onChange={handleChange}
              fullWidth
              error={!!errors.email}
              helperText={errors.email}
              InputLabelProps={{
                className: "text-gray-500",
              }}
              InputProps={{
                className: "bg-white",
              }}
            />
            <TextField
              label="Dirección"
              name="address"
              value={client.address}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{
                className: "text-gray-500",
              }}
              InputProps={{
                className: "bg-white",
              }}
            />
            <TextField
              label="Teléfono"
              name="phone"
              value={client.phone}
              onChange={handleChange}
              fullWidth
              error={!!errors.phone}
              helperText={errors.phone}
              InputLabelProps={{
                className: "text-gray-500",
              }}
              InputProps={{
                className: "bg-white",
              }}
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

export default ClientModal;
