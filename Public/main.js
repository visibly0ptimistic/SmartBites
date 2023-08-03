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
                const card = document.createElement('div');
                card.className = 'card col-md-6 col-lg-4 mb-4';
                card.innerHTML = `
                    <img class="card-img-top" src="${recipe.recipe.image}" alt="${recipe.recipe.label}">
                    <div class="card-body">
                        <h5 class="card-title">${recipe.recipe.label}</h5>
                        <p class="card-text">${recipe.recipe.calories.toFixed(2)} calories</p>
                        <p class="card-text">${recipe.recipe.dietLabels.join(', ')}</p>
                        <p class="card-text">${recipe.recipe.healthLabels.join(', ')}</p>
                        <p class="card-text">${recipe.recipe.cautions.join(', ')}</p>
                    </div>
                `;
                nutritionDataDiv.append(card);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
