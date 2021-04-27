const request = require('supertest')
const app = require('../../app')

const userOne = {
    id: 1,
    email: 'admin@test.com',
    firstName: 'Nicolas', 
    lastName: 'Leveque',
    password: 'mySecurePassword',
    admin: 'true'
}

test('create new user', async () => {
    await request(app)
        .post('/signup')
        .send( userOne )
        .expect(201)
})