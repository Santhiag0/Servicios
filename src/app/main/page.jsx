"use client";
import React from 'react';
import Navbar from '@/Components/navbar';
import ProductList from '@/Components/ProductList';
import withAuth from '@/Components/withAuth';

const Page = () => {
    return (
        
        <div>
            <Navbar/>
            <ProductList/>
        </div>
    );
};

export default withAuth(Page);