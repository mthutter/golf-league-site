module.exports = (req,res) => {
res.render('register')
}

 /*   var username = ""
    var first = ""
    var last = ""
    var email = ""
    var phone = ""
    var password = "" 

    const data = req.flash('data')[0]

    if(typeof data != "undefined" ){
        username = data.username
        first = data.first
        last = data.last
        email = data.email
        phone = data.phone
        password = data.password
    }

    res.render('register', {
        errors: req.flash('validationErrors'), 
        username: username,
        first: first,
        last: last,
        email: email,
        phone: phone,
        password: password
    })
}  */