// src/app/dashboard/lawyer/lawfirm/page.jsx
import React from 'react';
import LawFirmProfile from './LawFirmProfile';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

// Fetch firm directly here — no separate import needed
const getLawyerFirm = async (lawyerId) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/lawfirms?lawyerId=${lawyerId}`,
            { cache: 'no-store' }
        );

        // Server returned HTML (error page) instead of JSON
        const contentType = res.headers.get('content-type');
        if (!contentType?.includes('application/json')) {
            console.error('Server did not return JSON. Status:', res.status);
            return null;
        }

        if (!res.ok) return null;

        const firms = await res.json();
        return firms?.[0] || null;
    } catch (err) {
        console.error('getLawyerFirm error:', err);
        return null;
    }
};

const LawFirmPage = async () => {
//    const session = await auth.api.getSession({ headers: await headers() });
   
   const session = await auth.api.getSession({ headers: await headers() });
   const user    = session?.user;
   console.log("Full session user:", session?.user); // ← check terminal

    // ✅ Call the local function, NOT getLawyerLawFirms from import
    const firm = await getLawyerFirm(user?.id);

    return (
        <div>
            <LawFirmProfile lawyer={user} lawyerFirm={firm} />
        </div>
    );
};

export default LawFirmPage;