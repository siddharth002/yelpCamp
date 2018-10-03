var Campground = require('../Models/campground'),
    Comments = require('../Models/comment');
    
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }else{
        req.flash('error', 'You need to be logged in to do that!');
        res.redirect('/login')
    }
}

function checkCampgroundOwnership(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id)
            .then( foundCampground =>{
                if(foundCampground.author.id.equals(req.user._id)){
                   next();
                }else{
                    req.flash('error','You are not authorised to do that')
                    res.redirect('back')
                }
            }).catch(e =>{
                req.flash('error','Campground not found ')
                res.redirect('back')
            })
    }else{
        res.redirect('back');
    }
}


function checkCommentOwnership(req, res, next){
    if(req.isAuthenticated()){
      Comments.findById(req.params.comment_id)
            .then(comment=>{  
                if(comment.author.id.equals(req.user.id)){
                    next();
                }else{
                    req.flash('error','You are not authorised to do that')
                    res.redirect('back')
                }
            })  
    }else{
        req.flash('error','Opps something wrong has happened')
        res.redirect('back')
    }
}

module.exports = {
    isLoggedIn,
    checkCampgroundOwnership,
    checkCommentOwnership
}