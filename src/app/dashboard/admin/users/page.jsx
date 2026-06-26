// src/app/dashboard/admin/users/page.jsx
import AdminUsersTable from "@/components/dashboard/AdminUsersTable";
import { getUsersList } from "@/lib/api/users";

export default async function AdminUsersPage() {
    const data  = await getUsersList();
    const users = data?.users || [];

    return (
        <div className="min-h-screen bg-[#121212] p-8 text-slate-200">
            <div className="max-w-7xl mx-auto space-y-4">
                <div>
                    <h2 className="text-xl font-semibold tracking-tight text-slate-100">
                        User Management
                    </h2>
                    <p className="text-sm text-zinc-500 mt-1">
                        {users.length} total users registered
                    </p>
                </div>
                <AdminUsersTable users={users} />
            </div>
        </div>
    );
}