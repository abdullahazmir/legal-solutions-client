"use client";

import React, { useState } from "react";
import { Person, Briefcase, ChevronLeft, ChevronRight, CrownDiamond } from "@gravity-ui/icons";
import { updateUserRole } from "@/lib/actions/users";

const getRoleBadge = (role) => {
    switch (role?.toLowerCase()) {
        case "admin":
            return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-purple-950/40 text-purple-300 border border-purple-800/50">
                    <CrownDiamond width={11} height={11} /> Admin
                </span>
            );
        case "lawyer":
            return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-zinc-100 text-zinc-900 shadow-sm">
                    <Briefcase width={11} height={11} /> Lawyer
                </span>
            );
        default:
            return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-zinc-800/50 text-zinc-400 border border-zinc-700/50">
                    <Person width={11} height={11} /> Client
                </span>
            );
    }
};

export default function AdminUsersTable({ users }) {
    const [currentPage, setCurrentPage]     = useState(1);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [pendingChange, setPendingChange] = useState(null); // { userId, userName, newRole }
    const [isUpdating, setIsUpdating]       = useState(false);

    const perPage    = 10;
    const totalPages = Math.ceil(users.length / perPage);
    const paginated  = users.slice((currentPage - 1) * perPage, currentPage * perPage);

    const formatDate = (dateStr) => {
        if (!dateStr) return "N/A";
        return new Date(dateStr).toLocaleDateString("en-US", {
            month: "short", day: "2-digit", year: "numeric",
        });
    };

    const initiateRoleChange = (userId, userName, newRole) => {
        setPendingChange({ userId, userName, newRole });
        setIsConfirmOpen(true);
    };

  const confirmRoleChange = async () => {
    if (!pendingChange) return;

    setIsUpdating(true);
    try {
        await updateUserRole(pendingChange.userId, pendingChange.newRole);
        window.location.reload();
    } catch (err) {
        console.error("Role update failed:", err);
    } finally {
        setIsUpdating(false);
        setIsConfirmOpen(false);
        setPendingChange(null);
    }
};
    return (
        <div className="relative w-full">
            <div className="w-full bg-[#1e1e1e] border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left text-sm text-zinc-400">

                        <thead>
                            <tr className="border-b border-zinc-800 text-zinc-500">
                                <th className="py-5 px-6 font-normal">User</th>
                                <th className="py-5 px-6 font-normal">Email</th>
                                <th className="py-5 px-6 font-normal">Role</th>
                                <th className="py-5 px-6 font-normal">Joined</th>
                                <th className="py-5 px-6 font-normal">Email Verified</th>
                                <th className="py-5 px-6 font-normal text-right">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-zinc-800/60">
                            {paginated.map((user) => {
                                const userRole = user.role?.toLowerCase() || "client";

                                return (
                                    <tr key={user.id} className="hover:bg-zinc-900/40 transition-colors duration-150">

                                        {/* User */}
                                        <td className="py-4 px-6 whitespace-nowrap">
                                            <div className="flex items-center gap-3">
                                                {user.image ? (
                                                    <img
                                                        src={user.image}
                                                        alt={user.name}
                                                        className="w-8 h-8 rounded-full object-cover border border-zinc-700"
                                                    />
                                                ) : (
                                                    <div className="w-8 h-8 rounded-full bg-zinc-700/60 flex items-center justify-center text-xs text-zinc-300 font-bold">
                                                        {user.name?.split(" ").map((n) => n[0]).join("").toUpperCase() || "U"}
                                                    </div>
                                                )}
                                                <span className="text-zinc-200 font-medium text-sm">
                                                    {user.name || "Unknown"}
                                                </span>
                                            </div>
                                        </td>

                                        {/* Email */}
                                        <td className="py-4 px-6 text-zinc-400 whitespace-nowrap text-xs">
                                            {user.email}
                                        </td>

                                        {/* Role */}
                                        <td className="py-4 px-6 whitespace-nowrap">
                                            {getRoleBadge(userRole)}
                                        </td>

                                        {/* Joined */}
                                        <td className="py-4 px-6 text-zinc-400 whitespace-nowrap text-xs">
                                            {formatDate(user.createdAt)}
                                        </td>

                                        {/* Email Verified */}
                                        <td className="py-4 px-6 whitespace-nowrap">
                                            {user.emailVerified ? (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium rounded-full bg-emerald-950/30 text-emerald-400 border border-emerald-900/40">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Verified
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium rounded-full bg-zinc-800/50 text-zinc-500 border border-zinc-700/50">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" /> Unverified
                                                </span>
                                            )}
                                        </td>

                                        {/* Actions */}
                                        <td className="py-4 px-6 text-right whitespace-nowrap text-xs font-medium">
                                            <div className="flex items-center justify-end gap-3">
                                                {userRole !== "admin" && (
                                                    <button
                                                        onClick={() => initiateRoleChange(user.id, user.name, "admin")}
                                                        className="text-zinc-400 hover:text-purple-400 transition-colors"
                                                    >
                                                        Make Admin
                                                    </button>
                                                )}
                                                {userRole !== "lawyer" && (
                                                    <button
                                                        onClick={() => initiateRoleChange(user.id, user.name, "lawyer")}
                                                        className="text-zinc-400 hover:text-white transition-colors"
                                                    >
                                                        Make Lawyer
                                                    </button>
                                                )}
                                                {userRole !== "client" && (
                                                    <button
                                                        onClick={() => initiateRoleChange(user.id, user.name, "client")}
                                                        className="text-zinc-400 hover:text-white transition-colors"
                                                    >
                                                        Make Client
                                                    </button>
                                                )}
                                            </div>
                                        </td>

                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between px-6 py-4 border-t border-zinc-800 text-xs text-zinc-500 select-none">
                    <div>
                        Showing {(currentPage - 1) * perPage + 1}–{Math.min(currentPage * perPage, users.length)} of {users.length} users
                    </div>
                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="p-1 hover:text-zinc-300 transition-colors disabled:opacity-30"
                        >
                            <ChevronLeft width={16} height={16} />
                        </button>
                        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`w-6 h-6 flex items-center justify-center rounded text-xs transition-colors ${
                                    currentPage === page
                                        ? "bg-white text-zinc-900 font-medium"
                                        : "hover:bg-zinc-800/60 text-zinc-400"
                                }`}
                            >
                                {page}
                            </button>
                        ))}
                        {totalPages > 5 && <span className="px-1 text-zinc-600">...</span>}
                        <button
                            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="p-1 hover:text-zinc-300 transition-colors disabled:opacity-30"
                        >
                            <ChevronRight width={16} height={16} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Confirmation Modal */}
            {isConfirmOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/60">
                    <div className="w-full max-w-sm bg-[#1e1e1e] border border-zinc-800 rounded-xl p-6 shadow-2xl space-y-6">
                        <div className="space-y-2">
                            <h3 className="text-base font-semibold text-zinc-100">Confirm Role Change</h3>
                            <p className="text-xs text-zinc-400 leading-relaxed">
                                Change <span className="text-zinc-200 font-medium">{pendingChange?.userName}</span>'s
                                role to <span className="text-zinc-200 font-medium capitalize">{pendingChange?.newRole}</span>?
                                This updates their access permissions immediately.
                            </p>
                        </div>
                        <div className="flex items-center justify-end gap-3 text-xs font-medium">
                            <button
                                disabled={isUpdating}
                                onClick={() => { setIsConfirmOpen(false); setPendingChange(null); }}
                                className="px-4 py-2 text-zinc-400 hover:text-zinc-200 bg-zinc-800/40 hover:bg-zinc-800 border border-zinc-800 rounded-md transition-colors disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                disabled={isUpdating}
                                onClick={confirmRoleChange}
                                className="px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-500 rounded-md transition-colors shadow-lg min-w-[76px] flex items-center justify-center disabled:opacity-50"
                            >
                                {isUpdating ? (
                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : "Confirm"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}