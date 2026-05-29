import React from "react";
import "./Navbar.css"
const Navbar = () => {
    return (
        <div className="navbar">
            <h2>🍲 RecipeBook</h2>
            <div className="nav-links">
                <a href="/">Browse</a>
                <a href="/my">My Recipes + New Recipe</a>
                <span className="user">Priya ⬇</span>
            </div>
        </div>
    );
};
export default Navbar;