'use strict'

module.exports = {

    index (req, res) {
        res.render('index', 
            {
                isAuthenticated: req.isAuthenticated(),
                user: req.user
            }
        )
    },

    login (req, res) {
        res.render('login', {error: req.flash('error')[0]})
    },

    admin (req, res) {
        console.log(req.isAuthenticated())
        console.log(req.user)
        res.render('admin', 
            {
                isAuthenticated: req.isAuthenticated(),
                user: req.user
            }
        )
    }
    
}