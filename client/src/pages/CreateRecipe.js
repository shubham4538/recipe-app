import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CreateRecipe.css";
import axios from "axios";

import { LoginContext } from "../context/LoginContext";
import RenderInput from "../components/RenderInput";

function CreateRecipe() {
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

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    axios
      .post("http://localhost:3001/recipe", recipe, config)
      .then((result) => {
        alert("Recipe created successfully!");
        navigate("/account/posts");
      })
      .catch((err) => {
        console.log(err);
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

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreateRecipe;