// src/app/dashboard/lawyer/cases/page.jsx
import React from 'react';
import { Table, Chip, Button, Tooltip } from "@heroui/react";
import { Eye, Pencil, TrashBin } from "@gravity-ui/icons";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import LawyerAvatar from '@/components/LawyerAvatar';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// ── Fetch only cases belonging to the logged-in lawyer ──
const getCasesByLawyerId = async (lawyerId) => {
    try {
        const url = `${baseUrl}/api/cases?lawyerId=${lawyerId}`;
        console.log("Fetching cases from:", url);

        const res = await fetch(url, { cache: "no-store" });

        const contentType = res.headers.get("content-type");
        if (!contentType?.includes("application/json")) {
            console.error("Server did not return JSON. Status:", res.status);
            return [];
        }

        if (!res.ok) return [];

        return res.json();
    } catch (err) {
        console.error("getCasesByLawyerId error:", err.message);
        return [];
    }
};

const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
        case 'active':    return 'success';
        case 'available': return 'success';
        case 'closed':    return 'danger';
        case 'busy':      return 'danger';
        case 'pending':   return 'warning';
        default:          return 'default';
    }
};

const getAvailabilityColor = (availability) => {
    switch (availability?.toLowerCase()) {
        case 'available': return 'success';
        case 'busy':      return 'danger';
        default:          return 'warning';
    }
};

export default async function LawyerCasesPage() {
    // ── Get logged-in lawyer from session ──
    const session  = await auth.api.getSession({ headers: await headers() });
    const lawyerId = session?.user?.id;

    // ── Fetch only this lawyer's cases ──
    const cases = await getCasesByLawyerId(lawyerId);

    return (
        <main className="min-h-screen bg-zinc-950 p-6">
            <div className="max-w-7xl mx-auto space-y-4">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-2xl font-bold tracking-tight text-white">My Cases</h1>
                        <p className="text-sm text-zinc-400">
                            View, update, and manage your active legal cases.
                            <span className="ml-2 text-zinc-600">({cases.length} total)</span>
                        </p>
                    </div>
                    <Button
                        as="a"
                        href="/dashboard/lawyer/cases/new"
                        className="bg-white text-black font-semibold rounded-xl px-5 h-10 text-sm hover:bg-zinc-200 transition-colors"
                    >
                        + New Case
                    </Button>
                </div>

                {/* Table */}
                <Table aria-label="Lawyer cases table">
                    <Table.ResizableContainer>
                        <Table.Content className="min-w-[950px]">
                            <Table.Header>
                                <Table.Column isRowHeader defaultWidth="2fr" id="col-name" minWidth={200}>
                                    Lawyer / Name
                                    <Table.ColumnResizer />
                                </Table.Column>
                                <Table.Column defaultWidth="1.5fr" id="col-specialization" minWidth={160}>
                                    Specialization
                                    <Table.ColumnResizer />
                                </Table.Column>
                                <Table.Column defaultWidth="1fr" id="col-location" minWidth={120}>
                                    Location
                                    <Table.ColumnResizer />
                                </Table.Column>
                                <Table.Column defaultWidth="1fr" id="col-fee" minWidth={120}>
                                    Consultation Fee
                                    <Table.ColumnResizer />
                                </Table.Column>
                                <Table.Column defaultWidth="1fr" id="col-availability" minWidth={120}>
                                    Availability
                                    <Table.ColumnResizer />
                                </Table.Column>
                                <Table.Column defaultWidth="1fr" id="col-status" minWidth={110}>
                                    Status
                                    <Table.ColumnResizer />
                                </Table.Column>
                                <Table.Column defaultWidth="1fr" id="col-joined" minWidth={110}>
                                    Date Joined
                                    <Table.ColumnResizer />
                                </Table.Column>
                                <Table.Column defaultWidth="1.2fr" id="col-actions" minWidth={130}>
                                    Actions
                                </Table.Column>
                            </Table.Header>

                            <Table.Body emptyContent={"No cases found. Create your first case."}>
                                {cases.map((c) => {
                                    const caseId = c._id?.$oid || c._id;
                                    return (
                                        <Table.Row key={caseId}>

                                            {/* Name + photo */}
                                            <Table.Cell>
                                                <div className="flex items-center gap-3">
                                                    <LawyerAvatar src={c.lawyerPhotoUrl} alt={c.name} />
                                                    <div>
                                                        <p className="font-medium text-default-800 text-sm">{c.name}</p>
                                                        <p className="text-xs text-default-400">{c.experience} yrs exp.</p>
                                                    </div>
                                                </div>
                                            </Table.Cell>

                                            {/* Specialization */}
                                            <Table.Cell>
                                                <div className="flex flex-col gap-0.5">
                                                    <span className="text-sm font-medium capitalize">{c.specialization}</span>
                                                    {c.barLicense && (
                                                        <span className="text-xs text-default-400">License: {c.barLicense}</span>
                                                    )}
                                                </div>
                                            </Table.Cell>

                                            {/* Location */}
                                            <Table.Cell>
                                                <span className="text-sm text-default-600 capitalize">{c.location}</span>
                                            </Table.Cell>

                                            {/* Fee */}
                                            <Table.Cell>
                                                <div className="flex flex-col gap-0.5">
                                                    <span className="text-sm font-semibold">{c.currency} {c.consultationFee}</span>
                                                    {c.consultationHours && (
                                                        <span className="text-xs text-default-400">{c.consultationHours} hrs</span>
                                                    )}
                                                </div>
                                            </Table.Cell>

                                            {/* Availability */}
                                            <Table.Cell>
                                                <Chip color={getAvailabilityColor(c.availability)} size="sm" variant="soft" className="capitalize">
                                                    {c.availability || "Unknown"}
                                                </Chip>
                                            </Table.Cell>

                                            {/* Status */}
                                            <Table.Cell>
                                                <Chip color={getStatusColor(c.status)} size="sm" variant="soft" className="capitalize">
                                                    {c.status || "Unknown"}
                                                </Chip>
                                            </Table.Cell>

                                            {/* Date Joined */}
                                            <Table.Cell>
                                                <span className="text-xs text-default-500">
                                                    {c.dateJoined
                                                        ? new Date(c.dateJoined).toLocaleDateString("en-US", {
                                                            year: "numeric",
                                                            month: "short",
                                                            day: "numeric",
                                                        })
                                                        : "—"}
                                                </span>
                                            </Table.Cell>

                                            {/* Actions */}
                                            <Table.Cell>
                                                <div className="relative flex items-center gap-1">
                                                    <Tooltip content="View Case">
                                                        <Button isIconOnly size="sm" variant="light" aria-label="View case" as="a" href={`/dashboard/lawyer/cases/${caseId}`}>
                                                            <Eye className="text-default-400 w-4 h-4" />
                                                        </Button>
                                                    </Tooltip>
                                                    <Tooltip content="Edit Case">
                                                        <Button isIconOnly size="sm" variant="light" aria-label="Edit case" as="a" href={`/dashboard/lawyer/cases/${caseId}/edit`}>
                                                            <Pencil className="text-default-400 w-4 h-4" />
                                                        </Button>
                                                    </Tooltip>
                                                    <Tooltip content="Delete Case">
                                                        <Button isIconOnly size="sm" variant="light" color="danger" aria-label="Delete case">
                                                            <TrashBin className="text-danger w-4 h-4" />
                                                        </Button>
                                                    </Tooltip>
                                                </div>
                                            </Table.Cell>

                                        </Table.Row>
                                    );
                                })}
                            </Table.Body>
                        </Table.Content>
                    </Table.ResizableContainer>
                </Table>

            </div>
        </main>
    );
}