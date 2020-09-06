export interface TimeStampInterface {
  createdAt?: Date
  updatedAt?: Date
}

export interface UserInterface extends TimeStampInterface {
  id: string
  username: string
  email: string
  role: string
}

export interface NewUserInterface {
  username: string
  email: string
  password: string
}

export interface NewReservationInterface {
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

export interface IdInterface {
  id: number
}
