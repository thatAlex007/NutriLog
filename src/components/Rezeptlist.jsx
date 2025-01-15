// Frontend Component
import React, { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const { userEmail } = useUser();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userEmail) {
      setError("Fehler: User not logged in");
    } else {
      fetchRecipes();
    }
  }, [userEmail]);

  const fetchRecipes = async () => {
    try {
      const response = await fetch(`http://localhost:3000/get-recipes?email=${userEmail}`);
      const data = await response.json();
      if (response.ok) {
        setRecipes(data);
      } else {
        console.error("Failed to fetch recipes:", data.message);
      }
    } catch (err) {
      console.error("Error fetching recipes:", err);
    }
  };

  const addRecipe = async () => {
    try {
      const response = await fetch("http://localhost:3000/add-recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ r_u_email: userEmail, r_title: newTitle, r_desc: newDesc }),
      });
      const data = await response.json();
      if (response.ok) {
        setRecipes([...recipes, data]);
        setNewTitle("");
        setNewDesc("");
      } else {
        console.error("Failed to add recipe:", data.message);
      }
    } catch (err) {
      console.error("Error adding recipe:", err);
    }
  };

  const removeRecipe = async (id) => {
    try {
      const response = await fetch("http://localhost:3000/remove-recipe", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (response.ok) {
        setRecipes(recipes.filter((recipe) => recipe.r_nr !== id));
      } else {
        const data = await response.json();
        console.error("Failed to remove recipe:", data.message);
      }
    } catch (err) {
      console.error("Error removing recipe:", err);
    }
  };

  const startEditing = (recipe) => {
    setEditingId(recipe.r_nr);
    setEditTitle(recipe.r_title);
    setEditDesc(recipe.r_desc);
  };

  const saveEdit = async () => {
    try {
      const response = await fetch("http://localhost:3000/edit-recipe", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editingId, r_title: editTitle, r_desc: editDesc }),
      });
      if (response.ok) {
        setRecipes(recipes.map((recipe) => 
          recipe.r_nr === editingId ? { ...recipe, r_title: editTitle, r_desc: editDesc } : recipe
        ));
        setEditingId(null);
        setEditTitle("");
        setEditDesc("");
      } else {
        const data = await response.json();
        console.error("Failed to edit recipe:", data.message);
      }
    } catch (err) {
      console.error("Error editing recipe:", err);
    }
  };

  if (error) {
    return <div style={{ textAlign: 'center', fontSize: '18px', color: '#ff3b30' }}>{error}</div>;
  }

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', margin: '0 auto', maxWidth: '600px', padding: '20px', color: 'white', backgroundColor: '#333', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
      <header style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>Rezeptliste</h1>
      </header>

      <div style={{ marginBottom: '30px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '10px', color: '#ddd' }}>Neues Rezept hinzufügen</h2>
        <input
          type="text"
          placeholder="Titel"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          style={{ display: 'block', width: '80%', margin: '10px auto', padding: '10px', border: '1px solid #555', borderRadius: '8px', fontSize: '16px', backgroundColor: '#444', color: 'white' }}
        />
        <textarea
          placeholder="Beschreibung"
          value={newDesc}
          onChange={(e) => setNewDesc(e.target.value)}
          style={{ display: 'block', width: '80%', margin: '10px auto', padding: '10px', border: '1px solid #555', borderRadius: '8px', fontSize: '16px', backgroundColor: '#444', color: 'white' }}
        />
        <button
          onClick={addRecipe}
          style={{ display: 'block', width: '80%', margin: '10px auto', padding: '10px', backgroundColor: '#007aff', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', cursor: 'pointer' }}
        >
          Hinzufügen
        </button>
      </div>

      <div style={{ marginBottom: '30px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '10px', color: '#ddd' }}>Rezepte</h2>
        <ul style={{ listStyle: 'none', padding: '0', textAlign: 'left', margin: '0 auto', width: '80%' }}>
          {recipes.map((recipe) => (
            <li key={recipe.r_nr} style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px', padding: '10px', border: '1px solid #555', borderRadius: '8px', backgroundColor: '#444', color: 'white' }}>
              {editingId === recipe.r_nr ? (
                <div>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    style={{ display: 'block', width: '90%', margin: '10px auto', padding: '10px', border: '1px solid #555', borderRadius: '8px', fontSize: '16px', backgroundColor: '#555', color: 'white' }}
                  />
                  <textarea
                    value={editDesc}
                    onChange={(e) => setEditDesc(e.target.value)}
                    style={{ display: 'block', width: '90%', margin: '10px auto', padding: '10px', border: '1px solid #555', borderRadius: '8px', fontSize: '16px', backgroundColor: '#555', color: 'white' }}
                  />
                  <button
                    onClick={saveEdit}
                    style={{ display: 'block', width: '45%', margin: '10px auto', padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', cursor: 'pointer' }}
                  >
                    Speichern
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    style={{ display: 'block', width: '45%', margin: '10px auto', padding: '10px', backgroundColor: '#ff3b30', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', cursor: 'pointer' }}
                  >
                    Abbrechen
                  </button>
                </div>
              ) : (
                <div style={{ textAlign: 'left' }}>
                  <h3 style={{ fontSize: '18px', margin: '0 0 10px 0' }}>{recipe.r_title}</h3>
                  <p style={{ margin: '0 0 10px 0', fontSize: '16px' }}>{recipe.r_desc}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button
                      onClick={() => startEditing(recipe)}
                      style={{ padding: '10px', backgroundColor: '#007aff', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', cursor: 'pointer' }}
                    >
                      Bearbeiten
                    </button>
                    <button
                      onClick={() => removeRecipe(recipe.r_nr)}
                      style={{ padding: '10px', backgroundColor: '#ff3b30', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', cursor: 'pointer' }}
                    >
                      Entfernen
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecipeList;
