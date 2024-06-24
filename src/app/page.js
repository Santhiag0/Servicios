/*import Notice from "../components/Notice";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="w-2/5 h-50">
          EL MUY HPT DEL WADEPARE ME BORRO MI CUADRITO DE LOGGIN PERRRON, BUENO AHORA LO VUELVO A PONER, PERO ME OFENDE
          <Notice/>
          No quiero Laburar, Edder se fue de sabatico       </div>
    </main>
  );
}
*/

"use client";

import React, { useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => { 
    e.preventDefault();

    try {
      const response = await fetch(
        'https://facturacion-servicios.onrender.com/auth/login', 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }), 
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);

        const token = data.token;
        if (typeof token === 'string') {
          const decoded = jwtDecode(token);
          Cookies.set('token', token, { expires: 3 });
          console.log("Role:", decoded.role); 
          router.push('/main');
          console.log("Redirecting to /main");
        } else {
          console.error("Token is not a string");
          alert('Login failed');
        }
      } else {
        alert('Usuario o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Error during login', error);
      alert('Hubo un error durante el login. Inténtalo de nuevo.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-[#020201] flex rounded-lg shadow-lg w-full max-w-4xl">
        <div className="w-1/2">
          <img 
            src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/6a0dc0d2-5fd6-4d7b-ac2a-08a7b2f81bae/dgrf1he-392b27ab-9a37-4ad4-a82b-6351167aeeb3.png/v1/fill/w_764,h_898/bob_cholo_by_ikouzhy_dgrf1he-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9ODk4IiwicGF0aCI6IlwvZlwvNmEwZGMwZDItNWZkNi00ZDdiLWFjMmEtMDhhN2IyZjgxYmFlXC9kZ3JmMWhlLTM5MmIyN2FiLTlhMzctNGFkNC1hODJiLTYzNTExNjdhZWViMy5wbmciLCJ3aWR0aCI6Ijw9NzY0In1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.ulbuIZ5nF2-gBZRnQwn5pZ5-NYP9dIXihoPKZ43xUE4" 
            alt="Imagen" 
            className="object-cover w-full h-full rounded-l-lg"
          />
        </div>
        <div className="w-1/2 p-10">
          <h1 className="text-2xl font-bold text-[#c2c5cb] mb-8">Sistema de Facturación</h1>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-[#c2c5cb] mb-2">Username:</label>
              <input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#6f859b]"
              />
            </div>
            <div className="mb-4 relative">
              <label className="block text-[#c2c5cb] mb-2">Password:</label>
              <input 
                type={showPassword ? "text" : "password"} 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#6f859b]"
              />
              <span 
                className="absolute right-3 top-14 transform -translate-y-1/2 cursor-pointer text-gray-400"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? '🙈' : '👁️'}
              </span>
            </div>
            <button 
              type="submit" 
              className="w-full p-3 mt-4 bg-[#6f859b] text-white rounded hover:bg-[#c2c5cb] transition duration-200"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}; 

export default LoginPage;
