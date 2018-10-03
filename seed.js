var mongoose = require('mongoose');
var Campground = require('./Models/campground')
var Comments = require('./Models/comment');

var data = [
    {
        name : 'cloud rest',
        image : 'https://images.unsplash.com/photo-1537565266759-34bbc16be345?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=cf61f7387cf2cb8758d724978fcbd198&auto=format&fit=crop&w=500&q=60',
        description : 'lorem lorem lorem lorem lorem lire'
    },
    {
        name : 'clipboard',
        image : 'https://images.unsplash.com/photo-1537567921203-a842146983a1?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9dcf5db70b83fd4eadaffc763788f076&auto=format&fit=crop&w=500&q=60',
        description : 'lorem lorem lorem lorem lorem lire'
    },
    {
        name : 'Jelly fish',
        image : 'https://images.unsplash.com/photo-1537548099678-82cd8af3ff4b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4a6ae1b3dfed1607acfbc2e1220ebbe0&auto=format&fit=crop&w=500&q=60',
        description : 'lorem lorem lorem lorem lorem lire'
    }
]

var comments ={
    text :'lorem lorem lorem lorem lorem',
    author :'Siddharth'
}

function removeCampDB(){
    Campground.remove({})
        .then(d=>{ 
            console.log('REMOVED CAMPER!!!!!');
        })
        .catch(e =>{
            console.log(e)
    })
}

function removeComDB(){
    Comments.remove({})
    .then(d =>{
        console.log('REMOVED COMMENTS!!!')
    })
    .catch(e =>{
        console.log(e);
    })
}

function addDB(){
    data.forEach((seed) =>{
        Campground.create(seed)
                .then(camp=>{
                    console.log('Successfully added the camper')
                    Comments.create(comments)
                            .then( comment=>{
                                camp.comments.push(comment);
                                camp.save();
                                console.log('Successfully added the comments')
                            }).catch(e =>{
                                console.log(e);
                            })
                })
                .catch(e =>{
                    console.log(e);
                })
    })
}


module.exports = {
     removeCampDB,
     removeComDB,
     addDB
};