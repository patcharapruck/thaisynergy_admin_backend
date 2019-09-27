const db = require('../../connect');

var generalData = function (task) {

};
generalData.getPrefix = async function ( result) {
  db.query('SELECT `NAME_TITLE`.`NAME_TITLE_ID` as id ,`NAME_TITLE`.`NAME_TITLE_NAME` as name FROM `NAME_TITLE` ORDER BY `NAME_TITLE`.`NAME_TITLE_ID` ASC', function (error, results, fields) {
      result(null, { "status": "200", "data":results});
    });
}

generalData.getNationality = async function ( result) {
  db.query('SELECT NATIONALITY.NATIONALITY_ID as id , CONCAT(NATIONALITY.NATIONALITY_NAME_TH) as name FROM `NATIONALITY`', function (error, results, fields) {
      result(null, { "status": "200", "data":results});
    });
  
}

generalData.getEthnicity = async function ( result) {
  db.query('SELECT ETHNICITY.ETHNICITY_ID as id , CONCAT(ETHNICITY.ETHNICITY_NAME_TH) as name FROM `ETHNICITY`', function (error, results, fields) {
      result(null, { "status": "200", "data":results});
    });
  
}

generalData.getReligiion = async function ( result) {
  db.query('SELECT RELIGION.RELIGION_ID as id , RELIGION.RELIGION_NAME as name FROM `RELIGION`', function (error, results, fields) {
      result(null, { "status": "200", "data":results});
    });
  
}


generalData.getProvince = async function ( result) {
    db.query('SELECT * FROM `PROVINCE`', function (error, results, fields) {
        //console.log(results);

        result(null, { "status": "200", "data":results});
      });
    
}

generalData.getDistrictByProvinceId = async function (id, result) {
    db.query('SELECT * FROM `DISTRICT` WHERE `DISTRICT`.`PROVINCE_ID` = ?',id, function (error, results, fields) {
        //console.log(results);

        result(null, { "status": "200", "data":results});
      });
    
}
generalData.getSubDistrictByDistrictId = async function (id, result) {
    db.query('SELECT * FROM `SUBDISTRICT` WHERE `SUBDISTRICT`.`DISTRICT_ID` = ?',id, function (error, results, fields) {
        //console.log(results);

        result(null, { "status": "200", "data":results});
      });
    
}
generalData.getProvinceById = async function ( result) {
    
}

generalData.getMemberStatus = async function ( result) {
  db.query('SELECT * FROM `MEMBER_STATUS`', function (error, results, fields) {
      //console.log(results);

      result(null, { "status": "200", "data":results});
    });
  
}

module.exports = generalData;