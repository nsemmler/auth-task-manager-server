const { NODE_ENV } = process.env
if (NODE_ENV !== 'production') require('dotenv').load()

const chai = require('chai')
const expect = chai.expect

chai.use(require('chai-http'))
const app = require('../../src/app')

describe('/api/users', function () {
  describe('POST /api/users/signup', function () {
    it('should return an error if the password is missing', async function () {
      const response = await chai.request(app)
        .post('/api/users/signup')
        .send({
          first_name: 'First',
          last_name: 'Last',
          email: 'example@example.com'
        })

      expect(response.status).to.equal(400)
      expect(response.body).to.be.ok
      expect(response.body.error).to.be.ok
    })
    it('should return an error if the email is missing', async function () {
      const response = await chai.request(app)
        .post('/api/users/signup')
        .send({
          first_name: 'First',
          last_name: 'Last',
          password: 'password'
        })

      expect(response.status).to.equal(400)
      expect(response.body).to.be.ok
      expect(response.body.error).to.be.ok
    })
    it('should create a new user with valid information and return a token', async function () {
      const response = await chai.request(app)
        .post('/api/users/signup')
        .send({
          first_name: 'First',
          last_name: 'Last',
          email: 'example@example.com',
          password: 'password'
        })

      expect(response.status).to.equal(201)
      expect(response.body).to.be.ok
      expect(response.body.token).to.be.ok
      expect(response.body.password).to.not.be.ok
    })
  })

  describe('POST /api/users/login', function () {
    it('should return an error if the password is missing', async function () {
      const response = await chai.request(app)
        .post('/api/users/login')
        .send({
          email: 'instructor@galvanize.com'
        })

      expect(response.status).to.equal(401)
      expect(response.body).to.be.ok
      expect(response.body.error).to.be.ok
    })
    it('should return an error if the email is missing', async function () {
      const response = await chai.request(app)
        .post('/api/users/login')
        .send({
          password: 'password'
        })

      expect(response.status).to.equal(401)
      expect(response.body).to.be.ok
      expect(response.body.error).to.be.ok
    })
    it('should login the user with and return a token', async function () {
      const response = await chai.request(app)
        .post('/api/users/login')
        .send({
          email: 'instructor@galvanize.com',
          password: 'password'
        })

      expect(response.status).to.equal(200)
      expect(response.body).to.be.ok
      expect(response.body.token).to.be.ok
      expect(response.body.password).to.not.be.ok
    })
  })
})
