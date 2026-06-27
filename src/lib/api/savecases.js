// lib/api/savecases.js

import { protectedFetch } from "../core/server";

export const getSavedCases = () => protectedFetch("/api/savecases");