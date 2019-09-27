const express = require('express');
const bodyPaeser = require('body-parser');
const router = express.Router();

router.use(bodyPaeser.json());
router.use(bodyPaeser.urlencoded({ extended: true }));


var modelDepartments = require('../models/modelDepartments');

router.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Expose-Headers', 'X-Api-Version, X-Request-Id, X-Response-Time');
  res.setHeader('Access-Control-Max-Age', '1000');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

router.route('/')
.get(function (req, res) { 
  modelDepartments.getDepartmentsList(function (err, results) {
    res.json({ "results": results });
  });

})
  .post(function (req, res) { 
    modelDepartments.createDepartments(req.body, function (err, results) {
      res.json({ "results": results });
    });

  })

  router.route('/type')
.get(function (req, res) { 
  modelDepartments.getDepartmentsType(function (err, results) {
    res.json({ "results": results });
  });

})

router.route('/displayUsername')
.post(function (req, res) { 
  modelDepartments.displayUsername(req.body, function (err, results) {
    res.json({ "results": results });
  });

})

module.exports = router;