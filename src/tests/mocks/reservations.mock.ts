export const newReservation = {
  date: '8/31/2020',
  price: 300,
  persons: 2,
  orders: [
    { menuId: 1, quantity: 3 },
    { menuId: 2, quantity: 4 }
  ]
}

export const incorrectNewReservation = {
  date: '',
  price: 300,
  persons: 2,
  orders: [
    { menuId: 1, quantity: 3 },
    { menuId: 2, quantity: 4 }
  ]
}
