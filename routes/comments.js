var router = require('express').Router({mergeParams : true})
var Campground = require('../Models/campground'),
    Comments = require('../Models/comment')

var middlewear = require('../middleware/index');
// ================================
//Comment routes
router.get('/new',middlewear.isLoggedIn,(req, res) =>{
    Campground.findById(req.params.id)
        .then(d =>{
            res.render('./comment/new',{
                campground : d
            })
        }).catch(e=>{
            console.log(e)
        }) 
})

router.post('/',middlewear.isLoggedIn,(req, res) =>{
    Campground.findById(req.params.id)
        .then((campground) =>{
          Comments.create(req.body.comment)
                .then(comment =>{
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username
                    comment.save();
                    campground.comments.push(comment)
                    campground.save();
                    res.redirect('/campground/'+campground._id);
                }).catch(e =>{
                    console.log(e)
                })
        }).catch(e =>{
            console.log(e)
        })
})

router.get('/:comment_id/edit',middlewear.checkCommentOwnership,(req, res) =>{
    Comments.findById(req.params.comment_id)
            .then(comment =>{
                res.render('./comment/edit',{
                    campground_id : req.params.id,
                    comment : comment
                })
            }).catch(e =>{
                res.redirect('back')
                console.log(e);
            })
})

router.put('/:comment_id', (req, res) =>{
    Comments.findByIdAndUpdate(req.params.comment_id,{
        text : req.body.text
    })
    .then(d=>{
        res.redirect('/campground/'+req.params.id);
    }).catch(e =>{
        console.log(e)
    })
})

router.delete('/:comment_id', middlewear.checkCommentOwnership,(req, res) =>{
    Comments.findByIdAndRemove(req.params.comment_id)
            .then(d=>{
                res.redirect('back')
            }).catch(e =>{
                console.log(e);
            }) 
})

module.exports = router;