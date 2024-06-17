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
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

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

export const Datatable = ({ clients, fetchClients }) => {
  const { editClient, addClient, deleteClient } = useClients();
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
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarSeverity, setSnackbarSeverity] = React.useState("success");
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [clientToDelete, setClientToDelete] = React.useState(null);

  const handleOpen = (client) => {
    if (client && client.id === 0) {
      setSnackbarMessage("No se puede editar el consumidor final");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }
    setSelectedClient(client);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedClient(null);
    setOpen(false);
    setTimeout(fetchClients, 5000);
  };

  const handleDelete = (id) => {
    setClientToDelete(id);
    setDialogOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteClient(clientToDelete);
      setSnackbarMessage("Cliente eliminado con éxito");
      setSnackbarSeverity("success");
    } catch (error) {
      setSnackbarMessage("Error eliminando cliente");
      setSnackbarSeverity("error");
    } finally {
      setSnackbarOpen(true);
      setDialogOpen(false);
      setTimeout(fetchClients, 5000);
    }
  };

  const handleSubmit = async (client) => {
    try {
      if (selectedClient) {
        await editClient(client);
        setSnackbarMessage("Cliente editado con éxito");
      } else {
        await addClient(client);
        setSnackbarMessage("Cliente creado con éxito");
      }
      setSnackbarSeverity("success");
    } catch (error) {
      setSnackbarMessage("Error guardando cliente");
      setSnackbarSeverity("error");
    } finally {
      setSnackbarOpen(true);
      handleClose();
      setTimeout(fetchClients, 5000);
    }
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
        const client = rows.find((row) => row.id === params.id);
        return (
          <IconButton
            aria-label="delete"
            onClick={() => handleDelete(client.id)}
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
        onSubmit={handleSubmit}
        currentClient={selectedClient}
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <MuiAlert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      >
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Está seguro de que desea eliminar este cliente?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={confirmDelete} color="primary" autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
