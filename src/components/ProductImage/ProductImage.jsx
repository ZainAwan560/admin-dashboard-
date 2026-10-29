import React from "react";
import "./ProductImage.css";

const fallbackImages = {
  Electronics: "/products/electronics.svg",
  Wearables: "/products/smart-watch.svg",
  Accessories: "/products/backpack.svg",
  Fashion: "/products/running-shoes.svg",
  Home: "/products/desk-lamp.svg",
};

function getFallbackImage(name = "", category = "") {
  const productName = String(name || "").toLowerCase();

  if (productName.includes("cloth") || productName.includes("shirt") || productName.includes("t-shirt") || productName.includes("jean")) {
    return "/products/cloth1.png";
  }

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

function getImageSrc(src) {
  const imagePath = typeof src === "string" ? src.trim() : "";

  if (!imagePath) {
    return "";
  }

  if (
    imagePath.startsWith("/") ||
    imagePath.startsWith("data:") ||
    imagePath.startsWith("blob:") ||
    /^[a-z][a-z\d+.-]*:/i.test(imagePath)
  ) {
    return imagePath;
  }

  if (imagePath.startsWith("cloth")) {
    const filename = imagePath.endsWith(".png") ? imagePath : `${imagePath}.png`;
    return `/products/${filename}`;
  }

  return `/products/${imagePath}`;
}

export default function ProductImage({ name, category, src }) {
  const fallbackImage = getFallbackImage(name, category);
  const imageSrc = getImageSrc(src) || fallbackImage;

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
