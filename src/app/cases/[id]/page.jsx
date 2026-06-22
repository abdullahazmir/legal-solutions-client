// src/app/cases/[id]/page.jsx
import { serverFetch } from "@/lib/core/server";
import { Button, Link } from "@heroui/react";
import {
    LocationArrow,
    Briefcase,
    CircleDollar,
    Clock,
    Star,
    Calendar,
    ArrowUpRight,
    GraduationCap,
    Person,
} from "@gravity-ui/icons";

const getAvailabilityStyle = (availability) => {
    switch (availability?.toLowerCase()) {
        case "available": return "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
        case "busy":      return "bg-red-500/15 text-red-400 border-red-500/30";
        default:          return "bg-zinc-500/15 text-zinc-400 border-zinc-500/30";
    }
};

const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

export default async function CaseDetailsPage({ params }) {
    const { id } = await params;

    const c = await serverFetch(`/api/cases/${id}`);

    if (!c || c.error) {
        return (
            <div className="w-full min-h-screen bg-zinc-950 flex flex-col justify-center items-center text-white p-6">
                <p className="text-zinc-400 text-lg">
                    This lawyer profile could not be found or is no longer active.
                </p>
              
                 <a href="/cases" className="mt-4 text-sm text-zinc-500 underline underline-offset-2">
                    ← Back to all lawyers
                </a>
            </div>
        );
    }

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
                                <h2 className="text-xl font-bold text-white">{c.name}</h2>
                                <p className="text-sm text-zinc-500 capitalize">{c.specialization}</p>
                            </div>

                            {/* Availability badge */}
                            <span className={`ml-auto text-xs font-semibold px-3 py-1.5 rounded-full border ${getAvailabilityStyle(c.availability)}`}>
                                {c.availability?.toLowerCase() === "available" ? "✦ Available" : "● Busy"}
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                            {c.specialization} <span className="text-zinc-500">Lawyer</span>
                        </h1>
                    </div>

                    {/* Bio */}
                    <section className="space-y-3">
                        <h3 className="text-xl font-semibold text-white">About</h3>
                        <p className="text-zinc-300 text-base leading-relaxed">
                            {c.bio || "No bio provided for this lawyer."}
                        </p>
                    </section>

                    {/* Details */}
                    <section className="space-y-3">
                        <h3 className="text-xl font-semibold text-white">Credentials & Background</h3>
                        <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-5 space-y-4">

                            <div className="flex items-start gap-3">
                                <GraduationCap className="text-purple-400 w-5 h-5 mt-0.5 shrink-0" />
                                <div>
                                    <span className="text-xs text-zinc-500 block">Education</span>
                                    <span className="text-sm font-medium text-zinc-200">{c.education || "—"}</span>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Person className="text-purple-400 w-5 h-5 mt-0.5 shrink-0" />
                                <div>
                                    <span className="text-xs text-zinc-500 block">Bar License</span>
                                    <span className="text-sm font-medium text-zinc-200">{c.barLicense || "—"}</span>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Star className="text-purple-400 w-5 h-5 mt-0.5 shrink-0" />
                                <div>
                                    <span className="text-xs text-zinc-500 block">Experience</span>
                                    <span className="text-sm font-medium text-zinc-200">{c.experience} years</span>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <span className="text-purple-400 mt-0.5 shrink-0">🌐</span>
                                <div>
                                    <span className="text-xs text-zinc-500 block">Languages</span>
                                    <span className="text-sm font-medium text-zinc-200">{c.languages || "—"}</span>
                                </div>
                            </div>

                        </div>
                    </section>

                    {/* Tags */}
                    <section className="space-y-3">
                        <h3 className="text-xl font-semibold text-white">Practice Areas</h3>
                        <div className="flex flex-wrap gap-2">
                            {c.specialization?.split(",").map((s, i) => (
                                <span
                                    key={i}
                                    className="text-xs text-zinc-300 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-full capitalize"
                                >
                                    {s.trim()}
                                </span>
                            ))}
                        </div>
                    </section>

                </div>

                {/* ── RIGHT BLOCK ── */}
                <aside className="bg-zinc-900 border border-zinc-800/80 rounded-[32px] p-6 lg:sticky lg:top-8 space-y-6 shadow-xl">
                    <h3 className="text-lg font-semibold text-white">Lawyer Overview</h3>

                    <div className="space-y-4">

                        <div className="flex items-start gap-3">
                            <LocationArrow className="text-purple-400 w-5 h-5 mt-0.5 shrink-0" />
                            <div>
                                <span className="text-xs text-zinc-500 block">Location</span>
                                <span className="text-sm font-medium text-zinc-200">{c.location}</span>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <Briefcase className="text-purple-400 w-5 h-5 mt-0.5 shrink-0" />
                            <div>
                                <span className="text-xs text-zinc-500 block">Specialization</span>
                                <span className="text-sm font-medium text-zinc-200 capitalize">{c.specialization}</span>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <CircleDollar className="text-purple-400 w-5 h-5 mt-0.5 shrink-0" />
                            <div>
                                <span className="text-xs text-zinc-500 block">Consultation Fee</span>
                                <span className="text-sm font-medium text-zinc-200">
                                    {c.currency} {c.consultationFee}
                                    <span className="text-zinc-500 font-normal text-xs ml-1">/ session</span>
                                </span>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <Clock className="text-purple-400 w-5 h-5 mt-0.5 shrink-0" />
                            <div>
                                <span className="text-xs text-zinc-500 block">Session Duration</span>
                                <span className="text-sm font-medium text-zinc-200">{c.consultationHours} hours</span>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <Calendar className="text-purple-400 w-5 h-5 mt-0.5 shrink-0" />
                            <div>
                                <span className="text-xs text-zinc-500 block">Member Since</span>
                                <span className="text-sm font-medium text-zinc-200">{formatDate(c.dateJoined)}</span>
                            </div>
                        </div>

                    </div>

                    {/* Status pill */}
                    <div className="pt-2 border-t border-zinc-800">
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-zinc-500">Profile Status</span>
                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${getAvailabilityStyle(c.status)}`}>
                                {c.status || "Unknown"}
                            </span>
                        </div>
                    </div>

                    {/* CTA */}
                    <Button
                        as={Link}
                        href={`/cases/${id}/book`}
                        className="w-full bg-purple-600 hover:bg-purple-500 text-white font-medium py-6 rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2"
                        endContent={<ArrowUpRight className="w-4 h-4" />}
                    >
                        Book a Consultation
                    </Button>
                     <a href="/cases" className="mt-4 text-sm text-zinc-500 underline underline-offset-2">
                    ← Back to all lawyers
                </a>

              
                    
                
                </aside>

            </div>
        </main>
    );
}