var express = require('express');
const Model_Users = require('../model/Model_Users');
var router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
    let id = req.session.userId;
    let Data = await Model_Users.getId(id);
    if (Data.length > 0) {
      res.render('users/index', {
        title: 'Users Home',
        email: Data[0].email
      });
    } else {
      
    }
  } catch (error) {
    res.status(501).json('Butuh Akses Login');
  }
});

module.exports = router;
