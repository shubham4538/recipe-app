import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "./styles/Main.css";
import "./styles/App.css";

import Home from "./pages/Home";
import Account from "./pages/Account";
import CreateRecipe from "./pages/CreateRecipe";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Navbar from "./constant/Navbar";
import SavedRecipes from "./template/SavedRecipes";
import MyRecipes from "./template/MyRecipes";
import Recipe from "./pages/Recipe";
import NotFound from "./error/NotFound";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/account" element={<Account />}>
            <Route index element={<Navigate to="posts" />} />
            <Route path="posts" element={<MyRecipes />} />
            <Route path="saved" element={<SavedRecipes />} />
          </Route>
          <Route path="/recipe/:id" element={<Recipe />} />
          <Route path="/create" element={<CreateRecipe />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
