// lib/actions/users.js — replace everything with this
export const updateUserRole = async (userId, role) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/users/${userId}/role`, {
        method: "PATCH",
        headers: { 
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ role }),
    });
    return res.json();
};