// src/app/cases/page.jsx

import CasesFilter from "@/components/Cases/CasesFilter";


const getAllCases = async () => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/cases`,
            { cache: "no-store" }
        );
        const contentType = res.headers.get("content-type");
        if (!contentType?.includes("application/json")) return [];
        if (!res.ok) return [];
        return res.json();
    } catch (err) {
        console.error("getAllCases error:", err.message);
        return [];
    }
};

export default async function CasesListPage() {
    const cases = await getAllCases();

    return (
        <main className="min-h-screen bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-3xl font-bold text-white tracking-tight">Find a Lawyer</h1>
                    <p className="text-zinc-400 text-sm mt-2">
                        Browse verified legal professionals across all specializations.
                    </p>
                </div>

                {/* Filter + Grid */}
                <CasesFilter cases={cases} />
                
               

            </div>
        </main>
    );
}