const express = require('express');
const bodyPaeser = require('body-parser');
const router = express.Router();
const db = require('../../connect');
const paginate = require('jw-paginate');
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

  router.get('/items', (req, res, next) => {
    // example array of 150 items to be paged

    
    modelMembers.getMemberByUserId(req.query.id,function (err, results) {
      
      const items = results.data;
    
    // get page from query params or default to first page
    const page = parseInt(req.query.page) || 1;

    // get pager object for specified page
    const pageSize = req.query.pagesize;
    const pager = paginate(items.length, page, pageSize);

    // get page of items from items array
    const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

    // return pager object and current page of items
    res.json({ pager, pageOfItems });

      // res.json({ "results": results });
    });

});

module.exports = router;