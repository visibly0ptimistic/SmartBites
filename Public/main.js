// main.js

document.getElementById('food-form').addEventListener('submit', (event) => {
    // Prevent the form from submitting normally
    event.preventDefault();

    // Get the food item from the form
    const foodItem = document.getElementById('food-input').value;

    // Fetch the nutrition data for the food item
    fetch('/.netlify/functions/getNutritionData?food=' + encodeURIComponent(foodItem))
        .then(response => response.json())
        .then(recipes => {
            // Get the nutrition data div
            const nutritionDataDiv = document.getElementById('nutrition-data');

            // Clear any existing data
            nutritionDataDiv.innerHTML = '';

            // Add each recipe to the div
            recipes.forEach(recipe => {
                nutritionDataDiv.innerHTML += `
                    <h2>${recipe.recipe.label}</h2>
                    <p>${recipe.recipe.calories} calories</p>
                    <p>${recipe.recipe.dietLabels.join(', ')}</p>
                    <p>${recipe.recipe.healthLabels.join(', ')}</p>
                    <p>${recipe.recipe.cautions.join(', ')}</p>
                    <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}">
                `;
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

