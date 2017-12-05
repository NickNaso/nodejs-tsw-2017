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
        res.render('login')
    },

    admin (req, res) {
        res.render('admin', 
            {
                isAuthenticated: req.isAuthenticated(),
                user: req.user
            }
        )
    }
    
}