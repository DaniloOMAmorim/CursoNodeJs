import request from 'supertest'
import app from '../config/app'

describe('SignUp Routes', () => {
  test('Should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Danilo Amorim',
        email: 'danilo.om.amorim.br@gmail.com',
        password: 'danilo123',
        passwordConfirmation: 'danilo123'
      })
      .expect(200)
  })
})
