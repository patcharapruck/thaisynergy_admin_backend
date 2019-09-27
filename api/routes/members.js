const express = require('express');
const bodyPaeser = require('body-parser');
const router = express.Router();
const db = require('../../connect');

router.use(bodyPaeser.json());
router.use(bodyPaeser.urlencoded({ extended: true }));



var modelMembers = require('../models/modelMembers');

router.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Expose-Headers', 'X-Api-Version, X-Request-Id, X-Response-Time');
  res.setHeader('Access-Control-Max-Age', '1000');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

router.route('/').get(function (req, res) {
  console.log("GET");
  res.json({ "results": { "status": "GET" } });

})
  .post(async function (req, res) {
    modelMembers.createMember(req.body, function (err, results) {
      if (err)
        res.send(err);
      res.json({ "results": results });
    });

  })
  .put(function (req, res) {
    modelMembers.updateMember(req.body, function (err, results) {
      if (err)
        res.send(err);
      res.json({ "results": results });
    });

  })
  .delete(function (req, res) {
    modelMembers.removeMember(req.body.member_id, function (err, results) {
      if (err)
        res.send(err);
      res.json({ "results": results });
    });
  })

router.route('/list')
  .get(function (req, res) {
    modelMembers.getAllMember(function (err, results) {
      if (err)
        res.send(err);
      res.json({ "results": results });
    });

  })
  .post(async function (req, res) {
    modelMembers.getMemberById(req.body.member_id, function (err, results) {
      if (err)
        res.send(err);
      res.json({ "results": results });
    });
  })

router.route('/info')
  .post(async function (req, res) {
    modelMembers.getMemberInfoById(req.body.member_id, function (err, results) {
      if (err)
        res.send(err);
      res.json({ "results": results });
    });
  })

router.route('/lists/user_id')
  .post(async function (req, res) {
    // console.log(req.body);
    
    modelMembers.getMemberByUserId(req.body.user_id, function (err, results) {
      if (err)
        res.send(err);
      res.json({ "results": results });
    });
  })


router.route('/rightInformation')
  .post(function (req, res) {
    modelMembers.createRightInfomation(req.body, function (err, results) {
      if (err)
        res.send(err);
      res.json({ "results": results });
    });

  })


router.route('/getrightInformation')
  .post(function (req, res) {
    modelMembers.getRightInfomation(req.body.member_id, function (err, results) {
      if (err)
        res.send(err);
      res.json({ "results": results });
    });

  })

  router.route('/checkidcard')
  .post(function (req, res) {
    modelMembers.checkIdCard(req.body.idcard, function (err, results) {
      if (err)
        res.send(err);
      res.json({ "results": results });
    });

  })

module.exports = router;