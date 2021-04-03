const jwt = require('jsonwebtoken')
const sequelize = require('sequelize')

const User = require('../../models/users.model')
const Post = require('../../models/posts.model')
const Comment = require('../../models/comments.model')

const userOne = {
    email: 'nicolas@test.com',
    firstName: 'Nicolas', 
    lastName: 'Leveque',
    password: 'mySecurePassword'
}

const userTwo = {
    email: 'vanessa@test.com',
    firstName: 'Vanessa', 
    lastName: 'Jullian', 
    password: 'anotherSecurePassword'
}

const postOne = {
    type_post: text,
    titre: 'Lorem Ipsum',
    contenu: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tincidunt tortor augue, et elementum orci elementum eget. Nam tellus diam, blandit tempus nisi sodales, tristique mollis erat. Ut varius mi ut arcu malesuada, vitae fringilla nunc luctus. Curabitur non nisl malesuada, pellentesque est at, pulvinar mauris. Ut mollis mauris sed faucibus porta. Aliquam id metus arcu. Fusce non erat orci.Duis gravida scelerisque risus eget porttitor. Quisque viverra tempor dui porta ultricies. Proin at maximus nibh. In blandit in odio ac malesuada. Ut ut interdum libero. Quisque ac viverra elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget est hendrerit odio dictum mattis a non nunc. Donec gravida sit amet sem sit amet consequat. Aliquam mi nunc, porta at mattis vel, egestas nec elit. Praesent fermentum blandit odio non interdum. Quisque et arcu sed sem finibus consequat fringilla porta mi.',

}

const postTwo = {
    type_post: link,
    titre: 'A link post',
    contenu: 'www.anewpost.com'
}

const commentOne = {
    contenu: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam condimentum vulputate nunc et dignissim. Donec tristique sem ut finibus venenatis. Praesent molestie purus lorem, eget lobortis felis consequat a. Nunc venenatis malesuada tortor at pellentesque. Duis sit amet eros in lectus aliquam rhoncus a sodales mauris. Donec enim lacus, scelerisque at orci a, consequat egestas justo. Cras felis diam, sagittis vitae risus quis, fermentum efficitur nisi. In hac habitasse platea dictumst. Curabitur enim erat, ultrices et tellus id, euismod semper purus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur erat nisl, finibus pretium condimentum quis, cursus eget felis. Nam laoreet porttitor sodales. Sed ullamcorper lectus sit amet semper mollis. Donec et ligula vitae diam rutrum egestas ut et elit. Sed et augue tellus. Pellentesque lacinia at mi quis imperdiet.'
}

const commentTwo = {
    contenu: 'Lorem ipsum dolor sit amet, consectet'
}

