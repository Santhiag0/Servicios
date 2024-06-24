"use client"

import React, { useState } from 'react';
import DeleteCategoryModal from './DeleteCategoryModal';

const DeleteCategoryButton = ({ categories, onDelete }) => {
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <div>
            <button onClick={openModal} className="mb-4 p-2 bg-red-500 text-white rounded">Eliminar Categoría</button>
            <DeleteCategoryModal
                isOpen={modalOpen}
                onClose={closeModal}
                categories={categories}
                onDelete={onDelete}
            />
        </div>
    );
};

export default DeleteCategoryButton;
