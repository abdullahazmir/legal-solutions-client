import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <main
      className="min-h-screen flex items-center justify-center px-4 py-16"
      style={{ background: "linear-gradient(160deg, #0f0f10 0%, #111113 60%, #13110f 100%)" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&display=swap');
        .info-row { display: flex; align-items: flex-start; gap: 12px; padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .info-row:last-child { border-bottom: none; }
        .seal-line { width: 28px; height: 1px; background: rgba(239,68,68,0.3); display: inline-block; vertical-align: middle; margin: 0 8px; }
      `}</style>

      <div style={{ width: "100%", maxWidth: 420 }}>

        {/* Lock icon */}
        <div className="text-center mb-8">
          <div className="w-18 h-18 rounded-full border border-red-500/30 bg-red-500/10 flex items-center justify-center mx-auto mb-6"
            style={{ width: 72, height: 72 }}>
            <svg className="w-7 h-7 text-red-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </div>

          <div className="flex items-center justify-center mb-3">
            <span className="seal-line" />
            <span style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(248,113,113,0.8)", fontWeight: 600 }}>
              Access restricted
            </span>
            <span className="seal-line" />
          </div>

          <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 28, fontWeight: 700, color: "#f4f4f5", margin: "0 0 10px" }}>
            You are not authorised to view this page.
          </h1>
          <p style={{ fontSize: 13, color: "#71717a", lineHeight: 1.7, margin: 0 }}>
            This section is restricted to authorised users only. Sign in with the correct account, or upgrade your plan to gain access.
          </p>
        </div>

        {/* Card */}
        <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: "24px" }}>

          <p style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.15em", color: "#52525b", marginBottom: 4 }}>
            Why am I seeing this?
          </p>

          {[
            { label: "Not signed in", body: "You need an account to access this resource." },
            { label: "Wrong role", body: "This page is restricted to a specific account type (client or lawyer)." },
            { label: "Plan limit reached", body: "Your current plan does not include access to this feature." },
          ].map(({ label, body }) => (
            <div className="info-row" key={label}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(239,68,68,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg style={{ width: 15, height: 15, color: "#f87171" }} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 500, color: "#e4e4e7", margin: "0 0 2px" }}>{label}</p>
                <p style={{ fontSize: 12, color: "#71717a", margin: 0, lineHeight: 1.5 }}>{body}</p>
              </div>
            </div>
          ))}

          {/* Actions */}
          <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 8 }}>
            <Link href="/auth/signin"
              className="block text-center py-3 rounded-xl text-xs font-semibold text-white transition"
              style={{ background: "linear-gradient(135deg, #b45309, #d97706)" }}>
              Sign in to your account
            </Link>
            <Link href="/plans"
              className="block text-center py-3 rounded-xl text-xs font-semibold text-zinc-400 border border-zinc-800 hover:border-zinc-700 hover:text-zinc-200 transition">
              View available plans
            </Link>
            <Link href="/"
              className="block text-center py-3 rounded-xl text-xs font-semibold text-zinc-500 hover:text-zinc-300 transition">
              ← Go back home
            </Link>
          </div>
        </div>

        <p className="text-center mt-5" style={{ fontSize: 11, color: "#3f3f46" }}>
          Need help?{" "}
          <a href="mailto:support@legalsolutions.com" style={{ color: "#52525b" }}>
            Contact support
          </a>
        </p>
      </div>
    </main>
  );
}