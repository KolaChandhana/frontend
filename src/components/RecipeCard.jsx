import React from "react";
import { useNavigate } from "react-router-dom";
import API from "../Api";
import "./RecipeCard.css";
const RecipeCard = ({ recipe, onDelete }) => {
    const navigate = useNavigate();
    console.log(recipe);
    const handleDelete = async () => {
    const confirmDelete = window.confirm( "Are you sure you want to delete?");
    if (!confirmDelete) return;
    try {
        const token = localStorage.getItem("token");
        await API.delete(`/recipes/${recipe._id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        onDelete(recipe._id);
        alert("Recipe deleted successfully");
    } catch (error) {
        console.log( "Delete failed:", error.response?.data || error.message);
    }
};
    return (
        <div className="card">
            <img src={recipe.imageURI} alt={recipe.title} onError={() => console.log("IMAGE FAILED:", recipe)}/>
            <span className="badge">{recipe.category}</span>
            <h3>{recipe.title}</h3>
            <p className="meta">
                By {recipe.createdBy?.firstName || "User"} • {recipe.cookingTime} min
            </p>
            <p className="desc">{recipe.description}</p>
            <div className="actions">
                <button onClick={() => navigate(`/recipe/${recipe._id}`)}>
                    View
                </button>
                <button onClick={() => navigate(`/recipe/edit/${recipe._id}`)}>
                    Edit
                </button>
                <button className="delete" onClick={handleDelete}>
                    Delete
                </button>
            </div>
        </div>
    );
};
export default RecipeCard;