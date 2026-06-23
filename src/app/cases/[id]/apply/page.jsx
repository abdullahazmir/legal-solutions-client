// src/app/cases/[id]/apply/page.jsx
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ApplyForm from "./ApplyForm";

const getCaseById = async (id) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/cases/${id}`,
            { cache: "no-store" }
        );
        const contentType = res.headers.get("content-type");
        if (!contentType?.includes("application/json")) return null;
        if (!res.ok) return null;
        return res.json();
    } catch (err) {
        console.error("getCaseById error:", err.message);
        return null;
    }
};

const ApplyPage = async ({ params }) => {
    const { id } = await params;

    const session = await auth.api.getSession({ headers: await headers() });
    const user    = session?.user;

    if (!user) {
        redirect(`/auth/signin?redirect=/cases/${id}/apply`);
    }
    
    if(user.role !== 'client'){
        return <div>
            <h1>Only client can apply for this</h1>
        </div>
    }

    const caseData = await getCaseById(id);

    if (!caseData) {
        return (
            <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
                <p className="text-zinc-400">Case not found.</p>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-zinc-950 py-12 px-4">
            <ApplyForm caseData={caseData} user={user} caseId={id} />
        </main>
    );
};

export default ApplyPage;