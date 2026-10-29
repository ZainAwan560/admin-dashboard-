import React, { useEffect, useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import PageHeader from "../../components/PageHeader/PageHeader";
import Button from "../../components/Button/Button";
import SearchInput from "../../components/SearchInput/SearchInput";
import ProductCard from "../../components/ProductCard/ProductCard";
import EmptyState from "../../components/EmptyState/EmptyState";
import Modal from "../../components/Modal/Modal";
import ProductForm from "../../components/ProductForm/ProductForm";
import "./Products.css";
import { API_BASE_URL } from "../../config/api";
import { defaultProducts } from "../../data/defaultProducts";

export default function Products() {
  const [products, setProducts] = useState(defaultProducts);
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState(null);

  // 2. Database se Products mangwane ka function
  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products`);
      if (!response.ok) return;
      const data = await response.json();
      
      if (Array.isArray(data)) {
        // MongoDB ki ID '_id' hoti hai, hum usko 'id' mein copy kar rahe hain taake admin card theek chale
        const mappedData = data.map(item => ({ ...item, id: item._id || item.id }));
        setProducts(mappedData);
      }
    } catch (error) {
      console.error("Products fetch karne mein error:", error);
    }
  };

  // Jab page load ho toh products fetch karein
  useEffect(() => {
    fetchProducts();
  }, []);

  const filtered = useMemo(() => {
    const search = query.toLowerCase();
    return (products || []).filter((product) =>
      `${product?.name || ""} ${product?.category || ""}`.toLowerCase().includes(search)
    );
  }, [products, query]);

  // 3. Naya Product Save (POST) ya Edit (PUT) karna
  const save = async (item) => {
    try {
      if (item.id) {
        // Agar pehle se ID hai toh UPDATE (Edit) karega (Is API route ko hum backend mein add karenge)
        const response = await fetch(`${API_BASE_URL}/api/products/${item.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        });
        const updatedItem = await response.json();
        updatedItem.id = updatedItem._id;
        
        setProducts(products.map((product) => product.id === item.id ? updatedItem : product));
      } else {
        // Naya product hai toh CREATE (POST) karega
        const response = await fetch(`${API_BASE_URL}/api/products`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        });
        const newItem = await response.json();
        newItem.id = newItem._id;
        
        setProducts([...products, newItem]);
      }
    } catch (error) {
      console.error("Save karne mein error:", error);
    }
    setEditing(null);
  };

  // 4. Product Delete karna (DELETE)
  const remove = async (id) => {
    if (window.confirm("Kiya aap waqai is product ko delete karna chahte hain?")) {
      try {
        await fetch(`${API_BASE_URL}/api/products/${id}`, {
          method: "DELETE",
        });
        // Frontend se bhi hata dein
        setProducts(products.filter((product) => product.id !== id));
      } catch (error) {
        console.error("Delete karne mein error:", error);
      }
    }
  };

  return (
    <>
      <PageHeader
        title="Products"
        subtitle="Manage your catalog, pricing and inventory."
      />

      <div className="products__toolbar">
        <SearchInput
          placeholder="Search products..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        >
          <Search size={16} />
        </SearchInput>

        <Button onClick={() => setEditing({})}>
          <Plus size={17} />
          Add New
        </Button>
      </div>

      <div className="products__grid">
        {filtered.map((product, index) => (
          <ProductCard
            key={product.id || product._id || index}
            product={product}
            onEdit={setEditing}
            onDelete={remove}
          />
        ))}

        {!filtered.length && (
          <EmptyState
            title="No products found"
            text="Try another search or add a new product."
          />
        )}
      </div>

      <Modal
        open={editing !== null}
        title={editing?.id ? "Edit product" : "Add new product"}
        kicker={editing?.id ? "EDIT" : "NEW"}
        onClose={() => setEditing(null)}
      >
        <ProductForm
          product={editing?.id ? editing : null}
          onCancel={() => setEditing(null)}
          onSave={save}
        />
      </Modal>
    </>
  );
}