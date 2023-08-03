const axios = require('axios');

exports.handler = async function(event, context) {
    const foodItem = event.queryStringParameters.food;

    const apiUrl = `https://api.edamam.com/api/nutrition-data?app_id=${process.env.EDAMAM_APP_ID}&app_key=${process.env.EDAMAM_APP_KEY}&ingr=${foodItem}`;

    try {
        const response = await axios.get(apiUrl);
        return {
            statusCode: 200,
            body: JSON.stringify(response.data)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch nutritional data' })
        };
    }
};
