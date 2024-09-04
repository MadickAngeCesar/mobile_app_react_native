export const fetchData = async (url, method = 'GET', body = null) => {
    try {
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: body ? JSON.stringify(body) : null,
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Something went wrong');
        }
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};