export const newReservation = {
  date: '8/31/2020',
  time: '23:00',
  persons: 2,
  type: 'dinner',
  stripeToken: 'tok_visa'
}

export const wrongStripeIdReservation = {
  date: '8/31/2020',
  time: '23:00',
  persons: 2,
  type: 'dinner',
  stripeToken: 'tker_via'
}

export const incorrectNewReservation = {
  date: '',
  persons: 2,
  type: 'dinner',
  stripeToken: 'tok_visa'
}
