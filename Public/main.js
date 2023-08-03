// main.js

document.getElementById('food-form').addEventListener('submit', function(event) {
    // Prevent the form from submitting normally
    event.preventDefault();

    // Get the food item from the form
    const foodItem = document.getElementById('food-input').value;

    // Call the serverless function to get nutritional data
    fetch('/.netlify/functions/getNutritionData?food=' + encodeURIComponent(foodItem))
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Failed to fetch nutritional data');
            }
            return response.json();
        })
        .then(function(data) {
            // Create a formatted output for the nutritional data
            const nutritionDataDiv = document.getElementById('nutrition-data');
            nutritionDataDiv.innerHTML = ''; // Clear previous data

            const title = document.createElement('h2');
            title.textContent = `Nutritional Information for ${foodItem}`;
            nutritionDataDiv.appendChild(title);

            const detailsList = document.createElement('ul');

            // Calories
            const caloriesItem = document.createElement('li');
            caloriesItem.innerHTML = `<strong>Calories:</strong> ${data.calories}`;
            detailsList.appendChild(caloriesItem);

            // Diet Labels
            if (data.dietLabels.length > 0) {
                const dietLabelsItem = document.createElement('li');
                dietLabelsItem.innerHTML = `<strong>Diet Labels:</strong> ${data.dietLabels.join(', ')}`;
                detailsList.appendChild(dietLabelsItem);
            }

            // Health Labels
            if (data.healthLabels.length > 0) {
                const healthLabelsItem = document.createElement('li');
                healthLabelsItem.innerHTML = `<strong>Health Labels:</strong> ${data.healthLabels.join(', ')}`;
                detailsList.appendChild(healthLabelsItem);
            }

            // Cautions
            if (data.cautions.length > 0) {
                const cautionsItem = document.createElement('li');
                cautionsItem.innerHTML = `<strong>Cautions:</strong> ${data.cautions.join(', ')}`;
                detailsList.appendChild(cautionsItem);
            }

            nutritionDataDiv.appendChild(detailsList);
        })
        .catch(function(error) {
            // Display an error message
            document.getElementById('nutrition-data').innerHTML = '<p>Error: ' + error.message + '</p>';
        });
});
