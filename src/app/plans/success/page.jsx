import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createSubscription } from '@/lib/actions/subscriptions'

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)')

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent'],
  })

  const { status, customer_details, line_items, metadata} = session
  const customerEmail = customer_details?.email
  const planName = line_items?.data?.[0]?.description ?? 'Your plan'
  const amount = line_items?.data?.[0]?.amount_total
  const price = amount ? `$${(amount / 100).toFixed(0)} / month` : null

  // calculate next renewal date
  const nextRenewal = new Date()
  nextRenewal.setMonth(nextRenewal.getMonth() + 1)
  const renewalLabel = nextRenewal.toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  })

  if (status === 'open') redirect('/')

  if (status === 'complete') {
const subsInfo = {
  email:customerEmail,
  planId: metadata.planId
}

const result = await createSubscription(subsInfo)
console.log(result)
    return (
      <main
        className="min-h-screen flex items-center justify-center px-4 py-16"
        style={{ background: 'linear-gradient(160deg, #0f0f10 0%, #111113 60%, #13110f 100%)' }}
      >
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&display=swap');
          .seal-line { width: 32px; height: 1px; background: rgba(186,117,23,0.5); display: inline-block; vertical-align: middle; margin: 0 10px; }
          .info-row { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.06); font-size: 13px; }
          .info-row:last-child { border-bottom: none; }
        `}</style>

        <div style={{ maxWidth: 420, width: '100%' }}>

          {/* Check mark */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
              <svg className="w-7 h-7 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>

            <div className="flex items-center justify-center mb-3">
              <span className="seal-line" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-600/80">
                Payment confirmed
              </span>
              <span className="seal-line" />
            </div>

            <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              className="text-3xl font-bold text-zinc-100 mb-2">
              Your plan is now active.
            </h1>
            <p className="text-sm text-zinc-400 leading-relaxed">
              A confirmation has been sent to{' '}
              <span className="text-zinc-200 font-medium">{customerEmail}</span>
            </p>
          </div>

          {/* Summary card */}
          <div className="rounded-2xl border border-zinc-800/60 bg-white/[0.025] p-5 mb-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-zinc-600 mb-3">
              Subscription summary
            </p>
            <div className="info-row">
              <span className="text-zinc-400">Plan</span>
              <span className="text-zinc-100 font-medium">{planName}</span>
            </div>
            {price && (
              <div className="info-row">
                <span className="text-zinc-400">Billing</span>
                <span className="text-zinc-200">{price}</span>
              </div>
            )}
            <div className="info-row">
              <span className="text-zinc-400">Status</span>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Active
              </span>
            </div>
            <div className="info-row">
              <span className="text-zinc-400">Next renewal</span>
              <span className="text-zinc-200">{renewalLabel}</span>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="rounded-xl bg-zinc-900/50 border border-zinc-800/40 px-4 py-3 flex gap-3 items-start mb-6">
            <svg className="w-4 h-4 text-zinc-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Legal counsel fees and retainer agreements are arranged separately with your chosen lawyer. This charge covers platform access only.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2">
            <Link href="/"
              className="block text-center py-3 rounded-xl text-xs font-semibold text-white transition"
              style={{ background: 'linear-gradient(135deg, #b45309, #d97706)' }}>
              Go to my Home →
            </Link>
            <Link href="/cases"
              className="block text-center py-3 rounded-xl text-xs font-semibold text-zinc-400 border border-zinc-800 hover:border-zinc-700 hover:text-zinc-200 transition">
              Browse open cases
            </Link>
          </div>

          <p className="text-center text-[11px] text-zinc-600 mt-6">
            Questions? Email{' '}
            <a href="mailto:support@yourdomain.com" className="text-zinc-500 hover:text-zinc-300 transition">
              support@yourdomain.com
            </a>
          </p>
        </div>
      </main>
    )
  }
}