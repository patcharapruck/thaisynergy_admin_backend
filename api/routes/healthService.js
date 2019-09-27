const express = require('express');
const bodyPaeser = require('body-parser');
const router = express.Router();

router.use(bodyPaeser.json());
router.use(bodyPaeser.urlencoded({ extended: true }));


var modelHealthService = require('../models/modelHealthService');

router.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Expose-Headers', 'X-Api-Version, X-Request-Id, X-Response-Time');
    res.setHeader('Access-Control-Max-Age', '1000');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


router.route('/healthscreening')
    .post(async function (req, res) {
        modelHealthService.createHealthScreening(req.body, function (err, results) {
            if (err)
                res.send(err);
            res.json({ "results": results });
        });
    })

router.route('/adlevaluation')
    .post(async function (req, res) {
        modelHealthService.createAdlEvaluation(req.body, function (err, results) {
            if (err)
                res.send(err);
            res.json({ "results": results });
        });
    })
router.route('/healthscreeningchoice')
    .post(async function (req, res) {
        modelHealthService.getHealthScreeningChoice(req.body.id, function (err, results) {
            if (err)
                res.send(err);
            res.json({ "results": results });
        });
    })
router.route('/healthscreening/list')
    .post(async function (req, res) {
        modelHealthService.getHealthScreeningList(req.body.member_id, function (err, results) {
            if (err)
                res.send(err);
            res.json({ "results": results });
        });
    })
router.route('/healthscreening/id')
    .post(async function (req, res) {
        modelHealthService.getHealthScreeningById(req.body.member_id, function (err, results) {
            if (err)
                res.send(err);
            res.json({ "results": results });
        });
    })

    router.route('/healthscreeningHasChoiceById')
    .post(async function (req, res) {
        modelHealthService.healthscreeningHasChoiceById(req.body.id, function (err, results) {
            if (err)
                res.send(err);
            res.json({ "results": results });
        });
    })


    router.route('/medicalcheckup')
    .post(async function (req, res) {
        modelHealthService.createMedicalCheckup(req.body, function (err, results) {
            if (err)
                res.send(err);
            res.json({ "results": results });
        });
    })

    router.route('/medicalcheckup/list')
    .post(async function (req, res) {
        modelHealthService.getMedicalCheckUpByMemberId(req.body.member_id, function (err, results) {
            if (err)
                res.send(err);
            res.json({ "results": results });
        });
    })
    router.route('/medicalcheckup/id')
    .post(async function (req, res) {
        modelHealthService.getMedicalCheckUpById(req.body.medical_checkup_id, function (err, results) {
            if (err)
                res.send(err);
            res.json({ "results": results });
        });
    })


module.exports = router;