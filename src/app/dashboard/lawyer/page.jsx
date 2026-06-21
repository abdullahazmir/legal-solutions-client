'use client';
import React from 'react';
import { useSession } from "@/lib/auth-client";
import { Briefcase, Persons, Thunderbolt, CircleCheck } from '@gravity-ui/icons';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
const LawyerDashboardHomePage = () => {

    const { data: session, isPending } = useSession();

    if (isPending) {
        return <div>Loading...</div>
    }

    const lawyerStats = [
        { title: "Total Cases", value: "48", icon: Briefcase },
        { title: "Total Clients", value: "1,284", icon: Persons },
        { title: "Active Cases", value: "18", icon: Thunderbolt },
        { title: "Cases Closed", value: "32", icon: CircleCheck },
    ];

    const user = session?.user;
    console.log("Session data in LawyerDashboardHomePage:", session);

    return (
        <div>
            <h2 className="text-4xl">Welcome back, {user?.name}</h2>
            <DashboardStats lawyerStats={lawyerStats} />
        </div>
    );
};

export default LawyerDashboardHomePage;