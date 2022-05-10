const e = require('express');
var express = require('express');
const req = require('express/lib/request');
var router = express.Router();

const credential = {
    email: 'admin@gmail.com',
    password: 'admin123'
}

// login user route
router.post('/login', (req, res) => {
    if (req.body.email == credential.email && req.body.password == credential.password){
        req.session.user = req.body.email;
        res.redirect('/route/dashboard');
    } else {
        res.end('Invalid Username');
    }
});

// route for dashboard
router.get('/dashboard', (req, res)=> {
    if(req.session.user){
        res.render('dashboard', {user:req.session.user})
    } else{
        res.send("Unauthorized User")
    }
})

// route for logout
router.get('/logout', (req, res) => {
    req.session.destroy(function(err){
        if (err){
            console.log(err)
            res.send('Error')
        } else {
            res.render('base', {title: "Login System", logout: 'Logout Succsessfully'})
        }
    })  
})

module.exports = router;