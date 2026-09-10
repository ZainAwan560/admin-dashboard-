import React, { useEffect, useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import { productsSeed } from "../../data";
import PageHeader from "../../components/PageHeader/PageHeader";
import Button from "../../components/Button/Button";
import SearchInput from "../../components/SearchInput/SearchInput";
import ProductCard from "../../components/ProductCard/ProductCard";
import EmptyState from "../../components/EmptyState/EmptyState";
import Modal from "../../components/Modal/Modal";
import ProductForm from "../../components/ProductForm/ProductForm";
import "./Products.css";

export default function Products() {
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem("berry-products");
    return savedProducts ? JSON.parse(savedProducts) : productsSeed;
  });

  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    localStorage.setItem("berry-products", JSON.stringify(products));
  }, [products]);

  const filtered = useMemo(() => {
    const search = query.toLowerCase();

    return products.filter((product) =>
      `${product.name} ${product.category}`
        .toLowerCase()
        .includes(search),
    );
  }, [products, query]);

  const save = (item) => {
    setProducts((currentProducts) =>
      item.id
        ? currentProducts.map((product) =>
            product.id === item.id ? item : product,
          )
        : [...currentProducts, { ...item, id: Date.now() }],
    );

    setEditing(null);
  };

  const remove = (id) => {
    if (window.confirm("Delete this product?")) {
      setProducts((currentProducts) =>
        currentProducts.filter((product) => product.id !== id),
      );
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
        {filtered.map((product) => (
          <ProductCard
            key={product.id}
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
