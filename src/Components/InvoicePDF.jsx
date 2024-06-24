import React from 'react';
import { format } from 'date-fns';

const Invoice = React.forwardRef(({ invoiceData }, ref) => {
  const {
    client,
    dateSale,
    subtotal,
    total,
    salesDetails
  } = invoiceData;

  return (
    <div ref={ref} className="p-8 border border-gray-300 mx-auto my-4 w-[210mm] h-[297mm] bg-white text-black">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#003366]">Nombre Empresa</h1>
          
        </div>
        <div className="text-right">
          <p><strong>R.U.C.: </strong>1790112233001</p>
          <h2 className="text-2xl font-bold text-[#4DA6FF]">FACTURA</h2>
          <p><strong>No.: </strong>002-001-123456789</p>
          <p><strong>AUT. SRI: </strong>1234567890</p>
        </div>
      </div>
      <div className="mb-4">
        <p className="text-sm"><strong>Dirección Matriz: </strong>Calle Meroz y S/N Ramírez Dinamarca</p>
        <p className="text-sm"><strong>Dirección Sucursal: </strong>Garcia Moreno y Sucre</p>
      </div>
      <div className="mb-4">
        <p><strong>Cliente: </strong>{client.firstName} {client.lastName}</p>
        <p><strong>Cédula: </strong>{client.dni}</p>
        <p><strong>Dirección: </strong>{client.address}</p>
        <p><strong>Teléfono: </strong>{client.phone}</p>
        <p><strong>Email: </strong>{client.email}</p>
        <p><strong>Fecha de Venta: </strong>{format(new Date(dateSale), 'dd/MM/yyyy')}</p>
      </div>
      <table className="w-full border border-gray-300 mb-4 text-black">
        <thead>
          <tr className="bg-[#D9D9D9]">
            <th className="border border-gray-300 p-2">Cant.</th>
            <th className="border border-gray-300 p-2">Descripción</th>
            <th className="border border-gray-300 p-2">P. Unitario</th>
            <th className="border border-gray-300 p-2">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {salesDetails.map((item, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-2 text-center">{item.quantity}</td>
              <td className="border border-gray-300 p-2">{item.product.name}</td>
              <td className="border border-gray-300 p-2 text-right">{item.price.toFixed(2)}</td>
              <td className="border border-gray-300 p-2 text-right">{item.subtotal.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-right mb-4">
        <p><strong>Subtotal: </strong>{subtotal.toFixed(2)}</p>
        <p><strong>Total: </strong>{total.toFixed(2)}</p>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <p><strong>Forma de Pago: </strong>Efectivo</p>
          <p><strong>Valor Forma de Pago: </strong>{total.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-sm">________________________</p>
          <p className="text-sm">Firma</p>
        </div>
      </div>
    </div>
  );
});

export default Invoice;
