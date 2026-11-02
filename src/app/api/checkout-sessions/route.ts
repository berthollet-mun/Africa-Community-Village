import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getStripe } from '@/lib/stripe';

export const runtime = 'nodejs';

const checkoutSchema = z.object({
  amount: z.number().min(5).max(10_000),
  donorName: z.string().trim().min(2).max(120),
  donorEmail: z.email().max(254),
  allocation: z.string().trim().min(1).max(100),
  anonymous: z.boolean().default(false),
  language: z.enum(['fr', 'en']).default('fr')
});

function appOrigin(request: NextRequest): string {
  return (process.env.NEXT_PUBLIC_APP_URL || request.nextUrl.origin).replace(/\/$/, '');
}

function errorResponse(error: unknown) {
  if (error instanceof z.ZodError) {
    return NextResponse.json(
      { error: 'Les informations du don sont invalides.', details: error.flatten() },
      { status: 400 }
    );
  }

  if (error instanceof Error && error.message === 'STRIPE_NOT_CONFIGURED') {
    return NextResponse.json(
      { error: 'Le paiement Stripe n’est pas encore configuré. Ajoutez STRIPE_SECRET_KEY au fichier .env.' },
      { status: 503 }
    );
  }

  console.error('Stripe Checkout error:', error);
  return NextResponse.json(
    { error: 'Impossible de préparer le paiement sécurisé pour le moment.' },
    { status: 500 }
  );
}

export async function POST(request: NextRequest) {
  try {
    const data = checkoutSchema.parse(await request.json());
    const amountInCents = Math.round(data.amount * 100);
    const origin = appOrigin(request);
    const stripe = getStripe();

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      allowed_payment_method_types: ['card'],
      submit_type: 'donate',
      customer_email: data.donorEmail,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'usd',
            unit_amount: amountInCents,
            product_data: {
              name: data.language === 'fr' ? 'Don à Africa Community Village' : 'Donation to Africa Community Village',
              description:
                data.language === 'fr'
                  ? 'Soutien direct aux programmes communautaires d’ACV en RDC.'
                  : 'Direct support for ACV community programs in the DRC.'
            }
          }
        }
      ],
      metadata: {
        donorName: data.anonymous ? 'Anonymous' : data.donorName,
        allocation: data.allocation,
        anonymous: String(data.anonymous)
      },
      success_url: `${origin}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/donate?amount=${data.amount}#donation-form`
    });

    if (!session.url) {
      throw new Error('Stripe Checkout did not return a redirect URL.');
    }

    return NextResponse.json({ success: true, url: session.url, sessionId: session.id });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function GET(request: NextRequest) {
  try {
    const sessionId = z.string().startsWith('cs_').max(255).parse(request.nextUrl.searchParams.get('session_id'));
    const session = await getStripe().checkout.sessions.retrieve(sessionId);

    return NextResponse.json(
      {
        success: true,
        data: {
          id: session.id,
          paymentStatus: session.payment_status,
          status: session.status,
          amountTotal: session.amount_total,
          currency: session.currency,
          donorName: session.metadata?.donorName || session.customer_details?.name || '',
          donorEmail: session.customer_details?.email || session.customer_email || '',
          allocation: session.metadata?.allocation || 'all'
        }
      },
      { headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (error) {
    return errorResponse(error);
  }
}
