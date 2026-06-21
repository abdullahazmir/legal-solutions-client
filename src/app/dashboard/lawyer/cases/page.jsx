// src/app/dashboard/lawyer/cases/page.js
import React from 'react';
import { Table, Chip, Button, Tooltip } from "@heroui/react";
import { Eye, Pencil, TrashBin } from "@gravity-ui/icons";
import LawyerAvatar from '@/components/LawyerAvatar';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// Fetch all cases — your MongoDB docs don't have lawfirmId yet,
// so we fetch all and display everything
const getAllCases = async () => {
    try {
        const res = await fetch(`${baseUrl}/api/cases`, {
            cache: "no-store",
        });
        if (!res.ok) {
            console.error(`Failed to fetch cases: ${res.status} ${res.statusText}`);
            const errorText = await res.text();
            console.error("Server Error Response:", errorText);
            return [];
        }
        return res.json();
    } catch (err) {
        console.error("getAllCases error:", err);
        return [];
    }
};

const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
        case 'active': return 'success';
        case 'available': return 'success';
        case 'closed': return 'danger';
        case 'busy': return 'danger';
        case 'pending': return 'warning';
        default: return 'default';
    }
};

const getAvailabilityColor = (availability) => {
    switch (availability?.toLowerCase()) {
        case 'available': return 'success';
        case 'busy': return 'danger';
        default: return 'warning';
    }
};

export default async function LawyerCasesPage() {
    const cases = await getAllCases();

    return (
        <main className="min-h-screen bg-zinc-950 p-6">
            <div className="max-w-7xl mx-auto space-y-4">

                {/* ── Header ── */}
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-2xl font-bold tracking-tight text-white">Manage All Cases</h1>
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

                {/* ── Table ── */}
                <Table aria-label="Lawfirm cases management table">
                    <Table.ResizableContainer>
                        <Table.Content className="min-w-[950px]">
                            <Table.Header>
                                <Table.Column isRowHeader defaultWidth="2fr" id="name" minWidth={200}>
                                    Lawyer / Name
                                    <Table.ColumnResizer />
                                </Table.Column>
                                <Table.Column defaultWidth="1.5fr" id="specialization" minWidth={160}>
                                    Specialization
                                    <Table.ColumnResizer />
                                </Table.Column>
                                <Table.Column defaultWidth="1fr" id="location" minWidth={120}>
                                    Location
                                    <Table.ColumnResizer />
                                </Table.Column>
                                <Table.Column defaultWidth="1fr" id="fee" minWidth={120}>
                                    Consultation Fee
                                    <Table.ColumnResizer />
                                </Table.Column>
                                <Table.Column defaultWidth="1fr" id="availability" minWidth={120}>
                                    Availability
                                    <Table.ColumnResizer />
                                </Table.Column>
                                <Table.Column defaultWidth="1fr" id="status" minWidth={110}>
                                    Status
                                    <Table.ColumnResizer />
                                </Table.Column>
                                <Table.Column defaultWidth="1fr" id="joined" minWidth={110}>
                                    Date Joined
                                    <Table.ColumnResizer />
                                </Table.Column>
                                <Table.Column defaultWidth="1.2fr" id="case-actions" minWidth={130}>
                                    Actions
                                </Table.Column>
                            </Table.Header>

                            <Table.Body emptyContent={"No cases found. Create your first case."}>
                                {cases.map((c) => {
                                    const caseId = c._id?.$oid || c._id;
                                    return (
                                        <Table.Row key={caseId}>

                                            {/* Lawyer / Name + photo */}
                                            <Table.Cell>
                                                <div className="flex items-center gap-3">
                                                    <LawyerAvatar src={c.photoUrl} alt={c.name} />  {/* ✅ replaces the <img> */}
                                                    <div>
                                                        <p className="font-medium text-default-800 text-sm">{c.name}</p>
                                                        <p className="text-xs text-default-400">{c.experience} yrs exp.</p>
                                                    </div>
                                                </div>
                                            </Table.Cell>

                                            {/* Specialization + Bar License */}
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

                                            {/* Consultation Fee */}
                                            <Table.Cell>
                                                <div className="flex flex-col gap-0.5">
                                                    <span className="text-sm font-semibold">
                                                        {c.currency} {c.consultationFee}
                                                    </span>
                                                    {c.consultationHours && (
                                                        <span className="text-xs text-default-400">{c.consultationHours} hrs</span>
                                                    )}
                                                </div>
                                            </Table.Cell>

                                            {/* Availability */}
                                            <Table.Cell>
                                                <Chip
                                                    color={getAvailabilityColor(c.availability)}
                                                    size="sm"
                                                    variant="soft"
                                                    className="capitalize"
                                                >
                                                    {c.availability || "Unknown"}
                                                </Chip>
                                            </Table.Cell>

                                            {/* Status */}
                                            <Table.Cell>
                                                <Chip
                                                    color={getStatusColor(c.status)}
                                                    size="sm"
                                                    variant="soft"
                                                    className="capitalize"
                                                >
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
                                                        <Button
                                                            isIconOnly
                                                            size="sm"
                                                            variant="light"
                                                            aria-label="View case"
                                                            as="a"
                                                            href={`/dashboard/lawyer/cases/${caseId}`}
                                                        >
                                                            <Eye className="text-default-400 w-4 h-4" />
                                                        </Button>
                                                    </Tooltip>
                                                    <Tooltip content="Edit Case">
                                                        <Button
                                                            isIconOnly
                                                            size="sm"
                                                            variant="light"
                                                            aria-label="Edit case"
                                                            as="a"
                                                            href={`/dashboard/lawyer/cases/${caseId}/edit`}
                                                        >
                                                            <Pencil className="text-default-400 w-4 h-4" />
                                                        </Button>
                                                    </Tooltip>
                                                    <Tooltip content="Delete Case">
                                                        <Button
                                                            isIconOnly
                                                            size="sm"
                                                            variant="light"
                                                            color="danger"
                                                            aria-label="Delete case"
                                                        >
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