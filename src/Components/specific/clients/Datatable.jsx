"use client";

import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/system";
import { CheckCircleOutline, CancelOutlined } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import ClientModal from "./ClientModal";
import { useClients } from "../../../hooks/useClients";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

const DataGridStyled = styled(DataGrid)({
  "& .MuiDataGrid-columnHeaders": {
    backgroundColor: "#f5f5f5",
  },
  "& .MuiDataGrid-cell": {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  "& .MuiDataGrid-footerContainer": {
    backgroundColor: "#fff",
  },
  "& .MuiDataGrid-filler": {
    backgroundColor: "#fff",
  },
  "& .MuiButton-root": {
    minWidth: 0,
  },
  "& .iconGreen": {
    color: "#4caf50",
  },
  "& .iconRed": {
    color: "#f44336",
  },
});

function FormattedClient(
  id,
  dni,
  firstName,
  secondName,
  lastName,
  secondLastName,
  email,
  status
) {
  this.id = id;
  this.dni = dni;
  this.firstName = secondName ? `${firstName} ${secondName}` : firstName;
  this.lastName = secondLastName ? `${lastName} ${secondLastName}` : lastName;
  this.email = email;
  this.status = status;
}

export const Datatable = ({ clients }) => {
  const { editClient, addClient, deleteClient, fetchClients } = useClients();
  const rows = clients.map(
    (client) =>
      new FormattedClient(
        client.id,
        client.dni,
        client.firstName,
        client.secondName,
        client.lastName,
        client.secondLastName,
        client.email,
        client.status
      )
  );
  const [open, setOpen] = React.useState(false);
  const [selectedClient, setSelectedClient] = React.useState(null);

  const handleOpen = (client) => {
    setSelectedClient(client);
    setOpen(true);
  };
  const handleClose = () => {
    setSelectedClient(null);
    setOpen(false);
    fetchClients(); // Refresh clients after closing the modal
  };

  const handleDelete = async (id) => {
    await deleteClient(id);
    fetchClients(); // Refresh clients after deleting a client
  };

  const columns = [
    { field: "dni", headerName: "DNI", flex: 1 },
    { field: "firstName", headerName: "Nombre", flex: 1 },
    { field: "lastName", headerName: "Apellido", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "status",
      headerName: "Activo",
      flex: 1,
      renderCell: (params) => {
        const iconClass = params.value ? "iconGreen" : "iconRed";
        return params.value ? (
          <CheckCircleOutline className={iconClass} />
        ) : (
          <CancelOutlined className={iconClass} />
        );
      },
    },
    {
      field: "edit",
      headerName: "Editar",
      flex: 1,
      renderCell: (params) => {
        const client = rows.find((row) => row.id === params.id);
        const clientToEdit = clients.find((c) => c.id === client.id);
        return (
          <IconButton
            aria-label="edit"
            onClick={() => handleOpen(clientToEdit)}
          >
            <BorderColorIcon color="info" />
          </IconButton>
        );
      },
    },
    {
      field: "delete",
      headerName: "Eliminar",
      flex: 1,
      renderCell: (params) => {
        return (
          <IconButton
            aria-label="delete"
            onClick={() => handleDelete(params.id)}
          >
            <DeleteIcon color="warning" />
          </IconButton>
        );
      },
    },
  ];

  return (
    <div className="mt-5" style={{ height: 400, width: "100%" }}>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => handleOpen(null)}
        style={{
          marginBottom: "16px",
          backgroundColor: "#020201",
          color: "#c2c5cb",
        }}
      >
        Crear Cliente
      </Button>
      <DataGridStyled
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
      <ClientModal
        open={open}
        handleClose={handleClose}
        title={selectedClient ? "Editar Cliente" : "Agregar Cliente"}
        onSubmit={(client) => {
          selectedClient ? editClient(client) : addClient(client);
          fetchClients(); // Refresh clients after adding or editing a client
        }}
        currentClient={selectedClient}
      />
    </div>
  );
};
