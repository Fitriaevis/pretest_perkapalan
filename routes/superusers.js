var express = require('express');
const Model_Users = require('../model/Model_Users');
var router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res, next) {
    try {
        let id = req.session.userId;
        let Data = await Model_Users.getId(id);
        if (Data.length > 0) {
            if (Data[0].level_users != 1) {
                res.redirect('/logout')
            } else {
                res.render('users/super', {
                title: 'Users Home',
                email: Data[0].email
                });
            }
            res.render('users/index', {
                title: 'Users Home',
                email: Data[0].email
            });
        } 
        else {
        res.status(401).json({ error: 'users tidak ada' });
        }
    } catch (error) {
        res.status(501).json('Butuh Akses Login');
    }
});

module.exports = router;
