var mongoose = require('mongoose');
var Post = require('./Models/post');
var User = require('./Models/user');
mongoose.connect('mongodb://localhost:27017/blog_demo2');


// User.create({
//     email : 'sirex@gmail.com',
//     name : 'Bob barber'
// })

// Post.create({
//     title:"Siddharth raymaghi",
//     content : 'siddharth raymaghi'
//     })
//     .then(post=>{
//         User.findOne({name : 'Bob barber'})
//             .then(user =>{
//                 user.post.push(post)
//                 user.save()
//                     .then( d =>console.log(d))
//                     .catch( e => console.log(e))
//             })
//     })

User.findOne({name :'Bob barber'}).populate('post').exec(function(e,user){
    if(e){
        console.log(e)
    }else{
        console.log(user)
    }
})