'user strict';
// var sql = require('./db.js');
const db = require('../../connect');

//Task object constructor
var member = function(task){

};
// Task.createTask = function (newTask, result) {    
//         sql.query("INSERT INTO tasks set ?", newTask, function (err, res) {
                
//                 if(err) {
//                     console.log("error: ", err);
//                     result(err, null);
//                 }
//                 else{
//                     console.log(res.insertId);
//                     result(null, res.insertId);
//                 }
//             });           
// };
member.getMemberById = async function (member_id, result) {
    let member_info = await get_data_member(member_id);
    let addr_permanent = await get_data_addr_permanent(member_id);
    let addr_current = await get_data_addr_current(member_id);
    let ice_contact = await get_data_ice_contact(member_id);
    let addr_addr_permanent = await get_data_addr_ice_contact(member_id);
    result(null,{ "results": { "status": "200", "data": { "member_info": member_info, "permanent_address": addr_permanent, "current_address": addr_current, "ice_contact": ice_contact, "ice_contact_address": addr_addr_permanent } } });
   
};

async function get_data_member(id) {
    return new Promise(resolve => {
      setTimeout(() => {
        db.query('SELECT `MEMBER_ID`, `MEMBER_IDENTIFICATION_NUMBER`, `MEMBER_FIRST_NAME`, `MEMBER_LAST_NAME`, `MEMBER_IMAGE`,CONVERT(MEMBER.MEMBER_BIRTH_DATE,char(255)) as MEMBER_BIRTH_DATE,CONVERT(MEMBER.MEMBER_ISSUE_DATE,char(255)) as MEMBER_ISSUE_DATE,CONVERT(MEMBER.MEMBER_EXPIRY_DATE,char(255)) as MEMBER_EXPIRY_DATE, `MEMBER_ISSUE_BY`, `MEMBER_PHONE_NUMBER`, `MEMBER_MOBILE_PHONE_NUMBER`, `MEMBER_FAX_NUMBER`, `MEMBER_EMAIL`, `MEMBER_LINE_ID`, `MEMBER_FACEBOOK_ID`, `MEMBER_WEIGHT`, `MEMBER_HEIGHT`, `MEMBER_WAISTLINE`, `MEMBER_BMI`, `MEMBER_SYSTOLIC_BLOOD_PRESSURE`, `MEMBER_DIASTOLIC_BLOOD_PRESSURE`, `MEMBER_FASTING_BLOOD_SUGAR`, `MEMBER_DISABLED_CARD`, `MEMBER_CREATED_DATE`, `MEMBER_LAST_EDITED_DATE`, `NAME_TITLE_ID`, `BIRTHPLACE_PROVINCE_ID`, `PERMANENT_ADDRESS_ID`, `CURRENT_ADDRESS_ID`, `NATIONALITY_ID`, `ETHNICITY_ID`, `RELIGION_ID`, `MEMBER_STATUS_ID`, `USER_ID` FROM `MEMBER` WHERE MEMBER.MEMBER_ID = ?', id, function (error, results, fields) {
          if (error) {
            // console.log(error);
  
          }
          // return results[0];
          resolve(results[0]);
        });
      }, 250);
    });
  }
  
  
  async function get_data_addr_permanent(id) {
  
    return new Promise(resolve => {
      setTimeout(() => {
        db.query('SELECT ADDRESS.*,(SELECT DISTRICT.DISTRICT_ID FROM DISTRICT WHERE DISTRICT.DISTRICT_ID = (SELECT SUBDISTRICT.DISTRICT_ID FROM SUBDISTRICT WHERE SUBDISTRICT.SUBDISTRICT_ID = ADDRESS.SUBDISTRICT_ID)) as DISTRICT_ID,(SELECT DISTRICT.PROVINCE_ID FROM DISTRICT WHERE DISTRICT.DISTRICT_ID = (SELECT SUBDISTRICT.DISTRICT_ID FROM SUBDISTRICT WHERE SUBDISTRICT.SUBDISTRICT_ID = ADDRESS.SUBDISTRICT_ID)) as PROVINCE_ID FROM ADDRESS WHERE ADDRESS.ADDRESS_ID = (SELECT MEMBER.PERMANENT_ADDRESS_ID FROM MEMBER WHERE MEMBER.MEMBER_ID = ?)', id, function (error, results, fields) {
          // return results[0];
          if (error) {
            // console.log(error);
  
          }
  
          else {
            resolve(results[0]);
          }
  
  
  
        });
      }, 250);
    });
  }
  
  async function get_data_addr_current(id) {
    return new Promise(resolve => {
      setTimeout(() => {
        db.query('SELECT ADDRESS.*,(SELECT DISTRICT.DISTRICT_ID FROM DISTRICT WHERE DISTRICT.DISTRICT_ID = (SELECT SUBDISTRICT.DISTRICT_ID FROM SUBDISTRICT WHERE SUBDISTRICT.SUBDISTRICT_ID = ADDRESS.SUBDISTRICT_ID)) as DISTRICT_ID,(SELECT DISTRICT.PROVINCE_ID FROM DISTRICT WHERE DISTRICT.DISTRICT_ID = (SELECT SUBDISTRICT.DISTRICT_ID FROM SUBDISTRICT WHERE SUBDISTRICT.SUBDISTRICT_ID = ADDRESS.SUBDISTRICT_ID)) as PROVINCE_ID FROM ADDRESS WHERE ADDRESS.ADDRESS_ID = (SELECT MEMBER.CURRENT_ADDRESS_ID FROM MEMBER WHERE MEMBER.MEMBER_ID = ?)', id, function (error, results, fields) {
          if (error) {
            // console.log(error);
  
          }
  
          else {
            resolve(results[0]);
          }
          // resolve(results[0]);
        });
      }, 250);
    });
  }
  
  async function get_data_ice_contact(id) {
    return new Promise(resolve => {
      setTimeout(() => {
        db.query('SELECT * FROM `ICE_CONTACT` WHERE ICE_CONTACT.MEMBER_ID = ?', id, function (error, results, fields) {
          if (error) {
            // console.log(error);
  
          }
          resolve(results[0]);
        });
      }, 250);
    });
  }
  
  async function get_data_addr_ice_contact(id) {
  
    return new Promise(resolve => {
      setTimeout(() => {
        db.query('SELECT ADDRESS.*,(SELECT DISTRICT.DISTRICT_ID FROM DISTRICT WHERE DISTRICT.DISTRICT_ID = (SELECT SUBDISTRICT.DISTRICT_ID FROM SUBDISTRICT WHERE SUBDISTRICT.SUBDISTRICT_ID = ADDRESS.SUBDISTRICT_ID)) as DISTRICT_ID,(SELECT DISTRICT.PROVINCE_ID FROM DISTRICT WHERE DISTRICT.DISTRICT_ID = (SELECT SUBDISTRICT.DISTRICT_ID FROM SUBDISTRICT WHERE SUBDISTRICT.SUBDISTRICT_ID = ADDRESS.SUBDISTRICT_ID)) as PROVINCE_ID FROM ADDRESS WHERE ADDRESS.ADDRESS_ID = (SELECT ICE_CONTACT.ADDRESS_ID FROM `ICE_CONTACT` WHERE ICE_CONTACT.MEMBER_ID = ?)', id, function (error, results, fields) {
          if (error) {
            // console.log(error);
  
          }
  
          else {
            resolve(results[0]);
          }
          // resolve(results[0]);
        });
      }, 250);
    });
  }

