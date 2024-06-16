import React from 'react';
import Navbar from '@/Components/navbar';
import ProductList from '@/Components/ProductList';
import Categories from '@/Components/Categories';

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

export default Page;