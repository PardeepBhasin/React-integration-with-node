var express = require('express');
var router = express.Router();
var user = require('../modals/user');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var app = express();
var config = require('../config');

/* POST user. */
router.post('/saveUser', function(req, res) {
    // create a sample user
  var nick = new user({ 
    name: req.body.name, 
    password: 'password',
    admin: true 
  });

  // save the sample user
  nick.save(function(err) {
    if (err) throw err;

    console.log('User saved successfully');
    res.json({ success: true });
  });
});

router.get('/users',function(req, res) {
  user.find(function(err, users) {
    res.json(users);
  });
});

/* User Authenticated Route*/
router.post('/authenticate', function(req, res) {
    user.findOne({
        name : req.body.name
    }, function (err , user) {
        if (err) throw err;
        if (!user) {
          res.json({success:false, message : "Authentication failed. User not found"});
        } else {
          if (req.body.password !== user.password) {
             res.json({success:false, message : "Authentication failed. Wrong password"});
          } else {
              var token = jwt.sign(user, config.secret, {
                'expiresIn' : 60*60*24
              })

              // return the information including token as JSON
              res.json({
                success: true,
                message: 'Enjoy your token!',
                token: token
              });
          }
        }
    })
})

// route middleware to verify a token
router.use(function(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, config.secret, function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });

  }
});

module.exports = router;
