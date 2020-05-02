
exports.createPostValoidator = (req,rep,next) =>{
    //title
    req.check('title','Writer a title').notEmpty();
    req.check('title','Title must be betwenn 4 to 150 carracters').isLength({
        min :4,
        max :150
    });

    //body
    req.check('body','Writer a body').notEmpty();
    req.check('body','body must be betwenn 4 to 2000 carracters').isLength({
        min :4,
        max :2000
    });

    //check errors
    const errors = req.validationErrors();
    if(errors){
        const firstError = errors.map((error)=> error.msg)[0]
        return res.satuts(400).json({error : firstError})
    }

    //preoced to next middleware
    next()
}