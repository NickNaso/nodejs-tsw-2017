'use strict'

module.exports = {

    index (req, res) {
        res.render('index', 
            {
                name: 'Node.js Blog'
            }
        )
    }

    /*login (req, res) {
        res.render('login', {error: req.flash('error')})
    }*/
    

    /*admin (req, res) {
        res.render('admin', 
            {
                isAuthenticated: req.isAuthenticated(),
                user: req.user
            }
        )
    }*/
    
}