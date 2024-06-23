"use client";

import React from 'react';
import Navbar from '@/Components/navbar';
import Facturas from '@/Components/Facturas';
import withAuth from '@/Components/withAuth';
const Page = () => {
    return (
        
        <div>
            <Navbar/>
            <Facturas/>
        </div>
    );
};

export default withAuth(Page);