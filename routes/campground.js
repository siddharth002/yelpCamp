var router = require('express').Router()

var Campground = require('../Models/campground')
var middlewear = require('../middleware/index')

router.get('/',(req, res) =>{
    Campground.find()
        .then(doc =>{
            res.render('./campground/index',{
                campground: doc,
                user: req.user
            })
        })
        .catch((e) => {
            return console.log(e)
        })
} )

router.post('/', middlewear.isLoggedIn,(req, res) =>{
    var name = req.body.name;
    var image = req.body.image;
    var price = req.body.price;
    var description = req.body.description;
    var author = {
        id : req.user._id,
        username : req.user.username
    }
    var newCampground = {
        name : name,
        image : image,
        description : description,
        author : author,
        price : price 
     }

    Campground.create(newCampground)
              .then((doc) =>{console.log('Successfully added')})
              .catch((e) =>{return console.log(e)})
    res.redirect('/campground');
})

router.get('/new', middlewear.isLoggedIn,(req, res) =>{
    res.render('./campground/new');
})

router.get('/:id', (req, res) =>{
    Campground.findById(req.params.id).populate('comments').exec()
              .then((doc) =>{
                  
                res.render('./campground/show',{
                    campground : doc
                });
              })
              .catch((e) =>{
                  console.log(e);
              })
})

router.get('/:id/edit', middlewear.checkCampgroundOwnership,(req, res) =>{
    Campground.findById(req.params.id)
        .then(doc =>{
            res.render('./campground/edit',{
                campground : doc,
            })
        }).catch(e =>{
            console.log(e)
        })
})

router.put('/:id', middlewear.checkCampgroundOwnership,(req, res) =>{
    Campground.findByIdAndUpdate(req.params.id,req.body.edit)
            .then(d =>{
                res.redirect(`/campground/${req.params.id}`);
            }).catch(e =>{
                console.log(e);
            })
})

router.delete('/:id' ,middlewear.checkCampgroundOwnership,(req, res) =>{
    Campground.findByIdAndRemove(req.params.id)
              .then(d =>{
                  console.log('Sucessfully deleted');
                  res.redirect('/campground')
              }).catch(e =>{
                  console.log(e);
              })
})

module.exports = router;