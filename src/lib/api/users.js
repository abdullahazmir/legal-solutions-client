// lib/api/users.js

import { serverFetch } from "../core/server";

export const getUsersList = async () => {
    const users = await serverFetch('/api/users');
    return users; // returns plain array
};