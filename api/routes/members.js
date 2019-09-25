const express = require('express');
const bodyPaeser = require('body-parser');
const router = express.Router();
const db = require('../../connect');

router.use(bodyPaeser.json());
router.use(bodyPaeser.urlencoded());

router.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'content-type, x-access-token');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});


var modelMembers = require('../models/modelMembers');

router.route('/').get(function (req, res) {
    console.log("GET");
    res.json({ "results": { "status": "GET" } });
    
  })
  .post(async function (req, res) {
    
    console.log("post");
    res.json({ "results": { "status": "post" } });
    
  })
  .put(function (req, res) {
    console.log("put");
    res.json({ "results": { "status": "put" } });
    
  })
  .delete(function (req, res) {
    console.log("delete");
    res.json({ "results": { "status": "delete" } });
    
  })

  router.route('/get_member_all')
  .get(function (req, res) {
    modelMembers.getAllMember(function(err, results) {
      if (err)
        res.send(err);
      res.json({ "results": { "status": 200, "data": results } });      
    });
    
  })
  .post( async function (req, res) {
    modelMembers.getMemberById(req.body.member_id,function(err, results) {
      if (err)
        res.send(err);
      res.json({ "results": { "status": 200, "data": results } });      
    });
  })
  


// router.get('/get_member_all', (req, res) => {
//     // console.log("asdasdasdasd");
//     modelMembers.getAllMember(function(err, results) {
//       if (err)
//         res.send(err);
       
//       res.json({ "results": { "status": 200, "data": results } });

      
//     });
  
//     // db.query('SELECT MEMBER.MEMBER_ID,CONVERT(MEMBER.MEMBER_IDENTIFICATION_NUMBER,char(255)) AS ID_CARD,CONCAT((SELECT NAME_TITLE.NAME_TITLE_NAME FROM NAME_TITLE WHERE NAME_TITLE.NAME_TITLE_ID = MEMBER.NAME_TITLE_ID),MEMBER.MEMBER_FIRST_NAME," ",MEMBER.MEMBER_LAST_NAME) AS NAME_MEMBER,  DATE_FORMAT(MEMBER.MEMBER_BIRTH_DATE, "%d/%m/%Y") AS MEMBER_BIRTH_DATE FROM MEMBER', function (error, results, fields) {
//     //   // console.log(results);
  
//     //   res.json({ "results": { "status": 200, "data": results } });
//     // });
//   });


router.get('/get_member_status', (req, res) => {
    db.query('SELECT * FROM `MEMBER_STATUS`', function (error, results, fields) {
      //console.log(results);
  
      res.json({ results });
    });
});

  module.exports = router;