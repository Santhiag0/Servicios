// src/utils/auth.js
import Cookies from 'js-cookie';

export const getToken = () => {
  return Cookies.get('token');
};

export const getRole = () => {
  const token = Cookies.get('token');
  if (!token) return null;

  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    const { role } = JSON.parse(jsonPayload);
    return role;
  } catch (error) {
    console.error('Failed to parse JWT', error);
    return null;
  }
};