import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const PLAN_PRICE_ID = {
    'client_claimant': 'price_1TlWUZCJT7mduo5VOsKO0F0y',
    'client_executive': 'price_1TlWV6CJT7mduo5VJRCIPnWv',

    // 'client_basic': 'price_1TlXlGCJT7mduo5VTkWoR4po',

    'lawyer_counsel': 'price_1TlWXlCJT7mduo5Vzw6HsYV9',
    'lawyer_firm': 'price_1TlWYKCJT7mduo5VgapPzWEv',

    // 'lawyer_associate': 'price_1TlXlmCJT7mduo5VZgahF8kp'

}