const request = require('supertest')
const jwt = require('jsonwebtoken')
const app = require('../../app')
const db = require('../../app/models')
const User = db.users
const Post = db.posts

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

const postOne = {
    id: 1,
    titre: 'Lorem Ipsum',
    contenu: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tincidunt tortor augue',
    userId: 1,

}

const postTwo = {
    id: 2,
    titre: 'Another post',
    contenu: 'YAP (yet another post)',
    userId: 2,
}

const postThree = {
    id: 3,
    titre: 'Lorem Ipsum 2',
    contenu: 'Un texte en latin bien connu',
    userId: 1,
}

beforeAll( async () => {

})

afterAll( async () => {
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
    await Post.destroy({
        where: {
            id: 1
        }
    })
    await Post.destroy({
        where: {
            id: 2
        }
    })
    await Post.destroy({
        where: {
            id: 3
        }
    })

    await db.sequelize.close()
})

test('create new admin user', async () => {
    await request(app)
        .post('/signup')
        .send( userOne )
        .expect(201)
})

test('create new normal user', async () => {
    await request(app)
        .post('/signup')
        .send( userTwo )
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
            email: "error@test.com",
            password: "alsoFalse "
        })
        .expect(400)
})


test('get user profile', async () => {
    await request(app)
        .get('/me')
        .set('Authorization', `Bearer ${tokenUserTwo}`)
        .send()
        .expect(200)
})

test('not get user profile unauthenticated', async () => {
    await request(app)
        .get('/me')
        .send()
        .expect(401)
})

test('Should modify user infos',  async () => {
    await request(app)
        .put('/modify')
        .set('Authorization', `Bearer ${tokenUserTwo}`)
        .send({ firstName: "Van" })
        .expect(200)
})

test('Should add a new post', async () => {
    await request(app)
        .post('/post')
        .set('Authorization', `Bearer ${tokenUserOne}`)
        .send( postOne)
        .expect(201)
})

test('should modify post' ,async () => {
    await request(app)
        .put('/post/1')
        .set('Authorization', `Bearer ${tokenUserOne}`)
        .send({
            contenu: 'un nouveau contenu'
        })
        .expect(200)
})

test('should get one post', async () => {
    await request(app)
        .get('/post/1')
        .set('Authorization', `Bearer ${tokenUserOne}`)
        .send()
        .expect(200)
})

test('should delete one post', async () => {
    await request(app)
        .delete('/post/2')
        .set('Authorization', `Bearer ${tokenUserTwo}`)
        .send()
        .expect(200)
})

test('should get all posts from 1 user', async () => {
    await request(app)
        .get('/users/1')
        .set('Authorization', `Bearer ${tokenUserTwo}`)
        .send()
        .expect(200)
})

test('should get all posts', async () => {
    await request(app)
        .get('/post')
        .set('Authorization', `Bearer ${tokenUserTwo}`)
        .send()
        .expect(200)
})

test('Delete user profile', async () => {
    await request(app)
        .delete('/delete')
        .set('Authorization', `Bearer ${tokenUserTwo}`)
        .send()
        .expect(200)
}) 

test('Should not delete user without authentication', async () => {
    await request(app)
        .delete('/delete')
        .send()
        .expect(401)
})

