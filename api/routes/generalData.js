const express = require('express');
const bodyPaeser = require('body-parser');
const router = express.Router();
const db = require('../../connect');

router.use(bodyPaeser.json());
router.use(bodyPaeser.urlencoded({ extended: true }));


var modelGeneralData = require('../models/modelGeneralData');

router.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Expose-Headers', 'X-Api-Version, X-Request-Id, X-Response-Time');
    res.setHeader('Access-Control-Max-Age', '1000');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

router.route('/prefix')
    .get(function (req, res) {
        modelGeneralData.getPrefix(function (err, results) {
            if (err)
                res.send(err);
            res.json({ "results": results });
        });

    })

router.route('/nationality')
    .get(function (req, res) {
        modelGeneralData.getNationality(function (err, results) {
            if (err)
                res.send(err);
            res.json({ "results": results });
        });

    })

router.route('/ethnicity')
    .get(function (req, res) {
        modelGeneralData.getEthnicity(function (err, results) {
            if (err)
                res.send(err);
            res.json({ "results": results });
        });

    })

router.route('/religiion')
    .get(function (req, res) {
        modelGeneralData.getReligiion(function (err, results) {
            if (err)
                res.send(err);
            res.json({ "results": results });
        });

    })

router.route('/province')
    .get(function (req, res) {
        modelGeneralData.getProvince(function (err, results) {
            if (err)
                res.send(err);
            res.json({ "results": results });
        });

    })

router.route('/district')
    .post(function (req, res) {
        modelGeneralData.getDistrictByProvinceId(req.body.province_id, function (err, results) {
            if (err)
                res.send(err);
            res.json({ "results": results });
        });

    })

router.route('/subdistrict')
    .post(function (req, res) {
        modelGeneralData.getSubDistrictByDistrictId(req.body.district_id, function (err, results) {
            if (err)
                res.send(err);
            res.json({ "results": results });
        });

    })
router.route('/memberstatus')
    .post(function (req, res) {
        modelGeneralData.getMemberStatus(req.body.district_id, function (err, results) {
            if (err)
                res.send(err);
            res.json({ "results": results });
        });
    })



module.exports = router;