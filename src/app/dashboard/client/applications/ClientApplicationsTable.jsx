"use client";

import React from 'react';
import { Table, Chip, Button } from '@heroui/react';
import {
    
    Briefcase,
    Clock,
    CheckCircle,
    XCircle,
    Hourglass,
    ScalesBalanced,
    Circle
} from '@gravity-ui/icons';

const formatRelativeTime = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMs = now - date;
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    if (diffInHours < 24) return diffInHours <= 1 ? "1 hour ago" : `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return diffInDays === 1 ? "1 day ago" : `${diffInDays} days ago`;
    const diffInWeeks = Math.floor(diffInDays / 7);
    return diffInWeeks === 1 ? "1 week ago" : `${diffInWeeks} weeks ago`;
};

const getCaseStyle = (caseName) => {
    const lower = (caseName || '').toLowerCase();
    if (lower.includes('criminal') || lower.includes('fraud'))
        return { icon: <Circle width="16" height="16" />, bg: 'bg-rose-950/60 text-rose-400' };
    if (lower.includes('family') || lower.includes('divorce'))
        return { icon: <Briefcase width="16" height="16" />, bg: 'bg-amber-950/60 text-amber-400' };
    if (lower.includes('property') || lower.includes('land'))
        return { icon: <ScalesBalanced width="16" height="16" />, bg: 'bg-blue-950/60 text-blue-400' };
    return { icon: <ScalesBalanced width="16" height="16" />, bg: 'bg-zinc-800 text-zinc-300' };
};

const getStatusChip = (status = 'pending') => {
    const normalized = status.toLowerCase();
    switch (normalized) {
        case 'pending':
            return <Chip variant="bordered" className="border-amber-600/70 text-amber-400 text-xs font-medium px-3 py-1 bg-amber-950/20">Pending</Chip>;
        case 'accepted':
            return <Chip variant="bordered" className="border-emerald-600/70 text-emerald-400 text-xs font-medium px-3 py-1 bg-emerald-950/20">Accepted</Chip>;
        case 'rejected':
            return <Chip variant="bordered" className="border-rose-700/70 text-rose-500 text-xs font-medium px-3 py-1 bg-rose-950/20">Rejected</Chip>;
        case 'in_progress':
            return <Chip variant="bordered" className="border-blue-600/70 text-blue-400 text-xs font-medium px-3 py-1 bg-blue-950/20">In Progress</Chip>;
        case 'closed':
            return <Chip variant="bordered" className="border-zinc-600 text-zinc-400 text-xs font-medium px-3 py-1">Closed</Chip>;
        default:
            return <Chip variant="bordered" className="border-zinc-600 text-zinc-300 text-xs font-medium px-3 py-1">{status}</Chip>;
    }
};

const ClientApplicationsTable = ({ cases }) => {
    if (!cases?.length) {
        return (
            <div className="w-full bg-[#121212] p-10 rounded-xl border border-zinc-800/80 text-center">
                <ScalesBalanced width="32" height="32" className="text-zinc-600 mx-auto mb-3" />
                <p className="text-zinc-400 text-sm">You haven't applied to any cases yet.</p>
                <p className="text-zinc-600 text-xs mt-1">Browse open cases to get started.</p>
            </div>
        );
    }

    return (
        <div className="w-full bg-[#121212] p-6 rounded-xl border border-zinc-800/80 text-zinc-100">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-zinc-200">
                    My Applications
                    <span className="ml-2 text-sm font-normal text-zinc-500">({cases.length})</span>
                </h2>
                <a href="/cases"
                    className="text-xs text-amber-600 hover:text-amber-400 transition border border-amber-800/40 px-3 py-1.5 rounded-lg">
                    Browse Cases
                </a>
            </div>

            <Table
                className="w-full"
                classnames={{
                    base: "bg-transparent",
                    table: "border-collapse",
                    thead: "[&>tr]:border-b [&>tr]:border-zinc-800/60",
                    th: "bg-transparent text-zinc-500 font-medium text-xs uppercase tracking-wider py-4 border-b border-zinc-800/60 first:pl-4 last:pr-4",
                    tr: "border-b border-zinc-800/40 hover:bg-zinc-900/40 transition-colors last:border-none",
                    td: "py-4 align-middle first:pl-4 last:pr-4 text-zinc-300 text-sm"
                }}
            >
                <Table.ScrollContainer>
                    <Table.Content aria-label="Client case applications table">
                        <Table.Header>
                            <Table.Column isRowHeader className="w-[32%]">Case</Table.Column>
                            <Table.Column className="w-[20%]">Lawyer</Table.Column>
                            <Table.Column className="w-[18%]">Message</Table.Column>
                            <Table.Column className="w-[15%]">Applied</Table.Column>
                            <Table.Column className="w-[10%]">Status</Table.Column>
                            <Table.Column className="w-[5%] text-right">Action</Table.Column>
                        </Table.Header>

                        <Table.Body emptyContent="No applications found.">
                            {cases.map((app) => {
                                const style = getCaseStyle(app.caseName);

                                return (
                                    <Table.Row key={app._id?.$oid || app._id}>

                                        {/* CASE NAME */}
                                        <Table.Cell>
                                            <div className="flex items-center gap-3">
                                                <div className={`p-2.5 rounded-lg flex items-center justify-center shrink-0 ${style.bg}`}>
                                                    {style.icon}
                                                </div>
                                                <div className="flex flex-col gap-0.5 min-w-0">
                                                    <span className="font-medium text-zinc-100 text-[14px] truncate">
                                                        {app.caseName}
                                                    </span>
                                                    <span className="text-xs text-zinc-600 font-normal truncate">
                                                        ID: {app.caseId?.slice(-6)}
                                                    </span>
                                                </div>
                                            </div>
                                        </Table.Cell>

                                        {/* LAWYER */}
                                        <Table.Cell>
                                            <span className="text-zinc-300 text-[13px]">
                                                {app.lawyerName || <span className="text-zinc-600 italic">Unassigned</span>}
                                            </span>
                                        </Table.Cell>

                                        {/* MESSAGE PREVIEW */}
                                        <Table.Cell>
                                            <span className="text-zinc-500 text-[13px] line-clamp-1 max-w-[140px] block truncate">
                                                {app.message || <span className="italic">No message</span>}
                                            </span>
                                        </Table.Cell>

                                        {/* APPLIED */}
                                        <Table.Cell>
                                            <span className="text-zinc-500 text-[13px]">
                                                {formatRelativeTime(app.createdAt?.$date || app.createdAt)}
                                            </span>
                                        </Table.Cell>

                                        {/* STATUS */}
                                        <Table.Cell>
                                            {getStatusChip(app.status)}
                                        </Table.Cell>

                                        {/* ACTION */}
                                        <Table.Cell className="text-right">
                                            <Button
                                                size="sm"
                                                variant="light"
                                                className="text-zinc-400 hover:text-zinc-100 font-normal text-sm"
                                                onClick={() => console.log('View:', app._id)}
                                            >
                                                View
                                            </Button>
                                        </Table.Cell>

                                    </Table.Row>
                                );
                            })}
                        </Table.Body>
                    </Table.Content>
                </Table.ScrollContainer>
            </Table>
        </div>
    );
};

export default ClientApplicationsTable;