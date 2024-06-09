"use client";

import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { makeStyles } from "@mui/styles";
import { CheckCircleOutline, CancelOutlined } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import CustomModal from "./StudentsModal";
import { useUsers } from "@/hooks/useUsers";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

const useStyles = makeStyles({
  dataGrid: {
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
  },
});

function FormattedUser(id, username, id_role, status) {
  this.id = id;
  this.username = username;
  this.id_role = id_role;
  this.status = status;
}

export const Datatable = ({ users }) => {
  const { editUser, addUser } = useUsers();
  const classes = useStyles();
  const rows = users.map(
    (user) =>
      new FormattedUser(user.id, user.username, user.id_role, user.status)
  );
  const [open, setOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState(null);

  const handleOpen = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };
  const handleClose = () => {
    setSelectedUser(null);
    setOpen(false);
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "username", headerName: "Usuario", flex: 1 },
    {
      field: "id_role",
      headerName: "Rol",
      flex: 1,
      renderCell: (params) => {
        return <p>{params.value === 1 ? "Administrador" : "Empleado"}</p>;
      },
    },
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
        const user = rows.find((row) => row.id === params.id);
        const userToEdit = users.find((u) => u.id === user.id);
        return (
          <>
            <IconButton
              aria-label="edit"
              onClick={() => handleOpen(userToEdit)}
            >
              <BorderColorIcon color="info" />
            </IconButton>
          </>
        );
      },
    },
    {
      field: "delete",
      headerName: "Eliminar",
      flex: 1,
      renderCell: (params) => {
        return (
          <IconButton aria-label="delete">
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
        Crear Usuario
      </Button>
      <DataGrid
        className={classes.dataGrid}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
      <CustomModal
        open={open}
        handleClose={handleClose}
        title={selectedUser ? "Editar Usuario" : "Agregar Usuario"}
        onSubmit={(user) => {
          selectedUser ? editUser(user) : addUser(user);
        }}
        currentUser={selectedUser}
      />
    </div>
  );
};
