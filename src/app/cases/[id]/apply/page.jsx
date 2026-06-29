// src/app/cases/[id]/apply/page.jsx
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ApplyForm from "./ApplyForm";
import { getApplicationsByClient } from "@/lib/api/applications";
import Link from "next/link";
import { getPlanById } from "@/lib/api/plans";

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
    const user = session?.user;

    if (!user) {
        redirect(`/auth/signin?redirect=/cases/${id}/apply`);
    }

    if (user.role !== 'client') {
        return <div>
            <h1 className="text-center p-10 font-bold text-3xl text-red-700">Only client can apply for this</h1>
        </div>
    }

    // const applications = await getApplicationsByClient(user.id)
    // const caseData = await getCaseById(id);

    // updated, two functions together

    const [applications, caseData] = await Promise.all([
        getApplicationsByClient(user.id),
        getCaseById(id)
    ])

    const plan = await getPlanById(user?.plan || 'client_basic')

    // console.log(plan)
    
    // const plan = {
    //     name: 'Free',
    //     maxApplicationPerMonth: 3
    // }
    if (!caseData) {
        return (
            <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
                <p className="text-zinc-400">Case not found.</p>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-zinc-950 py-12 px-4">
            <h1 className=" flex justify-center font-bold py-5 text-centre">You have applied so far :{applications.length} out of {plan.maxAppPerMonth} applications</h1>
            <p className=" flex justify-center font-bold py-5 text-centre">purchase plan, for more Apply :::<Link href={'/plans'}>
                <button className="btn btn-ghost text-red-800"> view plans now</button>
            </Link></p>

            {
                applications.length < plan.maxAppPerMonth && (<ApplyForm caseData={caseData} user={user} caseId={id} />)
            }
        </main>
    );
};

export default ApplyPage;