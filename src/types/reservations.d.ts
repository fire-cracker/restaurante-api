export interface TimeStampInterface {
  createdAt?: Date
  updatedAt?: Date
}

export interface INewReservation {
  date: Date
  time: string
  type: string
  stripeToken: string
  persons: number
}

export interface IReservation extends TimeStampInterface {
  id: number
  date: Date
  orders: any
  price: number
  persons: number
}
