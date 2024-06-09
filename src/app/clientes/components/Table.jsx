"use strict";

export default function Table({ clients, onDelete, onEdit }) {
  return (
    <div className="flex justify-center items-center p-4">
      <div className="w-full">
        <h2 className="text-2xl font-bold mb-4">LISTA DE ESTUDIANTES</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {clients.map((client) => (
            <div
              key={client.id}
              className="bg-white p-4 border rounded-lg shadow-md"
            >
              <div className="text-xl font-bold mb-2 text-purple-950">
                {client.name} {client.lastName}
              </div>
              <div className="text-sm mb-1 text-purple-950">
                <span className="font-semibold text-purple-950">Cedula:</span>{" "}
                {client.dni}
              </div>
              <div className="text-sm mb-1 text-purple-950">
                <span className="font-semibold text-purple-950">Address:</span>{" "}
                {client.address}
              </div>
              <div className="text-sm mb-1 text-purple-950">
                <span className="font-semibold text-purple-950">Phone:</span>{" "}
                {client.phone}
              </div>
              <div className="flex justify-between mt-4 text-purple-950">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                  onClick={() => onEdit(client)}
                >
                  Editar
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                  onClick={() => onDelete(client.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
