// This helper formats our output exactly how API Gateway expects it
export const formatResponse = (statusCode, body) => {
    return {
        statusCode,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*" // Allows web browsers to call our API
        },
        body: JSON.stringify(body)
    };
};