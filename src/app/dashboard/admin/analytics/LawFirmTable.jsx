'use client';

import React from 'react';
import { Table, Button } from '@heroui/react';
import { CircleArrowDownFill } from '@gravity-ui/icons';
import { updateLawFirm } from '@/lib/actions/lawfirms';

const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short', day: '2-digit', year: 'numeric',
    });
};

const getStatusDetails = (status) => {
    switch (status?.toLowerCase()) {
        case 'approved': return { color: 'text-emerald-500', label: 'Approved' };
        case 'rejected': return { color: 'text-rose-500',    label: 'Rejected' };
        default:         return { color: 'text-amber-500',   label: 'Pending'  };
    }
};

const getInitials = (name) =>
    name ? name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'LF';

const LawFirmTable = ({ lawFirms }) => {

    const handleApprove = async (id) => {
      const result=  await updateLawFirm(id, { status: 'Approved' })
        console.log(`approved firm with id: ${id}`, result);
    };

    const handleReject = async (id) => {
        await updateLawFirm(id, { status: 'Rejected' })
        console.log('Reject:', id);
    };

    return (
        <div className="w-full bg-[#121214] text-neutral-200 p-6 rounded-xl border border-neutral-800/60">

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-lg font-semibold text-neutral-100">Law Firm Verifications</h2>
                    <p className="text-xs text-neutral-500 mt-0.5">Review and approve law firm registrations</p>
                </div>
                <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-neutral-800 text-neutral-400">
                    {lawFirms.length} firms
                </span>
            </div>

            <Table className="bg-transparent border-none">
                <Table.ScrollContainer>
                    <Table.Content aria-label="Law firm approval management table">
                        <Table.Header>
                            <Table.Column isRowHeader className="text-neutral-400 font-medium pb-4 border-b border-neutral-800">
                                Firm
                            </Table.Column>
                            <Table.Column className="text-neutral-400 font-medium pb-4 border-b border-neutral-800">
                                Practice Area
                            </Table.Column>
                            <Table.Column className="text-neutral-400 font-medium pb-4 border-b border-neutral-800">
                                Location
                            </Table.Column>
                            <Table.Column className="text-neutral-400 font-medium pb-4 border-b border-neutral-800">
                                Firm Size
                            </Table.Column>
                            <Table.Column className="text-neutral-400 font-medium pb-4 border-b border-neutral-800">
                                Status
                            </Table.Column>
                            <Table.Column className="text-neutral-400 font-medium pb-4 border-b border-neutral-800">
                                Submitted
                            </Table.Column>
                            <Table.Column className="text-neutral-400 font-medium pb-4 border-b border-neutral-800 text-right">
                                Actions
                            </Table.Column>
                        </Table.Header>

                        <Table.Body emptyContent="No law firm submissions found.">
                            {lawFirms.map((firm) => {
                                const firmId = firm._id?.$oid || firm._id;
                                const statusInfo = getStatusDetails(firm.status);

                                return (
                                    <Table.Row
                                        key={firmId}
                                        className="border-b border-neutral-800/50 hover:bg-neutral-900/30 transition-colors"
                                    >
                                        {/* FIRM NAME + LOGO */}
                                        <Table.Cell className="py-4 align-middle">
                                            <div className="flex items-center gap-3">
                                                {firm.logo ? (
                                                    <img
                                                        src={firm.logo}
                                                        alt={firm.firmName}
                                                        className="w-9 h-9 rounded object-cover bg-neutral-800"
                                                        onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                                                    />
                                                ) : null}
                                                <div
                                                    className="w-9 h-9 flex items-center justify-center bg-neutral-800 text-neutral-300 rounded font-semibold text-sm tracking-wider"
                                                    style={{ display: firm.logo ? 'none' : 'flex' }}
                                                >
                                                    {getInitials(firm.firmName)}
                                                </div>
                                                <div className="flex flex-col gap-0.5 min-w-0">
                                                    <span className="font-medium text-neutral-200 text-[14px] truncate max-w-[160px]">
                                                        {firm.firmName}
                                                    </span>
                                                    {firm.websiteUrl && (<a
                                                        
                                                            href={firm.websiteUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-[11px] text-neutral-500 hover:text-blue-400 transition truncate max-w-[160px]"
                                                        >
                                                            {firm.websiteUrl.replace('https://', '')}
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </Table.Cell>

                                        {/* PRACTICE AREA */}
                                        <Table.Cell className="py-4 align-middle">
                                            <span className="px-3 py-1 bg-amber-950/30 text-amber-500/80 border border-amber-900/30 rounded-full text-xs">
                                                {firm.practiceArea}
                                            </span>
                                        </Table.Cell>

                                        {/* LOCATION */}
                                        <Table.Cell className="py-4 align-middle text-neutral-400 text-sm">
                                            {firm.location}
                                        </Table.Cell>

                                        {/* FIRM SIZE */}
                                        <Table.Cell className="py-4 align-middle">
                                            <span className="px-3 py-1 bg-neutral-800/60 text-neutral-400 rounded-full text-xs">
                                                {firm.firmSize}
                                            </span>
                                        </Table.Cell>

                                        {/* STATUS */}
                                        <Table.Cell className="py-4 align-middle">
                                            <div className="flex items-center gap-2">
                                                <CircleArrowDownFill className={`w-2 h-2 ${statusInfo.color}`} />
                                                <span className={`text-sm font-medium ${statusInfo.color}`}>
                                                    {statusInfo.label}
                                                </span>
                                            </div>
                                        </Table.Cell>

                                        {/* DATE */}
                                        <Table.Cell className="py-4 align-middle text-neutral-400 text-sm">
                                            {formatDate(firm.createdAt?.$date || firm.createdAt)}
                                        </Table.Cell>

                                        {/* ACTIONS */}
                                        <Table.Cell className="py-4 align-middle text-right">
                                            <div className="flex justify-end gap-2">
                                                {firm.status?.toLowerCase() !== 'approved' && (
                                                    <Button
                                                        size="sm"
                                                        variant="light"
                                                        onClick={() => handleApprove(firmId)}
                                                        className="bg-emerald-950/30 hover:bg-emerald-900/50 text-emerald-500 border border-emerald-900/60 rounded px-3 py-1 text-xs font-medium transition-colors"
                                                    >
                                                        Approve
                                                    </Button>
                                                )}
                                                {firm.status?.toLowerCase() !== 'rejected' && (
                                                    <Button
                                                        size="sm"
                                                        variant="light"
                                                        onClick={() => handleReject(firmId)}
                                                        className="bg-rose-950/20 hover:bg-rose-900/40 text-rose-500 border border-rose-900/40 rounded px-3 py-1 text-xs font-medium transition-colors"
                                                    >
                                                        Reject
                                                    </Button>
                                                )}
                                                
                                                   <a href={`/dashboard/admin/lawfirms/${firmId}`}
                                                    className="inline-flex items-center px-3 py-1 text-xs font-medium text-neutral-400 border border-neutral-700 rounded hover:text-neutral-200 hover:border-neutral-500 transition-colors"
                                                >
                                                    View
                                                </a>
                                            </div>
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

export default LawFirmTable;