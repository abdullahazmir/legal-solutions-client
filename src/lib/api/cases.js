const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const getLawfirmCases = async (lawfirmId, status='active') => {
    const url = `${baseUrl}/api/cases?lawfirmId=${lawfirmId}&status=${status}`;
    const res = await fetch(url);
    
    // Check if the response is successful
    if (!res.ok) {
        console.error(`Failed to fetch cases: ${res.status} ${res.statusText}`);
        // Log the actual HTML text to see the server error
        const errorText = await res.text();
        console.error("Server Error Response:", errorText);
        return []; // Return empty array to keep the app alive
    }

    return res.json();
};