import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'

import app from '../app'
import {
  userDetails,
  newUser,
  incorrectNewUser,
  adminLogin,
  incorrectLoginDetails,
  incorrectLoginDetails2,
  incorrectLoginDetails3,
  customerLogin
} from './mocks/users.mock'

chai.use(chaiHttp)

describe.only('Tests for users', () => {
  let customerToken: string
  before(async () => {
    const {
      body: {
        data: { token: token2 }
      }
    } = await chai.request(app).post('/auth/login').send(customerLogin)
    customerToken = token2
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

  describe.only('Tests for get users reservations', () => {
    it('should get users reservations if request is correct', async () => {
      const res = await chai.request(app).get('/users/reservations').set('Authorization', `${customerToken}`)
      expect(res).to.have.status(200)
      expect(res.body)
        .to.be.an.instanceof(Object)
        .that.includes.all.keys('status', 'data')
        .and.to.have.property('data')
        .and.to.have.property('reservation')
        .that.includes.all.keys('id', 'date', 'price', 'userId', 'persons', 'orders')
        .and.to.have.property('orders')
        .and.to.be.an.instanceof(Array)
        .and.to.have.property('0')
        .that.includes.all.keys('quantity', 'menus')
        .and.to.have.property('menus')
        .to.be.an.instanceof(Object)
        .that.includes.all.keys('id', 'name', 'price', 'type')
    })

    // it('should return error if request was not made by the admin', async () => {
    //   const res = await chai.request(app).get('/reservations/1').set('Authorization', `${customerToken}`)
    //   expect(res).to.have.status(401)
    //   expect(res.body)
    //     .to.be.an.instanceof(Object)
    //     .that.includes.all.keys('status', 'data')
    //     .and.to.have.property('data')
    //     .and.to.have.deep.property('message')
    //     .and.to.be.equal('Unauthorised to make this request')
    // })

    it('should error if user reservation does not exist', async () => {
      const res = await chai.request(app).get('/users/reservations').set('Authorization', `${customerToken}`)
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
