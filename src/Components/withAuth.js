// src/Components/withAuth.js
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {jwtDecode} from 'jwt-decode';
import Cookies from 'js-cookie';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = Cookies.get('token');

      if (!token) {
        router.push('/');
      } else {
        try {
          const decoded = jwtDecode(token);
          if (!decoded || !decoded.role) {
            Cookies.remove('token');
            router.push('/');
          }
        } catch (error) {
          console.error('Invalid token:', error);
          Cookies.remove('token');
          router.push('/');
        }
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
