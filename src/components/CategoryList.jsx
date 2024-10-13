// src/components/CategoryList.jsx
import React from "react";
import { Link } from "react-router-dom";

const CategoryList = ({ categories, onCategoryClick }) => (
  <ul className="flex flex-col gap-4">
    {categories.map((item) => (
      <li key={item} onClick={() => onCategoryClick(item)}>
        <Link to={`/products?category=${item}`}>{item}</Link>
      </li>
    ))}
  </ul>
);

export default CategoryList;
