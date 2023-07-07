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

import Navbar from "./components/Navbar";
import SavedRecipes from "./components/SavedRecipes";
import MyRecipes from "./components/MyRecipes";

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
          <Route path="/create" element={<CreateRecipe />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
