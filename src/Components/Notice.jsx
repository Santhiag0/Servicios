'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const CenteredComponent = () => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push('/main');
  };

return (
    <div className="flex flex-col items-center justify-center py-2 px-5 border-2 border-white bg-gray-950">
        <h1 className="text-4xl text-white">Hello Pibes</h1>
        <p className="text-white space-x-0 m-4 text-justify">
            No se olviden de los componentes del cliente. Lo que se ve en el navegador es el servidor (NEXT HACE TODO EN EL SERVIDOR, CREO JEJE), lo que se ve en el cliente es el cliente. Vean un video si no entienden, pero todo lo que haga o tenga acciones pongan etiqueta de use client.
        </p>
        <button
            onClick={handleButtonClick}
            className="bg-slate-600 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded mt-4"
        >
            INGRESAR
        </button>
    </div>
);
};

export default CenteredComponent;
