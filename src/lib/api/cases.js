import { serverFetch } from "../core/server";

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
export const getCases = async (queryString) => {
    try {
        // Always include page so server always returns { total, jobs }
        const params = new URLSearchParams(queryString);
        if (!params.get("page")) params.set("page", "1");

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/cases?${params.toString()}`,
            { cache: "no-store" }
        );
        if (!res.ok) return { cases: [], total: 0 };
        const data = await res.json();

        return {
            cases: data.jobs || [],
            total: data.total || 0,
        };
    } catch (err) {
        console.error("getCases error:", err.message);
        return { cases: [], total: 0 };
    }
};