import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "./MyRecipes.css";
const MyRecipes = () => {
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [form, setForm] = useState({
        title: "",
        description: "",
        category: "Breakfast",
        ingredients: "",
        steps: "",
        imageURI: "",
        cookingTime: ""
    });
    const handleChange = (e) => {
        setForm({...form,[e.target.name]: e.target.value});
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const formData = new FormData();
            formData.append("title", form.title);
            formData.append("description", form.description);
            formData.append("category", form.category);
            formData.append("ingredients", JSON.stringify( form.ingredients.split(",").map(i => i.trim())));
            formData.append("steps",JSON.stringify(form.steps.split(",").map(s => s.trim())));
            formData.append("cookingTime",form.cookingTime);
            if (image) {
                formData.append("image", image);
            }
            await API.post("/recipes/create",formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            alert("Recipe added successfully!");
            navigate("/Home");
        } catch (err) {
            console.log(err);
            alert("Failed to add recipe");
        }
    };
    return (
    <div className="myrecipes-container">
        <h2 className="myrecipes-title">Add New Recipe</h2>
        <form className="recipe-form" onSubmit={handleSubmit}>
            <input name="title" placeholder="Recipe Title" value={form.title} onChange={handleChange}/><br /><br />
            <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange}/><br /><br />
            <select name="category" value={form.category} onChange={handleChange}>
                <option>Breakfast</option>
                <option>Lunch</option>
                <option>Dinner</option>
                <option>Dessert</option>
            </select><br /><br />
            <input name="ingredients" placeholder="Rice, Salt, Oil" value={form.ingredients} onChange={handleChange}/><br /><br />
            <input name="steps" placeholder="Step1, Step2, Step3" value={form.steps} onChange={handleChange}/><br /><br />
           <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])}/><br /><br />
            <input type="number" name="cookingTime" placeholder="Cooking Time" value={form.cookingTime} onChange={handleChange}/><br /><br />
            <button className="recipe-submit-btn" type="submit">
                Add Recipe
            </button>
        </form>
    </div>
  );
};
export default MyRecipes;