import React, { useState } from "react";
import "./SearchBar.css"

const SearchBar = ({ onSearch, onCategory }) => {
    const [text, setText] = useState("");

    return (
        <div className="search-section">
            <div className="search-box">
                <input  placeholder="Search recipes..." value={text} onChange={(e) => {
                        setText(e.target.value);
                        onSearch(e.target.value);
                    }}
                />
                <select onChange={(e) => onCategory(e.target.value)}>
                    <option>Category🔻</option>
                    <option>All</option>
                    <option>Breakfast</option>
                    <option>Lunch</option>
                    <option>Dinner</option>
                    <option>Dessert</option>
                </select>
                <button>Search</button>
            </div>
            <div className="chips">
                {["All", "Breakfast", "Lunch", "Dinner", "Dessert", ].map(
                    (c) => (
                        <span key={c} onClick={() => onCategory(c)}>
                            {c}
                        </span>
                    )
                )}
            </div>
        </div>
    );
};

export default SearchBar;