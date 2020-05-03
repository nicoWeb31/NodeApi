
exports.createPostValoidator = (req,res,next) =>{
    //title
    req.check("title","Writer a title").notEmpty();
    req.check("title","Title must be betwenn 4 to 150 carracters").isLength({
        min :4,
        max :150
    });

    //body
    req.check("body","Writea a body").notEmpty();
    req.check("body","body must be betwenn 4 to 2000 carracters").isLength({
        min :4,
        max :2000
    });

    //check errors
    const errors = req.validationErrors();
    if(errors){
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json ({error : firstError})
    }

    //preoced to next middleware
    next()
}

// =============================================================================
// user validator
// =============================================================================

exports.UserSinUpValidator = (req,res,next) =>{

    //name is not nul an betwen 4 to 10 

    req.check("name","Name is required").notEmpty();


    //check for email
    req.check("email", "email must be between 3 to 34 caracteres")
    .matches(/.+\@.+\..+/)
    .withMessage("email must contain an @")
    .isLength({
        min:5,
        max:60
    })

    //check for pass
    req.check("password","password is required").notEmpty();
    req.check('password')
    .isLength({min : 6})
    .withMessage("password must contain 6 caratcters minimum")
    .matches(/\d/)
    .withMessage("password must contain a number")

    //check for error

  //check errors
    const errors = req.validationErrors()
    if(errors){
        const firstError = errors.map(error=> error.msg)[0]
        return res.status(400).json({error : firstError})
    }

    //preoced to next middleware
    next()





}