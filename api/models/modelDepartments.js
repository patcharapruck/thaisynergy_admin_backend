const db = require('../../connect');

var departments = function (task) {

};

departments.createDepartments = function (departmentData, result) {
    let fetchdata_department_type = departmentData.department_type;
    let temp_department = {
        "DEPARTMENT_ID": fetchdata_department_type.department_id,
        "DEPARTMENT_NAME": fetchdata_department_type.department_name,
        "DEPARTMENT_PREFIX_USERNAME": fetchdata_department_type.department_prefix,
        "DEPARTMENT_TYPE_ID": fetchdata_department_type.department_type,
        "PROVINCE_ID": fetchdata_department_type.department_province
    }
    let temp_department_on = {
        "DEPARTMENT_NAME": fetchdata_department_type.department_name,
        "DEPARTMENT_PREFIX_USERNAME": fetchdata_department_type.department_prefix,
        "DEPARTMENT_TYPE_ID": fetchdata_department_type.department_type,
        "PROVINCE_ID": fetchdata_department_type.department_province

    }

    db.query("INSERT INTO `DEPARTMENT` SET ? ON DUPLICATE KEY UPDATE ? ", [temp_department, temp_department_on], function (error, results, fields) {
        if (error) {
            // console.log(error);

            result(null, { "status": "404" });
        }
        else {
            //console.log("EQUIPMENT");
            result(null, { "status": "200" });
        }
    });


}

departments.getDepartmentsList = async function ( result) {
    db.query('SELECT `DEPARTMENT_ID`, `DEPARTMENT_NAME`,(SELECT DEPARTMENT_TYPE.DEPARTMENT_TYPE_NAME FROM DEPARTMENT_TYPE WHERE DEPARTMENT_TYPE.DEPARTMENT_TYPE_ID = DEPARTMENT.DEPARTMENT_TYPE_ID) as DEPARTMENT_TYPE_NAME, `DEPARTMENT_PREFIX_USERNAME`, `DEPARTMENT_TYPE_ID`,(SELECT PROVINCE.PROVINCE_NAME_TH FROM PROVINCE WHERE PROVINCE.PROVINCE_ID = DEPARTMENT.PROVINCE_ID) as PROVINCE_NAME FROM `DEPARTMENT`', function (error, results, fields) {
        //console.log(results);
  
        result(null, { "status": "200", "data":results});
      });
  }

  departments.getDepartmentsType = async function ( result) {
    db.query('SELECT CONCAT((SELECT DEPARTMENT_TYPE.DEPARTMENT_TYPE_NAME FROM DEPARTMENT_TYPE WHERE DEPARTMENT_TYPE.DEPARTMENT_TYPE_ID = DEPARTMENT.DEPARTMENT_TYPE_ID),"(",`DEPARTMENT`.`DEPARTMENT_NAME`,")") as DEPARTMENT_NAME , DEPARTMENT.DEPARTMENT_ID FROM `DEPARTMENT`', function (error, results, fields) {
        //console.log(results);
  
        result(null, { "status": "200", "data":results});
      });
  }

  departments.displayUsername = function (departmentData, result) {
    let department_id = departmentData.department_id;

    db.query("SELECT CONCAT( (SELECT DEPARTMENT.DEPARTMENT_PREFIX_USERNAME FROM DEPARTMENT WHERE DEPARTMENT.DEPARTMENT_ID = ?),(SELECT SUBSTRING((SELECT SUBSTRING(LOGIN.LOGIN_USERNAME,(SELECT LENGTH(DEPARTMENT.DEPARTMENT_PREFIX_USERNAME) FROM DEPARTMENT WHERE DEPARTMENT.DEPARTMENT_ID = USER.DEPARTMENT_ID)+1) +1001 as num FROM USER LEFT JOIN LOGIN on LOGIN.LOGIN_ID = USER.LOGIN_ID WHERE USER.DEPARTMENT_ID = ? ORDER by LOGIN.LOGIN_ID DESC LIMIT 1),2))) as USERNAME", [department_id, department_id], function (error, results, fields) {
        if (error) {
            // console.log(error);

            result(null, { "status": "404" });
        }
        else {
            //console.log("EQUIPMENT");
            result(null, { "status": "200","data":{"USERNAME":results[0].USERNAME} });
        }
    });


}

module.exports = departments;