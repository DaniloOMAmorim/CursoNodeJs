import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'
import { hash } from 'bcrypt'

let accountCollection: Collection

describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /signup', () => {
    test('Should return 200 on signup', async () => {
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

  describe('POST /login', () => {
    test('Should return 200 on signup', async () => {
      const password = await hash('danilo123', 12)
      await accountCollection.insertOne({
        name: 'Danilo Amorim',
        email: 'danilo.om.amorim.br@gmail.com',
        password
      })
      await request(app)
        .post('/api/login')
        .send({
          email: 'danilo.om.amorim.br@gmail.com',
          password: 'danilo123'
        })
        .expect(200)
    })

    test('Should return 200 on signup', async () => {
      const password = await hash('danilo123', 12)
      await accountCollection.insertOne({
        name: 'Danilo Amorim',
        email: 'danilo.om.amorim.br@gmail.com',
        password
      })
      await request(app)
        .post('/api/login')
        .send({
          email: 'danilo.om.amorim.br@gmail.com',
          password: 'danilo123'
        })
        .expect(200)
    })
  })
})