member.getAllMember = function (result) {
    db.query('SELECT MEMBER.MEMBER_ID,CONVERT(MEMBER.MEMBER_IDENTIFICATION_NUMBER,char(255)) AS ID_CARD,CONCAT((SELECT NAME_TITLE.NAME_TITLE_NAME FROM NAME_TITLE WHERE NAME_TITLE.NAME_TITLE_ID = MEMBER.NAME_TITLE_ID),MEMBER.MEMBER_FIRST_NAME," ",MEMBER.MEMBER_LAST_NAME) AS NAME_MEMBER,  DATE_FORMAT(MEMBER.MEMBER_BIRTH_DATE, "%d/%m/%Y") AS MEMBER_BIRTH_DATE FROM MEMBER', function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                  console.log('tasks : ', res);  

                 result(null, res);
                }
            });   
};
// Task.updateById = function(id, task, result){
//   sql.query("UPDATE tasks SET task = ? WHERE id = ?", [task.task, id], function (err, res) {
//           if(err) {
//               console.log("error: ", err);
//                 result(null, err);
//              }
//            else{   
//              result(null, res);
//                 }
//             }); 
// };
// Task.remove = function(id, result){
//      sql.query("DELETE FROM tasks WHERE id = ?", [id], function (err, res) {

//                 if(err) {
//                     console.log("error: ", err);
//                     result(null, err);
//                 }
//                 else{
               
//                  result(null, res);
//                 }
//             }); 
// };

module.exports= member;