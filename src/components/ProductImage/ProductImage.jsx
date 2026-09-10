import React from "react";
import "./ProductImage.css";

const fallbackImages = {
  Electronics: "/products/electronics.svg",
  Wearables: "/products/smart-watch.svg",
  Accessories: "/products/backpack.svg",
  Fashion: "/products/running-shoes.svg",
  Home: "/products/desk-lamp.svg",
};

function getFallbackImage(name, category) {
  const productName = name.toLowerCase();

  if (productName.includes("headphone")) {
    return "/products/headphones.svg";
  }

  if (productName.includes("keyboard")) {
    return "/products/keyboard.svg";
  }

  if (productName.includes("watch")) {
    return "/products/smart-watch.svg";
  }

  if (productName.includes("backpack")) {
    return "/products/backpack.svg";
  }

  if (productName.includes("shoe")) {
    return "/products/running-shoes.svg";
  }

  if (productName.includes("lamp")) {
    return "/products/desk-lamp.svg";
  }

  return fallbackImages[category] || "/products/default-product.svg";
}

export default function ProductImage({ name, category, src }) {
  const fallbackImage = getFallbackImage(name, category);
  const imageSrc = typeof src === "string" && src.trim() ? src : fallbackImage;

  return (
    <img
      className="product-image"
      src={imageSrc}
      alt={name}
      onError={(event) => {
        if (event.currentTarget.src.endsWith(fallbackImage)) {
          return;
        }

        event.currentTarget.src = fallbackImage;
      }}
    />
  );
}
