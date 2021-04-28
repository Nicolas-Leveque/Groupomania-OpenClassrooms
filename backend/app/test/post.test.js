const request = require('supertest')
const jwt = require('jsonwebtoken')
const app = require('../../app')
const db = require('../../app/models')
const Post = db.posts
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

const postOne = {
    id: 1,
    type_post: 'text',
    titre: 'Lorem Ipsum',
    contenu: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tincidunt tortor augue',
    userId: 1,

}

const postTwo = {
    id: 2,
    type_post: 'link',
    titre: 'A link post',
    contenu: 'www.anewpost.com',
    userId: 2,
}

const postThree = {
    id: 3,
    type_post: 'text',
    titre: 'Lorem Ipsum 2',
    contenu: 'Une texte en latin bien connu',
    userId: 1,
}

const tokenUserOne = jwt.sign({ id: 1 }, process.env.JWT_TOKEN)
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
    await User.create( userOne )
    await User.create( userTwo )
    await Post.create( postTwo )
    await Post.create( postThree )
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