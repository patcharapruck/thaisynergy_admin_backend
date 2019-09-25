const express = require('express');
const bodyPaeser = require('body-parser');
const router = express.Router();
const db = require('../../connect');

router.use(bodyPaeser.json());
router.use(bodyPaeser.urlencoded());


var modelUsers = require('../models/modelUsers');

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

  module.exports = router;