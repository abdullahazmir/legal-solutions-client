"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const UserIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0" />
    </svg>
);
const MailIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0l-9.75 6.75L2.25 6.75" />
    </svg>
);
const LockIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
    </svg>
);
const EyeIcon = ({ open }) => open ? (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
) : (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
    </svg>
);
const GavelIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.82m5.84-2.56a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.82m2.56-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
    </svg>
);
const PersonIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0" />
    </svg>
);

const ROLE_DEFAULT_PLAN = {
    client: "client_basic",
    lawyer: "lawyer_associate",
};

const ROLES = [
    {
        value: "client",
        label: "I need a Lawyer",
        description: "Post cases and find legal representation",
        icon: <PersonIcon />,
    },
    {
        value: "lawyer",
        label: "I am a Lawyer / Firm",
        description: "Accept cases and grow your practice",
        icon: <GavelIcon />,
    },
];

export default function SignupForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirect") || "/cases";

    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [role, setRole] = useState("client");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        setError("");
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const plan = ROLE_DEFAULT_PLAN[role];

        const { error: authError } = await authClient.signUp.email({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            role,
            plan,
        });

        setLoading(false);

        if (authError) {
            setError(authError.message || "Something went wrong. Please try again.");
            return;
        }

        router.push(redirectTo);
    };

    const handleGoogleSignIn = async () => {
        await authClient.signIn.social({ provider: "google" });
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center px-4 py-12"
            style={{ background: "linear-gradient(160deg, #0f0f10 0%, #111113 60%, #13110f 100%)" }}
        >
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&display=swap');
                .field-input { width: 100%; background: transparent; border: none; outline: none; font-size: 13px; color: #e4e4e7; padding: 11px 0; }
                .field-input::placeholder { color: #52525b; }
                .field-wrap { display: flex; align-items: center; gap: 10px; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 0 14px; background: rgba(255,255,255,0.03); transition: border-color 0.2s; }
                .field-wrap:focus-within { border-color: rgba(217,119,6,0.5); }
                .role-card { flex: 1; padding: 14px; border-radius: 14px; border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.025); cursor: pointer; transition: all 0.2s; text-align: left; }
                .role-card.selected { border-color: rgba(217,119,6,0.5); background: rgba(217,119,6,0.06); }
                .role-card:hover:not(.selected) { border-color: rgba(255,255,255,0.15); }
                .btn-primary { width: 100%; padding: 13px; border-radius: 12px; font-size: 13px; font-weight: 600; color: #fff; border: none; cursor: pointer; background: linear-gradient(135deg, #b45309, #d97706); transition: opacity 0.2s; }
                .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
                .btn-primary:hover:not(:disabled) { opacity: 0.9; }
                .seal-line { width: 28px; height: 1px; background: rgba(186,117,23,0.4); display: inline-block; vertical-align: middle; margin: 0 8px; }
            `}</style>

            <div style={{ width: "100%", maxWidth: 420 }}>

                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-3">
                        <span className="seal-line" />
                        <span style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(186,117,23,0.8)", fontWeight: 600 }}>
                            Legal Platform
                        </span>
                        <span className="seal-line" />
                    </div>
                    <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 30, fontWeight: 700, color: "#f4f4f5", margin: "0 0 6px" }}>
                        Create your account
                    </h1>
                    <p style={{ fontSize: 13, color: "#71717a", margin: 0 }}>
                        {redirectTo !== "/dashboard"
                            ? "Sign up to continue to your requested page"
                            : "Join to connect with legal professionals"}
                    </p>
                </div>

                {/* Card */}
                <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: "28px 28px 24px" }}>

                    {/* Role selector */}
                    <div className="mb-6">
                        <p style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.15em", color: "#71717a", marginBottom: 10 }}>
                            I am joining as
                        </p>
                        <div className="flex gap-3">
                            {ROLES.map((r) => (
                                <button
                                    key={r.value}
                                    type="button"
                                    onClick={() => setRole(r.value)}
                                    className={`role-card ${role === r.value ? "selected" : ""}`}
                                >
                                    <div style={{ color: role === r.value ? "#d97706" : "#71717a", marginBottom: 8 }}>
                                        {r.icon}
                                    </div>
                                    <p style={{ fontSize: 12, fontWeight: 600, color: role === r.value ? "#fbbf24" : "#d4d4d8", margin: "0 0 3px" }}>
                                        {r.label}
                                    </p>
                                    <p style={{ fontSize: 11, color: "#71717a", margin: 0, lineHeight: 1.4 }}>
                                        {r.description}
                                    </p>
                                </button>
                            ))}
                        </div>
                        <p style={{ fontSize: 11, color: "#52525b", marginTop: 8 }}>
                            You'll start on the{" "}
                            <span style={{ color: "#d97706" }}>
                                {role === "client" ? "Client Basic (Free)" : "Associate (Free)"}
                            </span>{" "}
                            plan. Upgrade anytime.
                        </p>
                    </div>

                    {/* Error */}
                    {error && (
                        <div style={{ marginBottom: 16, padding: "10px 14px", borderRadius: 10, background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "#fca5a5", fontSize: 12 }}>
                            {error}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSignup} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                        <div>
                            <label style={{ fontSize: 12, fontWeight: 500, color: "#a1a1aa", display: "block", marginBottom: 6 }}>Full Name</label>
                            <div className="field-wrap">
                                <span style={{ color: "#52525b", display: "flex" }}><UserIcon /></span>
                                <input className="field-input" type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" required />
                            </div>
                        </div>
                        <div>
                            <label style={{ fontSize: 12, fontWeight: 500, color: "#a1a1aa", display: "block", marginBottom: 6 }}>Email Address</label>
                            <div className="field-wrap">
                                <span style={{ color: "#52525b", display: "flex" }}><MailIcon /></span>
                                <input className="field-input" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" required />
                            </div>
                        </div>
                        <div>
                            <label style={{ fontSize: 12, fontWeight: 500, color: "#a1a1aa", display: "block", marginBottom: 6 }}>Password</label>
                            <div className="field-wrap">
                                <span style={{ color: "#52525b", display: "flex" }}><LockIcon /></span>
                                <input className="field-input" type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} placeholder="Min. 8 characters" required minLength={8} />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ color: "#52525b", background: "none", border: "none", cursor: "pointer", display: "flex", padding: 0 }}>
                                    <EyeIcon open={showPassword} />
                                </button>
                            </div>
                        </div>
                        <button type="submit" disabled={loading} className="btn-primary" style={{ marginTop: 6 }}>
                            {loading ? "Creating account..." : "Create Account"}
                        </button>
                    </form>

                    {/* Google */}
                    <div className="flex items-center gap-3 my-5">
                        <div className="flex-1 h-px bg-neutral-800" />
                        <span className="text-xs text-neutral-500">or continue with</span>
                        <div className="flex-1 h-px bg-neutral-800" />
                    </div>
                    <button
                        onClick={handleGoogleSignIn}
                        className="w-full flex items-center justify-center gap-3 px-4 py-2.5 bg-[#121214] border border-neutral-700 rounded-lg text-sm font-medium text-neutral-200 hover:bg-neutral-800 hover:border-neutral-600 transition-all active:scale-[0.98]"
                    >
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4" />
                            <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853" />
                            <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05" />
                            <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335" />
                        </svg>
                        Sign up with Google
                    </button>
                    <p className="text-center text-xs text-neutral-500 mt-4">
                        By signing up, you agree to our{' '}
                        <a href="/terms" className="text-neutral-400 underline underline-offset-2 hover:text-neutral-200">Terms of Service</a>
                        {' '}and{' '}
                        <a href="/privacy" className="text-neutral-400 underline underline-offset-2 hover:text-neutral-200">Privacy Policy</a>.
                    </p>

                    {/* Sign in link */}
                    <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "20px 0 16px" }}>
                        <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
                        <span style={{ fontSize: 11, color: "#52525b" }}>Already have an account?</span>
                        <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
                    </div>
                    <Link href={`/auth/signin?redirect=${redirectTo}`}>
                        <button
                            style={{ width: "100%", padding: "11px", borderRadius: 12, fontSize: 12, fontWeight: 600, color: "#a1a1aa", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", cursor: "pointer", transition: "border-color 0.2s" }}
                            onMouseOver={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"}
                            onMouseOut={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"}
                        >
                            Sign in instead
                        </button>
                    </Link>
                </div>

                <p style={{ textAlign: "center", fontSize: 11, color: "#3f3f46", marginTop: 20 }}>
                    By signing up you agree to our{" "}
                    <Link href="/terms" style={{ color: "#52525b" }}>Terms of Service</Link>
                    {" "}and{" "}
                    <Link href="/privacy" style={{ color: "#52525b" }}>Privacy Policy</Link>
                </p>
            </div>
        </div>
    );
}