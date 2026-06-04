import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home";
import RecipeDetails from "./pages/RecipeDetails.jsx";
import EditRecipe from "./pages/EditRecipe.jsx";
import MyRecipes from "./pages/MyRecipes";
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/my" element={<MyRecipes />} />
                <Route path="/recipe/:id" element={<RecipeDetails />} />
                <Route path="/recipe/edit/:id" element={<EditRecipe />} />
            </Routes>
        </BrowserRouter>
    );
}
export default App;