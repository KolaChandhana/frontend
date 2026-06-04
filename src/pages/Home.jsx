import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../Api";
import Navbar from "../components/Navbar";
import RecipeCard from "../components/RecipeCard";
import SearchBar from "../components/SearchBar";
import "./Home.css";
const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/");
            return;
        }
        fetchRecipes();
    }, []);
    const fetchRecipes = async () => {
        try {
            const res = await API.get("/recipes/public");

            console.log("RECIPES DATA:", res.data);

            setRecipes(res.data || []);
            setFiltered(res.data || []);
        } catch (error) {
            console.log("Error fetching recipes:", error.message);
        }
    };
    const handleSearch = (text) => {
        if (!text) {
            setFiltered(recipes);
            return;
        }
        const filteredData = recipes.filter((r) =>
            r.title.toLowerCase().includes(text.toLowerCase())
        );
        setFiltered(filteredData);
    };
    const filterByCategory = (cat) => {
        if (cat === "All") {
            setFiltered(recipes);
            return;
        }
        setFiltered(recipes.filter((r) => r.category === cat));
    };
    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem("token");

            console.log("TOKEN:", token); // check if token exists

            await API.delete(`/recipes/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const updated = recipes.filter((r) => r._id !== id);
            setRecipes(updated);
            setFiltered(updated);

        } catch (error) {
            console.log("Delete failed:", error.response?.data || error.message);
        }
    };
    return (
        <div>
            <Navbar />
            <div className="container">
                <SearchBar
                    onSearch={handleSearch}
                    onCategory={filterByCategory}
                />
                <div className="card-grid">
                    {filtered.map((recipe) => (
                        <RecipeCard key={recipe._id} recipe={recipe} onDelete={handleDelete}/>
                    ))}
                </div>

            </div>
        </div>
    );
};
export default Home;