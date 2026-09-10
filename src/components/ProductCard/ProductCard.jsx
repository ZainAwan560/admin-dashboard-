import React from "react";
import { Edit3, Trash2 } from "lucide-react";
import Button from "../Button/Button";
import ProductImage from "../ProductImage/ProductImage";
import "./ProductCard.css";

export default function ProductCard({ product, onEdit, onDelete }) {
  return (
    <article className="product-card">
      <div className="product-card__visual">
        <ProductImage
          name={product.name}
          category={product.category}
          src={product.image}
        />
        <em>{product.stock} in stock</em>
      </div>

      <div className="product-card__body">
        <small>{product.category}</small>
        <h3>{product.name}</h3>
        <p>{product.description}</p>

        <div className="product-card__meta">
          <strong>${Number(product.price).toFixed(2)}</strong>
          <span>{product.sold} sold</span>
        </div>

        <div className="product-card__actions">
          <Button
            variant="secondary"
            onClick={() => onEdit(product)}
          >
            <Edit3 size={14} />
            Edit
          </Button>
          <Button
            variant="danger"
            onClick={() => onDelete(product.id)}
          >
            <Trash2 size={14} />
            Delete
          </Button>
        </div>
      </div>
    </article>
  );
}
