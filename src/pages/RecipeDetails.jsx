import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../Api";
import "./RecipeDetails.css";
const RecipeDetails = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    useEffect(() => {
        fetchRecipe();
    }, [id]);
    const fetchRecipe = async () => {
        try {
            if (!id) return;
            const res = await API.get(`/recipes/${id}`);
            setRecipe(res.data);
        } catch (error) {
            console.log("Error fetching recipe:", error.response?.data || error.message);
        }
    };
    if (!recipe) return <h2>Loading...</h2>;
    return (
        <div className="recipe-details">
            <h1>{recipe.title}</h1>
            <img
                src={recipe.imageURI}
                alt={recipe.title}
                className="recipe-img"
            />
            <p>{recipe.description}</p>
            <h3>🍲 Ingredients</h3>
            <ul>
                {recipe.ingredients.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
            <h3>👨‍🍳 Steps</h3>
            <ol>
                {recipe.steps.map((step, index) => (
                    <li key={index}>{step}</li>
                ))}
            </ol>
            <p><b>Category:</b> {recipe.category}</p>
            <p><b>Cooking Time:</b> {recipe.cookingTime} mins</p>
        </div>
    );
};

export default RecipeDetails;