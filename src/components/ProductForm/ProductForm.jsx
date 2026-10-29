import React, { useEffect, useState } from "react";
import FormField from "../FormField/FormField";
import Button from "../Button/Button";
import ProductImage from "../ProductImage/ProductImage";
import "./ProductForm.css";

const blank = {
  name: "",
  category: "Electronics",
  price: "",
  stock: "",
  description: "",
  image: "/products/default-product.svg",
};

export default function ProductForm({ product, onCancel, onSave }) {
  const [form, setForm] = useState(blank);
  const [imageError, setImageError] = useState("");

  const previewImageSrc =
    typeof form.image === "string" && form.image.trim()
      ? form.image.startsWith("/") ||
        form.image.startsWith("data:") ||
        form.image.startsWith("blob:") ||
        /^[a-z][a-z\d+.-]*:/i.test(form.image)
        ? form.image
        : form.image.startsWith("cloth")
        ? `/products/${form.image.endsWith(".png") ? form.image : form.image + ".png"}`
        : `/products/${form.image}`
      : "";

  useEffect(() => {
    setForm(product ? { ...product } : blank);
    setImageError("");
  }, [product]);

  const update = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setImageError("Please select an image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setImageError("Image size should be less than 5MB.");
      return;
    }

    setImageError("");

    const reader = new FileReader();

    reader.onload = () => {
      setForm((currentForm) => ({
        ...currentForm,
        image: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  const submit = (event) => {
    event.preventDefault();

    if (!form.name || !form.price || !form.stock) {
      return;
    }

    onSave({
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
      sold: Number(form.sold || 0),
    });
  };

  return (
    <form className="product-form" onSubmit={submit}>
      <FormField label="Product name">
        <input
          name="name"
          value={form.name}
          onChange={update}
          placeholder="e.g. Wireless Headphones"
        />
      </FormField>

      <FormField label="Category">
        <select
          name="category"
          value={form.category}
          onChange={update}
        >
          <option>Electronics</option>
          <option>Wearables</option>
          <option>Accessories</option>
          <option>Fashion</option>
          <option>Home</option>
        </select>
      </FormField>

      <FormField label="Price">
        <input
          name="price"
          type="number"
          step="0.01"
          value={form.price}
          onChange={update}
        />
      </FormField>

      <FormField label="Stock">
        <input
          name="stock"
          type="number"
          value={form.stock}
          onChange={update}
        />
      </FormField>

      <FormField label="Product image">
        <div className="product-form__image-upload">
          <label className="product-form__upload-button">
            <input
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/webp,image/gif"
              onChange={handleImageChange}
            />
            Choose image
          </label>
          <span className="product-form__upload-hint">
            PNG, JPG, WEBP or GIF · max 5MB
          </span>
        </div>

        {imageError && (
          <span className="product-form__image-error">{imageError}</span>
        )}

        <div className="product-form__preview">
          <ProductImage
            name={form.name || "Product preview"}
            category={form.category}
            src={previewImageSrc}
          />
          <div>
            <strong>Image preview</strong>
            <span>The selected image will appear on the product card.</span>
          </div>
        </div>
      </FormField>

      <FormField label="Image URL (optional)">
        <input
          name="image"
          value={form.image.startsWith("data:") ? "" : form.image}
          onChange={update}
          placeholder="https://example.com/product.jpg"
        />
      </FormField>

      <FormField label="Description" full>
        <textarea
          name="description"
          value={form.description}
          onChange={update}
          rows="4"
        />
      </FormField>

      <div className="product-form__actions">
        <Button
          variant="secondary"
          type="button"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button type="submit">
          {product ? "Save changes" : "Add product"}
        </Button>
      </div>
    </form>
  );
}
