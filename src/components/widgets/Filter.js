import React, { useState } from "react";
import "./Filter.css";

const Filter = ({ category, categories }) => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div className="filter">
      <label htmlFor="category-select">Filter by category:</label>
      <select
        id="category-select"
        value={selectedCategory}
        onChange={handleCategoryChange}
      >
        <option value="">All</option>
        {categories.map((cg) => {
          return (
            <option key={cg} value={`${cg}`}>
              {cg}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Filter;
