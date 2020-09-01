import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'

import app from '../app'
import { adminLogin, customerLogin, invalidUserToken } from './mocks/users.mock'
import { newReservation, incorrectNewReservation } from './mocks/reservations.mock'

chai.use(chaiHttp)

describe('Tests for reservations', () => {
  let adminToken: string, customerToken: string
  before(async () => {
    const {
      body: {
        data: { token }
      }
    } = await chai.request(app).post('/auth/login').send(adminLogin)
    adminToken = token

    const {
      body: {
        data: { token: token2 }
      }
    } = await chai.request(app).post('/auth/login').send(customerLogin)
    customerToken = token2
  })

  describe('Tests for create reservations', () => {
    it('should create reservation if request is correct', async () => {
      const res = await chai.request(app).post('/reservations').set('Authorization', `${customerToken}`).send(newReservation)
      expect(res).to.have.status(200)
      expect(res.body)
        .to.be.an.instanceof(Object)
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

    it('should return error if request to create reservation is incorrect', async () => {
      const res = await chai
        .request(app)
        .post('/reservations')
        .set('Authorization', `${customerToken}`)
        .send(incorrectNewReservation)
      expect(res).to.have.status(400)
      expect(res.body)
        .to.be.an.instanceof(Object)
        .that.includes.all.keys('status', 'data')
        .and.to.have.property('data')
        .that.includes.all.keys(['message', 'field'])
    })

    it('should return error if user token is invalid', async () => {
      const res = await chai.request(app).post('/reservations').set('Authorization', `${invalidUserToken}`).send(newReservation)
      expect(res).to.have.status(401)
    })
  })

  describe('Tests for get all reservations', () => {
    it('should get all reservations if request made by admin and is correct', async () => {
      const res = await chai.request(app).get('/reservations').set('Authorization', `${adminToken}`)
      expect(res).to.have.status(200)
      expect(res.body)
        .to.be.an.instanceof(Object)
        .and.to.have.property('data')
        .that.includes.all.keys('reservations', 'count')
        .and.to.have.property('reservations')
        .and.to.be.an.instanceof(Array)
        .and.to.have.length.greaterThan(0)
        .and.to.have.property('0')
        .that.includes.all.keys('id', 'date', 'price', 'userId', 'persons')
    })

    it('should return error if request was not made by the admin', async () => {
      const res = await chai.request(app).get('/reservations').set('Authorization', `${customerToken}`)
      expect(res).to.have.status(401)
      expect(res.body)
        .to.be.an.instanceof(Object)
        .that.includes.all.keys('status', 'data')
        .and.to.have.property('data')
        .and.to.have.deep.property('message')
        .and.to.be.equal('Unauthorised to make this request')
    })
  })

  describe('Tests for get a reservation', () => {
    it('should get a reservation if request is correct', async () => {
      const res = await chai.request(app).get('/reservations/1').set('Authorization', `${adminToken}`)
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

    it('should return error if request was not made by the admin', async () => {
      const res = await chai.request(app).get('/reservations/1').set('Authorization', `${customerToken}`)
      expect(res).to.have.status(401)
      expect(res.body)
        .to.be.an.instanceof(Object)
        .that.includes.all.keys('status', 'data')
        .and.to.have.property('data')
        .and.to.have.deep.property('message')
        .and.to.be.equal('Unauthorised to make this request')
    })

    it('should error if reservation does not exist', async () => {
      const res = await chai.request(app).get('/reservations/50').set('Authorization', `${adminToken}`)
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