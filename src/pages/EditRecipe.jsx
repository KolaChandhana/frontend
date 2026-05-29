import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";
import "./EditRecipe.css";

const EditRecipe = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [recipe, setRecipe] = useState({
        title: "",
        description: "",
    });
    useEffect(() => {
        fetchRecipe();
    }, [id]);
    const fetchRecipe = async () => {
        try {
            const res = await API.get(`/recipes/${id}`);
           setRecipe(res.data || { title: "", description: "" });
        } catch (error) {
            console.log("Error loading recipe:", error.message);
        }
    };
    const handleUpdate = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await API.get(`/recipes/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("Updated successfully");
            navigate("/home");
        } catch (error) {
            console.log("Update failed:", error.response?.data || error.message);
        }
    };
    return (
        <div className="edit-recipe-container">
            <h2>Edit Recipe</h2>
            <input value={recipe.title || ""} onChange={(e) =>
                    setRecipe({ ...recipe, title: e.target.value })
                }
            />
            <textarea value={recipe.description || ""} onChange={(e) =>
                    setRecipe({ ...recipe, description: e.target.value })
                }
            />
            <button onClick={handleUpdate}>Update</button>
        </div>
    );
};
export default EditRecipe;