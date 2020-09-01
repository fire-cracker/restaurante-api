import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'

import app from '../app'
import {
  userDetails,
  newUser,
  newUser2,
  incorrectNewUser,
  adminLogin,
  incorrectLoginDetails,
  incorrectLoginDetails2,
  incorrectLoginDetails3,
  customerLogin,
  customerLogin2
} from './mocks/users.mock'

chai.use(chaiHttp)

describe('Tests for users', () => {
  let adminToken: string, customerToken: string, customerToken2: string, customerId: string, customerId2: string
  before(async () => {
    const {
      body: {
        data: { token }
      }
    } = await chai.request(app).post('/auth/login').send(adminLogin)
    adminToken = token

    const {
      body: {
        data: {
          user: { id },
          token: token2
        }
      }
    } = await chai.request(app).post('/auth/login').send(customerLogin)
    customerToken = token2
    customerId = id

    const {
      body: {
        data: { token: token3 }
      }
    } = await chai.request(app).post('/auth/login').send(customerLogin2)
    customerToken2 = token3

    const {
      body: {
        data: {
          user: { id: id2 }
        }
      }
    } = await chai.request(app).post('/auth/signup').send(newUser2)
    customerId2 = id2
  })

  describe('Tests for user signup', () => {
    it('should create user if request is correct', async () => {
      const res = await chai.request(app).post('/auth/signup').send(newUser)
      expect(res).to.have.status(200)
      expect(res.body)
        .to.be.an.instanceof(Object)
        .that.includes.all.keys('status', 'data')
        .and.to.have.property('data')
        .that.includes.all.keys('user', 'token')
        .and.to.have.property('user')
        .that.includes.all.keys(userDetails)
    })

    it('should return error if request to create user is incorrect', async () => {
      const res = await chai.request(app).post('/auth/signup').send(incorrectNewUser)
      expect(res).to.have.status(400)
      expect(res.body)
        .to.be.an.instanceof(Object)
        .that.includes.all.keys('status', 'data')
        .and.to.have.property('data')
        .that.includes.all.keys(['message', 'field'])
    })

    it('should return error if user already exist', async () => {
      const res = await chai.request(app).post('/auth/signup').send(newUser)
      expect(res).to.have.status(409)
      expect(res.body)
        .to.be.an.instanceof(Object)
        .that.includes.all.keys('status', 'data')
        .and.to.have.property('data')
        .and.to.have.deep.property('message')
        .and.to.equal('User with this email already exist.')
    })
  })

  describe('Tests for login User', () => {
    it('should login user if request is correct', async () => {
      const res = await chai.request(app).post('/auth/login').send(adminLogin)
      expect(res).to.have.status(200)
      expect(res.body)
        .to.be.an.instanceof(Object)
        .that.includes.all.keys('status', 'data')
        .and.to.have.property('data')
        .that.includes.all.keys('user', 'token')
        .and.to.have.property('user')
        .that.includes.all.keys(userDetails)
    })

    it('should return error if user password is incorrect', async () => {
      const res = await chai.request(app).post('/auth/login').send(incorrectLoginDetails)
      expect(res).to.have.status(404)
      expect(res.body)
        .to.be.an.instanceof(Object)
        .that.includes.all.keys('status', 'data')
        .and.to.have.property('data')
        .and.to.have.deep.property('message')
        .and.to.equal('Provide correct login credentials')
    })

    it('should return error if user email does not exist', async () => {
      const res = await chai.request(app).post('/auth/login').send(incorrectLoginDetails2)
      expect(res).to.have.status(404)
      expect(res.body)
        .to.be.an.instanceof(Object)
        .that.includes.all.keys('status', 'data')
        .and.to.have.property('data')
        .and.to.have.deep.property('message')
        .and.to.equal('Email does not exist')
    })

    it('should return error if request to login user is incorrect', async () => {
      const res = await chai.request(app).post('/auth/login').send(incorrectLoginDetails3)
      expect(res).to.have.status(400)
      expect(res.body)
        .to.be.an.instanceof(Object)
        .that.includes.all.keys('status', 'data')
        .and.to.have.property('data')
        .that.includes.all.keys(['message', 'field'])
    })
  })

  describe('Tests for get users reservations', () => {
    it('should get users reservations if request made by reservtion owner and is correct', async () => {
      const res = await chai.request(app).get(`/users/${customerId}/reservations`).set('Authorization', `${customerToken}`)
      expect(res).to.have.status(200)
      expect(res.body)
        .to.be.an.instanceof(Object)
        .that.includes.all.keys('status', 'data')
        .and.to.have.property('data')
        .and.to.have.property('reservation')
        .and.to.be.an.instanceof(Array)
        .and.to.have.property('0')
        .that.includes.all.keys('id', 'date', 'price', 'userId', 'persons', 'orders')
        .and.to.have.property('orders')
        .and.to.be.an.instanceof(Array)
        .and.to.have.property('0')
        .that.includes.all.keys('quantity', 'menus')
        .and.to.have.property('menus')
        .to.be.an.instanceof(Object)
        .that.includes.all.keys('id', 'name', 'price', 'type')
    })

    it('should get users reservations if request made by admin and is correct', async () => {
      const res = await chai.request(app).get(`/users/${customerId}/reservations`).set('Authorization', `${adminToken}`)
      expect(res).to.have.status(200)
      expect(res.body)
        .to.be.an.instanceof(Object)
        .that.includes.all.keys('status', 'data')
        .and.to.have.property('data')
        .and.to.have.property('reservation')
        .and.to.be.an.instanceof(Array)
        .and.to.have.property('0')
        .that.includes.all.keys('id', 'date', 'price', 'userId', 'persons', 'orders')
        .and.to.have.property('orders')
        .and.to.be.an.instanceof(Array)
        .and.to.have.property('0')
        .that.includes.all.keys('quantity', 'menus')
        .and.to.have.property('menus')
        .to.be.an.instanceof(Object)
        .that.includes.all.keys('id', 'name', 'price', 'type')
    })

    it('should error if request is made by another user who is not an admin', async () => {
      const res = await chai.request(app).get(`/users/${customerId}/reservations`).set('Authorization', `${customerToken2}`)
      expect(res).to.have.status(401)
      expect(res.body)
        .to.be.an.instanceof(Object)
        .that.includes.all.keys('status', 'data')
        .and.to.have.property('data')
        .and.to.have.deep.property('message')
        .and.to.equal('Unauthorised to make this request')
    })

    it('should error if user reservation does not exist', async () => {
      const res = await chai.request(app).get(`/users/${customerId2}/reservations`).set('Authorization', `${adminToken}`)
      expect(res).to.have.status(404)
      expect(res.body)
        .to.be.an.instanceof(Object)
        .that.includes.all.keys('status', 'data')
        .and.to.have.property('data')
        .and.to.have.deep.property('message')
        .and.to.equal('Reservation does not exist')
    })
  })
})
