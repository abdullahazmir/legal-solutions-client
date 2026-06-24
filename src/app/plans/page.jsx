'use client';
import React, { useState } from 'react';

// ─── Icon Components (inline SVG to avoid import dependency issues) ─────────
const ScaleIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1M4.22 4.22l.707.707m12.728 12.728.707.707M3 12h1m16 0h1M4.927 19.073l.707-.707M18.366 4.927l.707-.707" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l-4 4m0 0l4 4m-4-4h14m0 0l-4-4m4 4l-4 4" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

const GavelIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.82m5.84-2.56a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.82m2.56-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
    </svg>
);

const BuildingIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
    </svg>
);

const UserIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
);

const CheckIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
);

const ChevronDownIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
);

const QuestionIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
    </svg>
);

const ShieldIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
);

// ─────────────────────────────────────────────────────────────────────────────

const PricingPage = () => {
    const [activeTab, setActiveTab] = useState('client');
    const [openFaq, setOpenFaq] = useState(null);

    const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

    // ── Client Plans ──────────────────────────────────────────────────────────
    const clientPlans = [
        {
            name: 'Basic',
            id: 'client_basic',
            price: '$0',
            period: '/forever',
            badge: null,
            description: 'For individuals who need to post a case and get matched with available legal counsel.',
            icon: <UserIcon className="w-5 h-5 text-amber-500/80" />,
            features: [
                'Post up to 2 active cases',
                'Apply to up to 3 lawyers per month',
                'View lawyer profiles & ratings',
                'Standard case status tracking',
            ],
            cta: 'Start for Free',
            accent: false,
        },
        {
            name: 'Claimant',
            id: 'client_claimant',
            price: '$19',
            period: '/month',
            badge: 'Most Popular',
            description: 'Recommended for clients with active or ongoing legal matters requiring regular representation.',
            icon: <ScaleIcon className="w-5 h-5 text-amber-400" />,
            features: [
                'Post up to 10 active cases',
                'Apply to up to 30 lawyers per month',
                'Priority case visibility to law firms',
                'Direct secure messaging with counsel',
                'Document upload & case file storage',
            ],
            cta: 'Upgrade to Claimant',
            accent: true,
        },
        {
            name: 'Executive',
            id: 'client_executive',
            price: '$39',
            period: '/month',
            badge: null,
            description: 'For corporate clients or individuals managing multiple complex legal proceedings simultaneously.',
            icon: <ShieldIcon className="w-5 h-5 text-amber-300" />,
            features: [
                'Unlimited active cases',
                'Unlimited lawyer applications',
                'Featured case placement in search',
                'Early access to newly registered lawyers',
                'Dedicated case coordination support',
                '24/7 priority response queue',
            ],
            cta: 'Go Executive',
            accent: false,
        },
    ];

    // ── Lawyer / Law Firm Plans ───────────────────────────────────────────────
    const lawyerPlans = [
        {
            name: 'Associate',
            id: 'lawyer_associate',
            price: '$0',
            period: '/forever',
            badge: null,
            description: 'For independent lawyers building their first client pipeline on the platform.',
            icon: <GavelIcon className="w-5 h-5 text-amber-500/80" />,
            features: [
                'Accept up to 3 active client cases',
                'Basic public lawyer profile page',
                'Standard listing in case search',
                'Access to open case postings',
            ],
            cta: 'Register Free',
            accent: false,
        },
        {
            name: 'Counsel',
            id: 'lawyer_counsel',
            price: '$49',
            period: '/month',
            badge: 'Most Popular',
            description: 'Built for practicing lawyers who handle multiple clients across different case types simultaneously.',
            icon: <ScaleIcon className="w-5 h-5 text-amber-400" />,
            features: [
                'Accept up to 20 active client cases',
                'Enhanced profile with verified badge',
                'Full applicant tracking per case',
                'Case analytics & engagement metrics',
                'Dedicated support response line',
            ],
            cta: 'Expand Your Practice',
            accent: true,
        },
        {
            name: 'Firm',
            id: 'lawyer_firm',
            price: '$149',
            period: '/month',
            badge: null,
            description: 'Enterprise-grade tools for law firms managing large caseloads with multi-attorney teams.',
            icon: <BuildingIcon className="w-5 h-5 text-amber-300" />,
            features: [
                'Unlimited active client cases',
                'Multi-attorney team seats',
                'Firm-branded profile & landing page',
                'Advanced case pipeline dashboard',
                'Featured placement in all search results',
                'Dedicated account manager',
                'Custom intake form configuration',
            ],
            cta: 'Contact Our Firm Team',
            accent: false,
        },
    ];

    const faqs = [
        {
            question: 'Can I switch between client and lawyer plans?',
            answer: 'Yes. If your role on the platform changes, you can update your account type from your profile settings. Billing transitions take effect at the start of your next cycle, and any remaining credit is applied pro-rata.',
        },
        {
            question: 'How does the monthly application limit work for clients?',
            answer: 'Each calendar month, you can apply to or contact a set number of registered lawyers. The counter resets on the 1st of each month. Upgrading your plan immediately expands your available quota for the rest of the current month.',
        },
        {
            question: 'Are consultations and legal fees included in the plan price?',
            answer: 'No. Plan pricing covers platform access only — case posting, matching, messaging, and management tools. Any legal service fees, consultation charges, or retainer agreements are arranged directly between you and your chosen legal counsel.',
        },
        {
            question: 'What is your refund policy?',
            answer: 'We offer a 14-day refund window from your first paid billing date. If the platform does not meet your needs within that period, contact support for a full refund. After 14 days, plans are non-refundable but can be cancelled to stop future charges.',
        },
        {
            question: 'Is client communication with lawyers secure and private?',
            answer: 'All in-platform messaging between clients and legal counsel is end-to-end encrypted. We do not store, read, or share message content. Document uploads are stored in isolated, access-controlled storage tied only to your case record.',
        },
    ];

    const activePlans = activeTab === 'client' ? clientPlans : lawyerPlans;

    return (
        <div
            className="w-full min-h-screen text-zinc-50 py-16 px-4 sm:px-6 lg:px-8"
            style={{ background: 'linear-gradient(160deg, #0f0f10 0%, #111113 60%, #13110f 100%)' }}
        >
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap');

                .pricing-display { font-family: 'Cormorant Garamond', Georgia, serif; }
                .pricing-body { font-family: 'Inter', system-ui, sans-serif; }

                .amber-glow { box-shadow: 0 0 0 1px rgba(217,119,6,0.35), 0 8px 32px rgba(217,119,6,0.08); }
                .card-base { background: rgba(255,255,255,0.025); backdrop-filter: blur(8px); }
                .card-accent { background: rgba(217,119,6,0.05); }

                .tab-active {
                    background: rgba(217,119,6,0.12);
                    border-color: rgba(217,119,6,0.4);
                    color: #fbbf24;
                }
                .tab-inactive {
                    border-color: transparent;
                    color: #71717a;
                }
                .tab-inactive:hover { color: #d4d4d8; }

                .rule-amber { background: linear-gradient(90deg, transparent, rgba(217,119,6,0.5), transparent); }
                .cta-primary {
                    background: linear-gradient(135deg, #b45309, #d97706);
                    color: #fff;
                    box-shadow: 0 4px 20px rgba(180,83,9,0.25);
                }
                .cta-primary:hover { background: linear-gradient(135deg, #d97706, #f59e0b); }
                .cta-secondary {
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(255,255,255,0.1);
                    color: #a1a1aa;
                }
                .cta-secondary:hover { background: rgba(255,255,255,0.08); color: #e4e4e7; }

                .faq-chevron-open { transform: rotate(180deg); color: #d97706; }
                .faq-chevron-closed { transform: rotate(0deg); }

                .check-bg { background: rgba(217,119,6,0.1); }
                .check-color { color: #d97706; }

                .seal-line { width: 40px; height: 1px; background: rgba(217,119,6,0.4); display: inline-block; vertical-align: middle; margin: 0 10px; }
            `}</style>

            <div className="max-w-6xl mx-auto pricing-body">

                {/* ── Page Header ────────────────────────────────────────────── */}
                <div className="text-center max-w-2xl mx-auto mb-14">
                    <div className="flex items-center justify-center mb-5">
                        <span className="seal-line"></span>
                        <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-amber-600/80">
                            Transparent Pricing
                        </span>
                        <span className="seal-line"></span>
                    </div>

                    <h1 className="pricing-display text-4xl sm:text-5xl font-bold text-zinc-100 leading-tight tracking-tight mb-4">
                        Representation without barriers.
                    </h1>
                    <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
                        Whether you need legal help for a personal matter or you are a practitioner growing your practice, our plans are built to meet you where you are.
                    </p>
                </div>

                {/* ── Tab Toggle ─────────────────────────────────────────────── */}
                <div className="flex justify-center mb-14">
                    <div className="inline-flex p-1 rounded-xl border border-zinc-800 bg-zinc-900/60 gap-1">
                        <button
                            onClick={() => setActiveTab('client')}
                            className={`flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-lg border transition-all duration-200 ${activeTab === 'client' ? 'tab-active' : 'tab-inactive border-transparent'}`}
                        >
                            <UserIcon className="w-4 h-4" />
                            I need a Lawyer
                        </button>
                        <button
                            onClick={() => setActiveTab('lawyer')}
                            className={`flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-lg border transition-all duration-200 ${activeTab === 'lawyer' ? 'tab-active' : 'tab-inactive border-transparent'}`}
                        >
                            <GavelIcon className="w-4 h-4" />
                            I am a Lawyer / Firm
                        </button>
                    </div>
                </div>

                {/* ── Pricing Cards ──────────────────────────────────────────── */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start mb-24">
                    {activePlans.map((plan, idx) => (
                        <div
                            key={plan.id}
                            className={`relative rounded-2xl p-6 flex flex-col min-h-[520px] transition-all duration-300 hover:-translate-y-1 card-base border ${plan.accent
                                ? 'amber-glow border-amber-700/40 card-accent'
                                : 'border-zinc-800/60 hover:border-zinc-700/60'
                                }`}
                        >
                            {/* Badge */}
                            {plan.badge && (
                                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-amber-900 bg-amber-400 rounded-full shadow-md">
                                    {plan.badge}
                                </span>
                            )}

                            {/* Plan header */}
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500 mb-0.5">
                                        {activeTab === 'client' ? 'Client Plan' : 'Legal Professional'}
                                    </p>
                                    <h3 className="pricing-display text-2xl font-bold text-zinc-100">{plan.name}</h3>
                                </div>
                                <div className="p-2 rounded-lg border border-zinc-800/80 bg-zinc-950/50">
                                    {plan.icon}
                                </div>
                            </div>

                            <p className="text-xs text-zinc-500 leading-relaxed mb-5 min-h-[40px]">
                                {plan.description}
                            </p>

                            {/* Price */}
                            <div className="flex items-baseline gap-1 mb-5">
                                <span className="pricing-display text-5xl font-bold text-zinc-50">{plan.price}</span>
                                <span className="text-xs text-zinc-600 font-medium">{plan.period}</span>
                            </div>

                            {/* Divider */}
                            <div className="h-px rule-amber mb-5" />

                            {/* Features */}
                            <ul className="space-y-3 flex-1">
                                {plan.features.map((f, fIdx) => (
                                    <li key={fIdx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                                        <span className="w-4 h-4 rounded-full check-bg check-color flex items-center justify-center shrink-0 mt-0.5">
                                            <CheckIcon className="w-2.5 h-2.5" />
                                        </span>
                                        <span className="leading-normal">{f}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA */}
                            <div className="mt-8">
                                <form action="/api/checkout_sessions" method="POST">
                                <input type="hidden" name="plan_id" value={plan.id} />
                                    <section>
                                        <button type="submit" role="link">
                                            Checkout
                                        </button>
                                    </section>
                                </form>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── Trust Strip ───────────────────────────────────────────── */}
                <div className="border border-zinc-800/60 rounded-2xl p-6 mb-20 bg-zinc-900/30 text-center">
                    <p className="text-[10px] uppercase tracking-widest text-zinc-600 mb-4">What's always included, on every plan</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {[
                            ['Encrypted messaging', 'All client–lawyer communication is private and secure.'],
                            ['Verified profiles', 'Lawyers are identity-checked before going live.'],
                            ['No hidden fees', 'Platform pricing is separate from legal service fees.'],
                            ['Cancel anytime', 'No long-term contracts. Leave when you need to.'],
                        ].map(([title, body]) => (
                            <div key={title} className="text-left p-3 rounded-xl bg-zinc-900/50 border border-zinc-800/40">
                                <p className="text-xs font-semibold text-zinc-200 mb-1">{title}</p>
                                <p className="text-[11px] text-zinc-500 leading-relaxed">{body}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── FAQ ───────────────────────────────────────────────────── */}
                <div className="max-w-2xl mx-auto">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-500 mb-4">
                            <QuestionIcon className="w-5 h-5" />
                        </div>
                        <h2 className="pricing-display text-2xl sm:text-3xl font-bold text-zinc-100">Common Questions</h2>
                        <p className="text-xs text-zinc-500 mt-2">About billing, limits, and how the platform works.</p>
                    </div>

                    <div className="space-y-2">
                        {faqs.map((faq, idx) => {
                            const isOpen = openFaq === idx;
                            return (
                                <div
                                    key={idx}
                                    className={`rounded-xl border overflow-hidden transition-colors duration-200 ${isOpen ? 'border-amber-800/40 bg-amber-950/10' : 'border-zinc-800/60 bg-zinc-900/40'}`}
                                >
                                    <button
                                        onClick={() => toggleFaq(idx)}
                                        className="w-full flex items-center justify-between text-left px-5 py-4 gap-4 text-zinc-200 hover:text-white transition"
                                    >
                                        <span className="text-sm font-medium">{faq.question}</span>
                                        <ChevronDownIcon
                                            className={`w-4 h-4 shrink-0 transition-transform duration-200 ${isOpen ? 'faq-chevron-open' : 'faq-chevron-closed text-zinc-600'}`}
                                        />
                                    </button>
                                    <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-48 border-t border-zinc-800/40' : 'max-h-0'}`}>
                                        <p className="px-5 py-4 text-xs text-zinc-400 leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Footer note */}
                    <p className="text-center text-[11px] text-zinc-600 mt-10 leading-relaxed">
                        Prices shown are platform access fees only. Legal counsel fees, retainer agreements, and consultation charges are set independently by your selected lawyer or firm.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default PricingPage;