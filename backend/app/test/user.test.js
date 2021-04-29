const request = require('supertest')
const jwt = require('jsonwebtoken')
const app = require('../../app')
const db = require('../../app/models')
const User = db.users

const userOne = {
    id: 1,
    email: 'admin@test.com',
    firstName: 'Nicolas', 
    lastName: 'Leveque',
    password: 'mySecurePassword',
    admin: true
}

const userTwo = {
    id: 2,
    email: 'vanessa@test.com',
    firstName: 'Vanessa', 
    lastName: 'Jullian', 
    password: 'anotherSecurePassword',
    admin: false
}


const tokenUserTwo = jwt.sign({ id: 2 }, process.env.JWT_TOKEN)

beforeAll( async () => {
    await User.destroy({
        where: { 
            id: 1
        }
    })
    await User.destroy({
        where: { 
            id: 2
        }
    })
    await User.create( userTwo )
})

test('create new admin user', async () => {
    await request(app)
        .post('/signup')
        .send( userOne )
        .expect(201)
})

test('login existing user', async () => {
    await request(app)
        .post('/login')
        .send({ 
            email: userTwo.email,
            password: userTwo.password
        })
        .expect(200)
})

test('Should not login nonexistent user', async () => {
    await request(app)
        .post('/login')
        .send({ 
            email: userTwo.email, 
            password: "alsoFalse "
        })
        .expect(400)
})


test('get user profile', async () => {
    await request(app)
        .get('/user/me')
        .set('Authorization', `Bearer ${tokenUserTwo}`)
        .send()
        .expect(200)
})

test('not get user profile unauthenticated', async () => {
    await request(app)
        .get('/user/me')
        .send()
        .expect(401)
})

test('Should modify user infos', async () => {
    await request(app)
        .put('/user/2')
        .set('Authorization', `Bearer ${tokenUserTwo}`)
        .send({ firstName: "Van" })
        .expect(200)
})

test('Delete user profile', async () => {
    await request(app)
        .delete('/2')
        .set('Authorization', `Bearer ${tokenUserTwo}`)
        .send()
        .expect(200)
}) 

test('Should not delete user without authentication', async () => {
    await request(app)
        .delete('/2')
        .send()
        .expect(401)
})

