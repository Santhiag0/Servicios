import { useState, useEffect } from "react";

const useProductCategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
        const response = await fetch("https://facturacion-servicios.onrender.com/api/category", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYWRtaW4iLCJzdWIiOiJhZG1pbiIsImlhdCI6MTcxODYzNjYwOCwiZXhwIjoxNzE4NjcyNjA4fQ.0ptjMx1OMvmNMJuJD-ns1zb8HQYQSkRZrzPnjddSchY",                
              },
        });

        if (response.ok) {
            const data = await response.json();
            setCategories(data);

            const allProducts = data.flatMap(category => 
                category.products
                    .filter(product => product.active)
                    .map(product => ({ ...product, category: category.name, categoryId: category.id }))
            );
            setProducts(allProducts);
        } else {
            throw new Error("Error al cargar las categorías y productos");
        }
    } catch (error) {
        console.error(error);
    } finally {
        setLoading(false);
    }
};


  const addCategory = async (category) => {
    setLoading(true);
    try {
        const response = await fetch("https://facturacion-servicios.onrender.com/api/category", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYWRtaW4iLCJzdWIiOiJhZG1pbiIsImlhdCI6MTcxODYzNjYwOCwiZXhwIjoxNzE4NjcyNjA4fQ.0ptjMx1OMvmNMJuJD-ns1zb8HQYQSkRZrzPnjddSchY",            },
            body: JSON.stringify(category),
        });

        if (response.ok) {
            await fetchCategories();
        } else {
            throw new Error("Error al agregar la categoría");
        }
    } catch (error) {
        console.error(error);
    } finally {
        setLoading(false);
    }
};


const editCategory = async (id, updatedCategory) => {
  setLoading(true);
  try {
      const response = await fetch(`https://facturacion-servicios.onrender.com/api/category/${id}`, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYWRtaW4iLCJzdWIiOiJhZG1pbiIsImlhdCI6MTcxODYzNjYwOCwiZXhwIjoxNzE4NjcyNjA4fQ.0ptjMx1OMvmNMJuJD-ns1zb8HQYQSkRZrzPnjddSchY",          },
          body: JSON.stringify(updatedCategory),
      });

      if (response.ok) {
          await fetchCategories();
      } else {
          throw new Error("Error al editar la categoría");
      }
  } catch (error) {
      console.error(error);
  } finally {
      setLoading(false);
  }
};


  const deleteCategory = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`https://facturacion-servicios.onrender.com/api/category/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYWRtaW4iLCJzdWIiOiJhZG1pbiIsImlhdCI6MTcxODYzNjYwOCwiZXhwIjoxNzE4NjcyNjA4fQ.0ptjMx1OMvmNMJuJD-ns1zb8HQYQSkRZrzPnjddSchY",        },
      });

      if (response.ok) {
        await fetchCategories();
      } else {
        throw new Error("Error al eliminar la categoría");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (product) => {
    setLoading(true);
    try {
      const response = await fetch("https://facturacion-servicios.onrender.com/api/productos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYWRtaW4iLCJzdWIiOiJhZG1pbiIsImlhdCI6MTcxODYzNjYwOCwiZXhwIjoxNzE4NjcyNjA4fQ.0ptjMx1OMvmNMJuJD-ns1zb8HQYQSkRZrzPnjddSchY",        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        await fetchCategories();
      } else {
        throw new Error("Error al agregar el producto");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const editProduct = async (id, updatedProduct) => {
    setLoading(true);
    try {
      const response = await fetch(`https://facturacion-servicios.onrender.com/api/productos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYWRtaW4iLCJzdWIiOiJhZG1pbiIsImlhdCI6MTcxODYzNjYwOCwiZXhwIjoxNzE4NjcyNjA4fQ.0ptjMx1OMvmNMJuJD-ns1zb8HQYQSkRZrzPnjddSchY",        },
        body: JSON.stringify(updatedProduct),
      });

      if (response.ok) {
        await fetchCategories();
      } else {
        throw new Error("Error al editar el producto");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`https://facturacion-servicios.onrender.com/api/productos/activation/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYWRtaW4iLCJzdWIiOiJhZG1pbiIsImlhdCI6MTcxODYzNjYwOCwiZXhwIjoxNzE4NjcyNjA4fQ.0ptjMx1OMvmNMJuJD-ns1zb8HQYQSkRZrzPnjddSchY",        },
      });

      if (response.ok) {
        await fetchCategories();
      } else {
        throw new Error("Error al eliminar el producto");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    products,
    loading,
    addCategory,
    editCategory,
    deleteCategory,
    addProduct,
    editProduct,
    deleteProduct,
  };
};

export default useProductCategoryManager;
