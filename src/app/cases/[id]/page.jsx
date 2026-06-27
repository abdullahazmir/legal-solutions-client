// src/app/cases/[id]/page.jsx
import { Button, Link } from "@heroui/react";
import {
    LocationArrow, Briefcase, CircleDollar,
    Clock, Star, Calendar, Globe, Person, BookOpen,
} from "@gravity-ui/icons";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import HireButton from "@/components/Cases/HireButton";
import SaveCaseButton from "@/components/dashboard/SaveCaseButton";
;

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

const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric", month: "long", day: "numeric",
    });
};

const getAvailabilityStyle = (availability) => {
    switch (availability?.toLowerCase()) {
        case "available": return "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
        case "busy": return "bg-red-500/15 text-red-400 border-red-500/30";
        default: return "bg-zinc-500/15 text-zinc-400 border-zinc-500/30";
    }
};

export default async function CaseDetailPage({ params }) {
    const { id } = await params;

    // Get session to pass to HireButton
    const session = await auth.api.getSession({ headers: await headers() });
    const c = await getCaseById(id);

    if (!c) {
        return (
            <div className="w-full min-h-screen bg-zinc-950 flex flex-col justify-center items-center text-white p-6 gap-3">
                <p className="text-zinc-400 text-lg">Lawyer profile could not be found.</p>
                <Link href="/cases" className="text-zinc-500 text-sm hover:text-white transition-colors">
                    ← Back to all lawyers
                </Link>
            </div>
        );
    }

    const isAvailable = c.availability?.toLowerCase() === "available";

    return (
        <main className="w-full min-h-screen bg-zinc-950 text-zinc-100 p-6 md:p-12 lg:p-16">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">

                {/* ── LEFT BLOCK ── */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Header */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <img
                                src={c.photoUrl}
                                alt={c.name}
                                className="w-16 h-16 object-cover bg-zinc-900 border border-zinc-800 rounded-2xl"
                            />
                            <div>
                                <h2 className="text-xl font-medium text-zinc-300">{c.specialization}</h2>
                                <p className="text-sm text-zinc-500">{c.experience} years of experience</p>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                                {c.name}
                            </h1>
                            <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${getAvailabilityStyle(c.availability)}`}>
                                {isAvailable ? "✦ Available" : "● Busy"}
                            </span>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                            <span className="flex items-center gap-1.5 text-xs text-zinc-400 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-full">
                                <Briefcase size={11} /> {c.specialization}
                            </span>
                            <span className="flex items-center gap-1.5 text-xs text-zinc-400 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-full">
                                <LocationArrow size={11} /> {c.location}
                            </span>
                            {c.languages?.split(",").map((lang) => (
                                <span key={lang} className="flex items-center gap-1.5 text-xs text-zinc-400 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-full">
                                    🌐 {lang.trim()}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Bio */}
                    <section className="space-y-3">
                        <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                            <Person size={18} className="text-zinc-500" /> Professional Summary
                        </h3>
                        <p className="text-zinc-300 text-base leading-relaxed">
                            {c.bio || "No professional summary provided."}
                        </p>
                    </section>

                    {/* Education */}
                    <section className="space-y-3">
                        <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                            <BookOpen size={18} className="text-zinc-500" /> Education
                        </h3>
                        <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-5">
                            <p className="text-zinc-300 text-base leading-relaxed">
                                {c.education || "Education details not provided."}
                            </p>
                        </div>
                    </section>

                    {/* Bar License */}
                    {c.barLicense && (
                        <section className="space-y-3">
                            <h3 className="text-xl font-semibold text-white">Bar License / Registration</h3>
                            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium px-4 py-2 rounded-xl">
                                🏛️ {c.barLicense}
                            </div>
                        </section>
                    )}
                </div>

                {/* ── RIGHT BLOCK — Sticky Panel ── */}
                <aside className="bg-zinc-900 border border-zinc-800/80 rounded-[32px] p-6 lg:sticky lg:top-8 space-y-6 shadow-xl">
                    <h3 className="text-lg font-semibold text-white">Lawyer Overview</h3>

                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <LocationArrow className="text-emerald-400 w-5 h-5 mt-0.5 shrink-0" />
                            <div>
                                <span className="text-xs text-zinc-500 block">Location</span>
                                <span className="text-sm font-medium text-zinc-200">{c.location}</span>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Briefcase className="text-emerald-400 w-5 h-5 mt-0.5 shrink-0" />
                            <div>
                                <span className="text-xs text-zinc-500 block">Specialization</span>
                                <span className="text-sm font-medium text-zinc-200">{c.specialization}</span>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <CircleDollar className="text-emerald-400 w-5 h-5 mt-0.5 shrink-0" />
                            <div>
                                <span className="text-xs text-zinc-500 block">Consultation Fee</span>
                                <span className="text-sm font-medium text-zinc-200">{c.currency} {c.consultationFee} / session</span>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Clock className="text-emerald-400 w-5 h-5 mt-0.5 shrink-0" />
                            <div>
                                <span className="text-xs text-zinc-500 block">Session Duration</span>
                                <span className="text-sm font-medium text-zinc-200">{c.consultationHours} hours</span>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Star className="text-emerald-400 w-5 h-5 mt-0.5 shrink-0" />
                            <div>
                                <span className="text-xs text-zinc-500 block">Experience</span>
                                <span className="text-sm font-medium text-zinc-200">{c.experience} years</span>
                            </div>
                        </div>
                        {c.languages && (
                            <div className="flex items-start gap-3">
                                <Globe className="text-emerald-400 w-5 h-5 mt-0.5 shrink-0" />
                                <div>
                                    <span className="text-xs text-zinc-500 block">Languages</span>
                                    <span className="text-sm font-medium text-zinc-200">{c.languages}</span>
                                </div>
                            </div>
                        )}
                        <div className="flex items-start gap-3">
                            <Calendar className="text-emerald-400 w-5 h-5 mt-0.5 shrink-0" />
                            <div>
                                <span className="text-xs text-zinc-500 block">Member Since</span>
                                <span className="text-sm font-medium text-zinc-200">{formatDate(c.dateJoined)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Availability pill */}
                    <div className={`w-full text-center text-xs font-semibold px-3 py-2 rounded-xl border ${getAvailabilityStyle(c.availability)}`}>
                        {isAvailable ? "✦ Currently accepting clients" : "● Not available right now"}
                    </div>

                    {/* to save the case */}
                  
                     
                       <SaveCaseButton caseData={c} session={session} />
                     
                  

                    {/* ✅ HireButton handles auth check + redirect */}
                    <HireButton caseId={id}
                        isAvailable={isAvailable}
                        session={session}>
                        <h1>Apply for consultation</h1>

                    </HireButton>



                    <Link
                        href="/cases"
                        className="block text-center text-xs text-zinc-600 hover:text-zinc-400 transition-colors"
                    >
                        ← Back to all lawyers
                    </Link>
                </aside>
            </div>
        </main>
    );
}