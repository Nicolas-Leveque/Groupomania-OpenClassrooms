const request = require('supertest')
const jwt = require('jsonwebtoken')
const app = require('../../app')
const db = require('../../app/models')
const Post = db.posts
const User = db.users
const Comment = db.comments

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

const commentOne = {
    id: 1,
    contenu: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam condimentum vulputate nunc et dignissim. Donec tristique sem ut finibus venenatis. Praesent molestie purus lorem, eget lobortis felis consequat a.',
    postId: 1,
    userId: 2
}

const commentTwo = {
    id: 2,
    contenu: 'Lorem ipsum dolor sit amet, consectet',
    postId: 2,
    userId: 1
}
const commentThree = {
    id: 3,
    contenu: 'Un dernier commentaire, just au cas ou',
    postId: 2,
    userId: 1
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
    await Comment.destroy({
        where: { 
            id: 1
        }
    })
    await Comment.destroy({
        where: { 
            id: 2
        }
    })
    await Comment.destroy({
        where: { 
            id: 3
        }
    })
    await User.create( userOne )
    await User.create( userTwo )
    await Post.create( postOne )
    await Post.create( postTwo )
    await Post.create( postThree )
    await Comment.create( commentTwo )
    await Comment.create( commentThree )
})

test('should add a new comment', async () => {
    await request(app)
        .post('/comment')
        .set('Authorization', `Bearer ${tokenUserOne}`)
        .send( commentOne )
        .expect(201)
})

test('should modify comment', async () => {
    await request(app)
        .put('/comment/2')
        .set('Authorization', `Bearer ${tokenUserOne}`)
        .send({ contenu: "a new content for the comment" })
        .expect(200)
})

test('should get one comment', async () => {
    await request(app)
        .get('/comment/1')
        .set('Authorization', `Bearer ${tokenUserOne}`)
        .send()
        .expect(200)
})
test ('should get all comment for a post', async () => {
    await request(app)
        .get('/comment/post/2')
        .set('Authorization', `Bearer ${tokenUserOne}`)
        .send()
        .expect(200)
})

test('should delete a comment', async () => {
    await request(app)
        .delete('/comment/3')
        .set('Authorization', `Bearer ${tokenUserTwo}`)
        .send()
        .expect(200)
})