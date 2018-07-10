const { NODE_ENV } = process.env

const chai = require('chai')
const expect = chai.expect

chai.use(require('chai-http'))
const app = require('../../src/app')

describe('/api/lists', function () {
  describe('GET /api/lists', function () {
    it('should return an error if no token is sent', async function () {
      const response = await chai.request(app).get('/api/lists')

      expect(response.status).to.equal(401)
      expect(response.body).to.be.ok
      expect(response.body.error).to.be.ok
    })

    it('should return all lists for a given user', async function () {
      const userInfo = { email: 'student@galvanize.com', password: 'password' }
      const loginResponse = await chai.request(app)
        .post('/api/users/login')
        .send(userInfo)

      const response = await chai.request(app)
        .get('/api/lists')
        .set('Authorization', `Bearer ${loginResponse.body.token}`)

      expect(response.status).to.equal(200)
      expect(response.body).to.be.ok
      expect(response.body.lists).to.be.ok
      expect(response.body.lists.length).to.be.ok
    })
  })

  describe('POST /api/lists', function () {
    it('should return an error if no token is sent', async function () {
      const response = await chai.request(app)
        .post('/api/lists')
        .send({ title: 'My List' })

      expect(response.status).to.equal(401)
      expect(response.body).to.be.ok
      expect(response.body.error).to.be.ok
    })

    it('should return an error if no title is sent', async function () {
      const userInfo = { email: 'student@galvanize.com', password: 'password' }
      const loginResponse = await chai.request(app)
        .post('/api/users/login')
        .send(userInfo)

      const response = await chai.request(app)
        .post('/api/lists')
        .set('Authorization', `Bearer ${loginResponse.body.token}`)

      expect(response.status).to.equal(400)
      expect(response.body).to.be.ok
      expect(response.body.error).to.be.ok
    })

    it('should create a new list for the given user', async function () {
      const userInfo = { email: 'student@galvanize.com', password: 'password' }
      const loginResponse = await chai.request(app)
        .post('/api/users/login')
        .send(userInfo)

      const response = await chai.request(app)
        .post('/api/lists')
        .send({ title: 'My List' })
        .set('Authorization', `Bearer ${loginResponse.body.token}`)

      expect(response.status).to.equal(201)
      expect(response.body).to.be.ok
      expect(response.body.list).to.be.ok
      expect(response.body.list.id).to.be.ok
    })
  })

  describe('DELETE /api/lists', function () {
    beforeEach(async function () {
      const user = { email: 'student@galvanize.com', password: 'password' }
      const login = await chai.request(app)
        .post('/api/users/login')
        .send(user)

      this.token = login.body.token

      const response = await chai.request(app)
        .get('/api/lists')
        .set('Authorization', `Bearer ${this.token}`)

      this.id = response.body.lists[0].id
    })

    it('should return an error if no token is sent', async function () {
      const response = await chai.request(app)
        .delete(`/api/lists/${this.id}`)

      expect(response.status).to.equal(401)
      expect(response.body).to.be.ok
      expect(response.body.error).to.be.ok
    })

    it('should return an error if that user is not authorized to delete the list', async function () {
      const userInfo = { email: 'instructor@galvanize.com', password: 'password' }
      const loginResponse = await chai.request(app)
        .post('/api/users/login')
        .send(userInfo)

      const response = await chai.request(app)
        .delete(`/api/lists/${this.id}`)
        .set('Authorization', `Bearer ${loginResponse.body.token}`)

      expect(response.status).to.equal(401)
      expect(response.body).to.be.ok
      expect(response.body.error).to.be.ok
    })

    it('delete a specific list', async function () {
      const response = await chai.request(app)
        .delete(`/api/lists/${this.id}`)
        .set('Authorization', `Bearer ${this.token}`)

      expect(response.status).to.equal(200)
      expect(response.body).to.be.ok
      expect(response.body.list).to.be.ok
      expect(response.body.list.id).to.equal(this.id)
    })
  })
})
