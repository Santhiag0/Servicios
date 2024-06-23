"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { getRole } from '../utils/auth';

const Navbar = () => {
    const router = useRouter();
    const [role, setRole] = useState(null);

    useEffect(() => {
        const roleFromCookie = getRole();
        setRole(roleFromCookie);
    }, []);

    const handleLogout = (e) => {
        e.preventDefault();
        // Remove the cookie named 'token'
        Cookies.remove('token');
        // Redirect to the home page
        router.push('/');
    };

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
                {role === 'admin' && (
                    <li>
                        <Link href="/personal" className="text-white hover:text-gray-400 transition duration-300">
                            Personal
                        </Link>
                    </li>
                )}
                <li>
                    <Link href="/clientes" className="text-white hover:text-gray-400 transition duration-300">
                        Clientes
                    </Link>
                </li>
                <li>
                    <Link href="/facturas" className="text-white hover:text-gray-400 transition duration-300">
                        Facturas
                    </Link>
                </li>
                <li>
                    <a href="/" onClick={handleLogout} className="text-white hover:text-gray-400 transition duration-300">
                        Log Out
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
