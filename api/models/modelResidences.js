const db = require('../../connect');

var residences = function (task) {

};

residences.getResidenceOptions = function (result) {
    db.query('SELECT * FROM `RESIDENCE`', function (err, res) {

        if (err) {
            result(null, { "status": "404", "data": err });
            result(null, err);
        }
        else {
            result(null, { "status": "200", "data": res });
        }
    });
};

residences.createResidence = function (fetch_data_residence,result) {
    
    let temp_residence = {
        "MEMBER_HAS_RESIDENCE_DETAIL": fetch_data_residence.member_has_residence_detail,
        "MEMBER_ID": fetch_data_residence.residence_member_id,
        "RESIDENCE_ID": fetch_data_residence.residence_id
      };
      let temp_residence_on_duplicate = {
        "MEMBER_HAS_RESIDENCE_DETAIL": fetch_data_residence.member_has_residence_detail,
        "RESIDENCE_ID": fetch_data_residence.residence_id
      };

    db.query('INSERT INTO MEMBER_HAS_RESIDENCE SET ? ON DUPLICATE KEY UPDATE ?', [temp_residence, temp_residence_on_duplicate], function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, { "status": "404", "data": err });
        }
        else {
            result(null, { "status": "200", "data": res });
        }
    });
};

residences.getHasResidence = function (member_id,result) {
    
    db.query('SELECT MEMBER_HAS_RESIDENCE.*,RESIDENCE.RESIDENCE_INPUT_TYPE FROM MEMBER_HAS_RESIDENCE,RESIDENCE WHERE MEMBER_HAS_RESIDENCE.RESIDENCE_ID = RESIDENCE.RESIDENCE_ID AND MEMBER_HAS_RESIDENCE.MEMBER_ID = ?', member_id, function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, { "status": "404", "data": err });
        }
        else {
            result(null, { "status": "200", "data": res });
        }
    });
};

module.exports = residences;