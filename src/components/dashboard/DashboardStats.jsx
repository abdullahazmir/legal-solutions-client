import React from 'react';
import { StatCard } from './StatCard';

export const DashboardStats = ({ lawyerStats }) => {
    return (
        <div className="w-full max-w-7xl mx-auto p-4">
            <h1>this to check</h1>
            {/* Responsive Grid layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {lawyerStats.map((stat, index) => (
                    <StatCard
                        key={stat.id || index}
                        title={stat.title}
                        value={stat.value}
                        icon={stat.icon}
                    />
                ))}
            </div>
        </div>
    );
};