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

export interface IdInterface {
  id: number
}
