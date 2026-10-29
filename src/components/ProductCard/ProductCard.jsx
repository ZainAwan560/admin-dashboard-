import React from "react";
import { Edit3, Trash2 } from "lucide-react";
import Button from "../Button/Button";
import ProductImage from "../ProductImage/ProductImage";
import "./ProductCard.css";

export default function ProductCard({ product, onEdit, onDelete }) {
  const productImageSrc =
    typeof product.image === "string" && product.image.trim()
      ? product.image.startsWith("/") ||
        product.image.startsWith("data:") ||
        product.image.startsWith("blob:") ||
        /^[a-z][a-z\d+.-]*:/i.test(product.image)
        ? product.image
        : product.image.startsWith("cloth")
        ? `/products/${product.image.endsWith(".png") ? product.image : product.image + ".png"}`
        : `/products/${product.image}`
      : "";

  return (
    <article className="product-card">
      <div className="product-card__visual">
        <ProductImage
          name={product.name}
          category={product.category}
          src={productImageSrc}
        />
        <em>{product.stock} in stock</em>
      </div>

      <div className="product-card__body">
        <small>{product.category}</small>
        <h3>{product.name}</h3>
        <p>{product.description}</p>

        <div className="product-card__meta">
          <strong>${Number(product.price || 0).toFixed(2)}</strong>
          <span>{product.sold || 0} sold</span>
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
