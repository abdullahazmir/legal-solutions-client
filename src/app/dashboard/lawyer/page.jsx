'use client';
import React from 'react';
import { useSession } from "@/lib/auth-client";
import { Briefcase, Persons, Thunderbolt, CircleCheck } from '@gravity-ui/icons';
import { DashboardStats } from '@/components/dashboard/DashboardStats';

const lawyerStats = [
    { title: "Total Cases",    value: "48",    icon: Briefcase   },
    { title: "Total Clients",  value: "1,284", icon: Persons     },
    { title: "Active Cases",   value: "18",    icon: Thunderbolt },
    { title: "Cases Closed",   value: "32",    icon: CircleCheck },
];

const LawyerDashboardHomePage = () => {
    const { data: session, isPending } = useSession();
    const user = session?.user;

    return (
        <div>
            <h2 className="text-4xl">
                Welcome back,{" "}
                {isPending
                    ? <span className="text-zinc-500 animate-pulse">...</span>
                    : user?.name
                }
            </h2>
            <DashboardStats lawyerStats={lawyerStats} />
        </div>
    );
};

export default LawyerDashboardHomePage;