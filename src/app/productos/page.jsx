"use client";

import React from 'react';
import Navbar from '@/Components/navbar';
import ProductList from '@/Components/ProductList';
import Categories from '@/Components/Categories';
import withAuth from '@/Components/withAuth';

const Page = () => {
    return (
        
        <div>
            <Navbar/>
            <div>
            <Categories/>
            </div>
        </div>
    );
};

export default withAuth(Page);