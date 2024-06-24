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

  const validateEcuadorianId = (dni) => {
    if (!/^([0-9]{10})$/.test(dni)) {
      return false;
    }

    const digits = dni.split('').map(Number);
    const provinceCode = parseInt(digits[0] + digits[1], 10);
    const thirdDigit = digits[2];

    if (provinceCode < 1 || provinceCode > 24 || thirdDigit > 6) {
      return false;
    }

    const coefficients = [2, 1, 2, 1, 2, 1, 2, 1, 2];
    const checkDigit = digits.pop();

    let total = 0;

    for (let i = 0; i < digits.length; i++) {
      let product = digits[i] * coefficients[i];
      if (product >= 10) product -= 9;
      total += product;
    }

    const calculatedCheckDigit = (total % 10 === 0) ? 0 : 10 - (total % 10);

    return checkDigit === calculatedCheckDigit;
  };

  const validateRUC = (ruc) => {
    if (!/^\d{13}$/.test(ruc)) {
      return false;
    }

    const cedula = ruc.substring(0, 10);
    if (!validateEcuadorianId(cedula)) {
      return false;
    }

    const suffix = ruc.substring(10);
    return suffix === "001";
  };

  const validatePassport = (passport) => {
    return /^[a-zA-Z0-9]{6,9}$/.test(passport);
  };

  const validate = () => {
    const newErrors = {};

    // Validación de cédula, pasaporte o RUC
    if (!client.dni) {
      newErrors.dni = "El documento es requerido";
    } else if (client.dniType === "cedula" && !validateEcuadorianId(client.dni)) {
      newErrors.dni = "No es una cédula ecuatoriana válida";
    } else if (client.dniType === "pasaporte" && !validatePassport(client.dni)) {
      newErrors.dni = "No es un pasaporte válido";
    } else if (client.dniType === "RUC" && !validateRUC(client.dni)) {
      newErrors.dni = "No es un RUC válido";
    }

    // Validación de campos requeridos
    if (!client.firstName) newErrors.firstName = "El nombre es requerido";
    if (!client.lastName) newErrors.lastName = "El apellido es requerido";
    if (!client.email) newErrors.email = "El email es requerido";
    if (!client.phone) {
      newErrors.phone = "El teléfono es requerido";
    } else if (!/^\d{10}$/.test(client.phone)) {
      newErrors.phone = "El teléfono debe tener 10 dígitos";
    }

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
              <option value="cedula">Cédula</option>
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
