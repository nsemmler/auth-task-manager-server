const { NODE_ENV } = process.env

const chai = require('chai')
const expect = chai.expect

chai.use(require('chai-http'))
const app = require('../../src/app')

describe('/api/lists/:listId/tasks', function () {
  beforeEach(async function () {
    const user = { email: 'student@galvanize.com', password: 'password' }
    const login = await chai.request(app)
      .post('/api/users/login')
      .send(user)

    this.token = login.body.token

    const response = await chai.request(app)
      .get('/api/lists')
      .set('Authorization', `Bearer ${this.token}`)

    this.list = response.body.lists[0]
  })

  describe('POST /api/lists/:listId/tasks', function () {
    it('should return an error if no token is sent', async function () {
      const response = await chai.request(app)
        .post(`/api/lists/${this.list.id}/tasks`)

      expect(response.status).to.equal(401)
      expect(response.body).to.be.ok
      expect(response.body.error).to.be.ok
    })
    it('should return an error if a user is trying to change a list they do not own', async function () {
      const user = { email: 'instructor@galvanize.com', password: 'password' }
      const login = await chai.request(app)
        .post('/api/users/login')
        .send(user)

      const token = login.body.token

      const response = await chai.request(app)
        .post(`/api/lists/${this.list.id}/tasks`)
        .send({ title: 'My Task' })
        .set('Authorization', `Bearer ${token}`)

      expect(response.status).to.equal(401)
      expect(response.body).to.be.ok
      expect(response.body.error).to.be.ok
    })
    it('should return an error if there is no title', async function () {
      const response = await chai.request(app)
        .post(`/api/lists/${this.list.id}/tasks`)
        .set('Authorization', `Bearer ${this.token}`)

      expect(response.status).to.equal(400)
      expect(response.body).to.be.ok
      expect(response.body.error).to.be.ok
    })
    it('should create a new task on the specified list', async function () {
      const response = await chai.request(app)
        .post(`/api/lists/${this.list.id}/tasks`)
        .send({ title: 'My Task' })
        .set('Authorization', `Bearer ${this.token}`)

      expect(response.status).to.equal(201)
      expect(response.body).to.be.ok
      expect(response.body.task).to.be.ok
      expect(response.body.task.id).to.be.ok
    })
  })

  describe('PATCH /api/lists/:listId/tasks/:id', function () {
    it('should return an error if no token is sent', async function () {
      const { id, tasks } = this.list
      const response = await chai.request(app)
        .patch(`/api/lists/${id}/tasks/${tasks[0].id}`)

      expect(response.status).to.equal(401)
      expect(response.body).to.be.ok
      expect(response.body.error).to.be.ok
    })
    it('should return an error if a user is trying to change a list they do not own', async function () {
      const user = { email: 'instructor@galvanize.com', password: 'password' }
      const login = await chai.request(app)
        .post('/api/users/login')
        .send(user)

      const token = login.body.token

      const { id, tasks } = this.list
      const response = await chai.request(app)
        .patch(`/api/lists/${id}/tasks/${tasks[0].id}`)
        .send({ completed: true })
        .set('Authorization', `Bearer ${token}`)

      expect(response.status).to.equal(401)
      expect(response.body).to.be.ok
      expect(response.body.error).to.be.ok
    })
    it('should modify the given task on the specified list', async function () {
      const { id, tasks } = this.list
      const response = await chai.request(app)
        .patch(`/api/lists/${id}/tasks/${tasks[0].id}`)
        .send({ completed: true })
        .set('Authorization', `Bearer ${this.token}`)

      expect(response.status).to.equal(200)
      expect(response.body).to.be.ok
      expect(response.body.task).to.be.ok
      expect(response.body.task.completed).to.be.ok
    })
  })

  describe('DELETE /api/lists/:listId/tasks/:id', function () {
    it('should return an error if no token is sent', async function () {
      const { id, tasks } = this.list
      const response = await chai.request(app)
        .delete(`/api/lists/${id}/tasks/${tasks[0].id}`)

      expect(response.status).to.equal(401)
      expect(response.body).to.be.ok
      expect(response.body.error).to.be.ok
    })
    it('should return an error if a user is trying to change a list they do not own', async function () {
      const user = { email: 'instructor@galvanize.com', password: 'password' }
      const login = await chai.request(app)
        .post('/api/users/login')
        .send(user)

      const token = login.body.token

      const { id, tasks } = this.list
      const response = await chai.request(app)
        .delete(`/api/lists/${id}/tasks/${tasks[0].id}`)
        .set('Authorization', `Bearer ${token}`)

      expect(response.status).to.equal(401)
      expect(response.body).to.be.ok
      expect(response.body.error).to.be.ok
    })
    it('should delete the given task on the specified list', async function () {
      const { id, tasks } = this.list
      const response = await chai.request(app)
        .delete(`/api/lists/${id}/tasks/${tasks[0].id}`)
        .set('Authorization', `Bearer ${this.token}`)

      expect(response.status).to.equal(200)
      expect(response.body).to.be.ok
      expect(response.body.task).to.be.ok
    })
  })
})
