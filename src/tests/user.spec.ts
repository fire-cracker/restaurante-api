import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'

import app from '../app'
import {
  userDetails,
  newUser,
  newUser2,
  incorrectNewUser,
  loginUser,
  incorrectLoginDetails,
  incorrectLoginDetails2,
  incorrectLoginDetails3
} from './mocks/users.mock'

chai.use(chaiHttp)

describe('Tests for users', () => {
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
      const res = await chai.request(app).post('/auth/login').send(loginUser)
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
})
