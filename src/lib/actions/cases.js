"use server";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";
export const createCase = async (caseData) => {
    const res = await fetch(`${baseUrl}/api/cases`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(caseData),
    });
    return res.json();

}