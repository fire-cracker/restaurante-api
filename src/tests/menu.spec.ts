import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'

import app from '../app'
import { menuDetails } from './mocks/menus.mock'

chai.use(chaiHttp)

describe('Tests for menus', () => {
  describe('Tests for get all menus', () => {
    it('should get all menus if request is correct', async () => {
      const res = await chai.request(app).get('/menus')
      expect(res).to.have.status(200)
      expect(res.body)
        .to.be.an.instanceof(Object)
        .that.includes.all.keys('status', 'data')
        .and.to.have.property('data')
        .that.includes.all.keys('menus', 'count')
        .and.to.have.property('menus')
        .and.to.be.an.instanceof(Array)
        .and.to.have.length.greaterThan(0)
        .and.to.have.deep.property('0')
        .that.includes.all.keys(menuDetails)
    })
  })

  describe('Tests for get a menu', () => {
    it('should get a menu if request is correct', async () => {
      const res = await chai.request(app).get('/menus/1')
      expect(res).to.have.status(200)
      expect(res.body)
        .to.be.an.instanceof(Object)
        .that.includes.all.keys('status', 'data')
        .and.to.have.property('data')
        .and.to.have.property('menu')
        .that.includes.all.keys(menuDetails)
        .and.to.have.property('name')
        .and.to.equal('Cinnamon Baked Doughnuts')
    })

    it('should error if menu does not exist', async () => {
      const res = await chai.request(app).get('/menus/30')
      expect(res).to.have.status(404)
      expect(res.body)
        .to.be.an.instanceof(Object)
        .that.includes.all.keys('status', 'data')
        .and.to.have.property('data')
        .and.to.have.deep.property('message')
        .and.to.equal('Menu does not exist')
    })
  })
})
