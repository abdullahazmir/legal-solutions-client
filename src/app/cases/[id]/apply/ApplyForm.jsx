"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, toast } from "@heroui/react";
import {
    Person, Briefcase, LocationArrow,
    CircleDollar, Clock, ArrowUpRight,
} from "@gravity-ui/icons";

export default function ApplyForm({ caseData: c, user, caseId }) {
    const router  = useRouter();
    const [form,    setForm]    = useState({ message: "", phone: "", preferredDate: "" });
    const [loading, setLoading] = useState(false);
    const [error,   setError]   = useState("");
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (!form.message.trim()) {
            setError("Please describe your legal issue.");
            setLoading(false);
            return;
        }

        const payload = {
            caseId,
            caseName:    c.name,
            lawyerId:    c.lawyerId,
            lawyerName:  c.name,
            clientId:    user.id,
            clientName:  user.name,
            clientEmail: user.email,
            clientPhone: form.phone,
            message:     form.message,
            preferredDate: form.preferredDate,
            status:      "Applied",
            createdAt:   new Date().toISOString(),
        };

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/applications`, {
                method:  "POST",
                headers: { "Content-Type": "application/json" },
                body:    JSON.stringify(payload),
            });

            if (res.ok) {
                setSuccess(true);
                toast.success("Consultation request sent!");
                setTimeout(() => router.push("/cases"), 2000);
            } else {
                setError("Failed to submit request. Please try again.");
            }
        } catch (err) {
            setError("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="max-w-lg mx-auto text-center space-y-4 py-20">
                <div className="text-5xl">✅</div>
                <h2 className="text-2xl font-bold text-white">Request Sent!</h2>
                <p className="text-zinc-400 text-sm">
                    Your consultation request has been sent to <strong className="text-white">{c.name}</strong>.
                    They will contact you at <strong className="text-white">{user.email}</strong> shortly.
                </p>
                <p className="text-zinc-600 text-xs">Redirecting to cases...</p>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

            {/* ── LEFT: Form ── */}
            <div className="lg:col-span-2 space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Request Consultation</h1>
                    <p className="text-zinc-400 text-sm mt-1">
                        Fill in your details and describe your legal issue.
                    </p>
                </div>

                {/* Signed-in as */}
                <div className="flex items-center gap-3 bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3">
                    <Person size={16} className="text-zinc-500 shrink-0" />
                    <p className="text-sm text-zinc-400">
                        Requesting as <strong className="text-white">{user.name}</strong>
                        <span className="text-zinc-600 ml-1">({user.email})</span>
                    </p>
                </div>

                {/* Error */}
                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl px-4 py-3">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Phone */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-zinc-400 text-sm font-medium">
                            Phone Number <span className="text-zinc-600">(Optional)</span>
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="+880 1XXX-XXXXXX"
                            className="w-full bg-zinc-900/50 border border-zinc-800 text-white rounded-xl px-4 py-3 text-sm placeholder:text-zinc-600 outline-none focus:border-zinc-600 transition"
                        />
                    </div>

                    {/* Preferred Date */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-zinc-400 text-sm font-medium">
                            Preferred Consultation Date <span className="text-zinc-600">(Optional)</span>
                        </label>
                        <input
                            type="date"
                            name="preferredDate"
                            value={form.preferredDate}
                            onChange={handleChange}
                            min={new Date().toISOString().split("T")[0]}
                            className="w-full bg-zinc-900/50 border border-zinc-800 text-white rounded-xl px-4 py-3 text-sm outline-none focus:border-zinc-600 transition"
                        />
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-zinc-400 text-sm font-medium">
                            Describe Your Legal Issue <span className="text-red-400">*</span>
                        </label>
                        <textarea
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            rows={5}
                            placeholder="Briefly describe your legal situation, what kind of help you need, and any relevant background..."
                            className="w-full bg-zinc-900/50 border border-zinc-800 text-white rounded-xl p-4 text-sm placeholder:text-zinc-600 outline-none focus:border-zinc-600 transition resize-none"
                        />
                    </div>

                   

                    <Button
                        type="submit"
                        isLoading={loading}
                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-6 rounded-xl transition-colors"
                        endContent={!loading && <ArrowUpRight className="w-4 h-4" />}
                    >
                        {loading ? "Sending Request..." : "Send Consultation Request"}
                    </Button>
                </form>
            </div>

            {/* ── RIGHT: Lawyer Summary ── */}
            <aside className="bg-zinc-900 border border-zinc-800/80 rounded-[28px] p-6 space-y-5 shadow-xl lg:sticky lg:top-8">
                <div className="flex items-center gap-3">
                    <img
                        src={c.photoUrl}
                        alt={c.name}
                        className="w-12 h-12 rounded-xl object-cover border border-zinc-700"
                    />
                    <div>
                        <p className="text-white font-semibold text-sm">{c.name}</p>
                        <p className="text-zinc-500 text-xs">{c.specialization}</p>
                    </div>
                </div>

                <div className="space-y-3 border-t border-zinc-800 pt-4">
                    <div className="flex items-center gap-2 text-sm text-zinc-400">
                        <LocationArrow size={13} className="text-zinc-600" />
                        {c.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-zinc-400">
                        <Briefcase size={13} className="text-zinc-600" />
                        {c.experience} years experience
                    </div>
                    <div className="flex items-center gap-2 text-sm text-zinc-400">
                        <CircleDollar size={13} className="text-zinc-600" />
                        {c.currency} {c.consultationFee} / session
                    </div>
                    <div className="flex items-center gap-2 text-sm text-zinc-400">
                        <Clock size={13} className="text-zinc-600" />
                        {c.consultationHours}h per session
                    </div>
                </div>

                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium px-3 py-2 rounded-xl text-center">
                    ✦ Currently accepting clients
                </div>
            </aside>
        </div>
    );
}