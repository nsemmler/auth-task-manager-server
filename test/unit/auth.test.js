const { expect } = require('chai')
const { sign, verify } = require('jsonwebtoken')
const {
  createToken,
  parseToken
} = require('../../src/lib/auth')
const { SECRET_KEY } = process.env

describe('Util: Auth', function () {
  describe('#createToken', function () {
    it('creates a valid JWT token with the given ID', function () {
      const actual = createToken(1)

      expect(actual).to.be.ok
      expect(verify(actual, SECRET_KEY)).not.throw
    })
  })

  describe('#parseToken', function () {
    it('parses a valid JWT token', function () {
      const actual = createToken(1)
      const token = sign({ sub: 1 }, SECRET_KEY, { expiresIn: '10 seconds' })

      expect(actual).to.be.ok
      expect(verify(actual, SECRET_KEY).id).to.equal(verify(token, SECRET_KEY).id)
    })
  })
})
