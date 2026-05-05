import { useState } from "react";

export default function Recipe({ ingredients }) {
  const [recipe, setRecipe] = useState("");
  const [loading, setLoading] = useState(false);

  async function generateRecipe() {
    if (!ingredients || ingredients.length === 0) {
      setRecipe("Add some ingredients first");
      return;
    }

    try {
      setLoading(true);

      const query = ingredients[0]; 
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`
      );

      const data = await res.json();

      if (!data.meals) {
        setRecipe("No recipes found 😢");
        return;
      }


      const meal = data.meals[0];


      const detailRes = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
      );

      const detailData = await detailRes.json();
      const fullMeal = detailData.meals[0];

      setRecipe(`
🍽️ ${fullMeal.strMeal}

📋 Instructions:
${fullMeal.strInstructions}
      `);

    } catch (err) {
      console.log(err);
      setRecipe("⚠️ Error fetching recipe");
    } finally {
      setLoading(false);
    }
  }

  return (
  <div className="recipe-container">
    <button onClick={generateRecipe} disabled={loading} className="btn">
      {loading ? "Generating..." : "Get Recipe"}
    </button>

    {recipe && (
      <div className="recipe-card">
        <h2 className="title">
          {recipe.split("\n")[0].replace("🍽️", "")}
        </h2>

        <div className="section">
          <h3>Instructions</h3>
          <p>
            {recipe
              .split("📋 Instructions:")[1]
              ?.trim()}
          </p>
        </div>
      </div>
    )}
  </div>
);
}