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
            // Display the nutritional data
            document.getElementById('nutrition-data').textContent = JSON.stringify(data, null, 2);
        })
        .catch(function(error) {
            // Display an error message
            document.getElementById('nutrition-data').textContent = 'Error: ' + error.message;
        });
});
