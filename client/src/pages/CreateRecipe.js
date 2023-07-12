import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CreateRecipe.css";
import axios from "axios";

import { LoginContext } from "../context/LoginContext";
import RenderInput from "../data/RenderInput";

function CreateRecipe() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ message: null });
  const { user } = useContext(LoginContext);
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    ingredients: [""],
    steps: [""],
    image_url: "",
    cooking_time: 0,
  });

  const submitRecipe = (e) => {
    e.preventDefault();
    console.log(recipe);
    setError({ message: null });
    setLoading(true);

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    axios
      .post("https://recipe-app-kappa-nine.vercel.app/recipe", recipe, config)
      .then((result) => {
        alert("Recipe created successfully!");
        navigate("/account/posts");
      })
      .catch((err) => {
        setError({ message: err });
      });
  };

  const inputChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const itemChange = (item, value, index) => {
    const newItem = recipe[item];
    newItem[index] = value;
    setRecipe({ ...recipe, [item]: newItem });
  };

  const addItem = (item) => {
    setRecipe({ ...recipe, [item]: [...recipe[item], ""] });
  };

  const removeItem = (item, step) => {
    setRecipe((recipe) => ({
      ...recipe,
      [item]: recipe[item].filter((val) => val !== step),
    }));
  };

  return (
    <div className="form-container">
      <h2>Create yuor Recipe</h2>
      {error.message ? (
        <div className="error">
          <i className="far fa-circle-exclamation"></i>
          <span>{error.message}</span>
        </div>
      ) : (
        <></>
      )}
      <form className="recipe-form" onSubmit={(e) => submitRecipe(e)}>
        {RenderInput.map((field, key) => {
          return (
            <div className="input-container" key={key}>
              <span>{field.title}</span>
              {field.title === "Ingredients" || field.title === "Steps" ? (
                <>
                  {recipe[field.id].map((item, index) => {
                    return (
                      <div className="button-input" key={index}>
                        <input
                          type={field.type}
                          name={field.id}
                          id={field.id}
                          value={item}
                          onChange={(e) =>
                            itemChange(field.id, e.target.value, index)
                          }
                          required
                        />
                        <button
                          type="button"
                          id="remove-button"
                          onClick={() => removeItem(field.id, item)}
                        >
                          <i className="far fa-trash-can"></i>
                        </button>
                      </div>
                    );
                  })}
                  <button
                    type="button"
                    id="add-button"
                    onClick={() => addItem(field.id)}
                  >
                    add {field.id}
                  </button>
                </>
              ) : (
                <div className="button-input">
                  <input
                    type={field.type}
                    name={field.id}
                    id={field.id}
                    onChange={(e) => inputChange(e)}
                    required
                  />
                </div>
              )}
            </div>
          );
        })}
        <button className="submit-button" type="submit">
          {loading ? (
            <i className="fa-duotone fa-spinner-third fa-spin"></i>
          ) : (
            "submit"
          )}
        </button>
      </form>
    </div>
  );
}

export default CreateRecipe;
