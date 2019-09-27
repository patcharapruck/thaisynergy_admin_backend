const express = require('express');
const bodyPaeser = require('body-parser');
const router = express.Router();

router.use(bodyPaeser.json());
router.use(bodyPaeser.urlencoded({ extended: true }));


var modelDisability = require('../models/modelDisability');

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
    .post(async function (req, res) {
        modelDisability.createDisability(req.body.residence,function (err, results) {
            if (err)
                res.send(err);
            res.json({ "results": results });
        });
    })

    router.route('/id')
    .post(async function (req, res) {
        modelDisability.getDisabilityByMemberId(req.body.member_id,function (err, results) {
            if (err)
                res.send(err);
            res.json({ "results": results });
        });
    })


module.exports = router;