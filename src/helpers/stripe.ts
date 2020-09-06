import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_KEY || 'helloooo', {
  apiVersion: '2020-08-27'
})

export const stripeCharge = async (
  amount: number,
  currency: string,
  stripeToken: string,
  customerEmail: string
): Promise<Stripe.Charge | Stripe.Response<any>> => {
  try {
    const charge = await stripe.charges.create({
      amount,
      currency,
      source: stripeToken,
      receipt_email: customerEmail
    })

    return charge
  } catch (error) {
    return error
  }
}

export default stripeCharge
