import React from 'react';
import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className="bg-gray-800 p-4 border-l-white">
            <ul className="flex justify-end space-x-8">
                <li>
                <Link href="/main" className="text-white hover:text-gray-400 transition duration-300">
                        Inicio
                    </Link>
                </li>
                <li>
                    <Link href="/productos" className="text-white hover:text-gray-400 transition duration-300">
                        Productos
                    </Link>
                </li>
                <li>
                    <Link href="/personal" className="text-white hover:text-gray-400 transition duration-300">
                        Personal
                    </Link>
                </li>
                <li>
                    <Link href="/clientes" className="text-white hover:text-gray-400 transition duration-300">
                        Clientes
                    </Link>
                </li>
                <li>
                    <Link href="/facturacion" className="text-white hover:text-gray-400 transition duration-300">
                        Facturación
                    </Link>
                </li>
                <Link href="/" className=" mx-3 text-white hover:text-gray-400 transition duration-300">
                        Log Out
                    </Link>
            </ul>
        </nav>
    );
};

export default Navbar;
