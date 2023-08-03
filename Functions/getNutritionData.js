// getNutritionData.js

const axios = require('axios');

exports.handler = async function(event, context) {
    // Get the food item from the query string
    const foodItem = event.queryStringParameters.food;

    // Define the API endpoint and parameters
    const apiEndpoint = 'https://api.edamam.com/api/recipes/v2';
    const apiParams = {
        type: 'public',
        q: foodItem,
        app_id: process.env.EDAMAM_APP_ID,
        app_key: process.env.EDAMAM_APP_KEY,
    };

    try {
        // Send a GET request to the API
        const response = await axios.get(apiEndpoint, { params: apiParams });

        // Return the data from the response
        return {
            statusCode: 200,
            body: JSON.stringify(response.data.hits),
        };
    } catch (error) {
        // If there was an error, return a 500 error status code and the error message
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};

