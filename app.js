const express = require('express'); 
const bodyPaeser = require('body-parser'); 
const mysql = require('mysql'); 
const app = express(); 
 
app.use(bodyPaeser.json()); 
app.use(bodyPaeser.urlencoded()); 
 
 
app.use(function(req, res, next){ 
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); 
  res.setHeader('Access-Control-Allow-Headers', 'content-type, x-access-token'); 
  res.setHeader('Access-Control-Allow-Credentials', true); 
  next(); 
}); 
 
 
app.get('/', (req,res)=>{ 
  res.end("welcome to root path"); 
}); 
 
app.get('/home', (req,res)=>{ 
  res.end("welcome to home path"); 
}); 
 
app.post('/api', (req,res)=>{ 
  const feedback = req.body.feedback; 
  const username = req.body.username; 
  //res.end("Received  Feedback : " + feedback + ", Username : " +username ); 
  res.json({ result:"success" ,Username : username, Feedback : feedback} ); 
}); 
 
app.listen(3000, ()=>{ 
  console.log("server is running..."); 
}); 
 
const db = mysql.createConnection({ 
  host : 'localhost', 
  port : 8889, 
  user : 'root', 
  password : 'root', 
  database : 'THAISYNERGY' 
}); 
 
db.connect((err) => { 
  if(err){ 
    console.log(err); 
  } 
  console.log('Mysql Connected...'); 
}); 
  
 
 
app.get('/get_province', (req,res)=>{ 
   
 
  var data  = [0]; 
  db.query(' CALL `GET_PRIVINCE`('+data+')', function (error, results, fields) { 
    console.log(results[0]); 
    // alert(results); 
    // res.json({results}); 
  }); 
}); 
return new Promise(function(resolve, reject) { 
app.post('/insert_member', (req,res)=>{ 
 
  console.log(req.body);  
  const permanentAddressMember = req.body.permanentAddressMember; 
    const permanent_address_house_number = permanentAddressMember.houseNumber; 
    const permanent_address_village_number = permanentAddressMember.villageNumber; 
    const permanent_address_lane = permanentAddressMember.alley; 
    const permanent_address_street = permanentAddressMember.road; 
    const permanent_address_locality = permanentAddressMember.houseNumber; 
    const permanent_address_postal_code = permanentAddressMember.postCode; 
    const permanent_subdistrict_id = permanentAddressMember.subDistrict; 
    const permanent_address_status_id = 1; 
 
    ///////////////////////// 
 
    let temp_per_addr = { 
      "ADDRESS_HOUSE_NUMBER":permanent_address_house_number,  
      "ADDRESS_VILLAGE_NUMBER":permanent_address_village_number,  
      "ADDRESS_LANE":permanent_address_lane,  
      "ADDRESS_STREET":permanent_address_street,  
      "ADDRESS_LOCALITY":permanent_address_locality,  
      "ADDRESS_POSTAL_CODE":permanent_address_postal_code,  
      "SUBDISTRICT_ID":permanent_subdistrict_id,  
      "ADDRESS_STATUS_ID":permanent_address_status_id};  
                                                                  
      let per_addr = 0; 
      db.query("INSERT INTO ADDRESS SET ?",temp_per_addr, function (error, results, fields) { 
              // var temp = results[0]; 
              // temp_per_addr=temp[0].ID; 
              // console.log(results); 
              // if(error) console.log(error); 
              // else  
              // res.end(results); 
              this.per_addr="123123"; 
          }); 
           
      console.log(per_addr); 
       
    //////////////////////// 
 
 
 
    const currentAddressMember = req.body.currentAddressMember; 
    const current_address_house_number = currentAddressMember.houseNumber; 
    const current_address_village_number = currentAddressMember.villageNumber; 
    const current_address_lane = currentAddressMember.alley; 
    const current_address_street = currentAddressMember.road; 
    const current_address_locality = currentAddressMember.houseNumber; 
    const current_address_postal_code = currentAddressMember.postCode; 
    const current_address_latitude = 1; 
    const current_address_longitude = 1; 
    const current_subdistrict_id = currentAddressMember.subDistrict; 
    const current_address_status_id = 1; 
 
    let temp_cur_addr = { 
      "ADDRESS_HOUSE_NUMBER":current_address_house_number,  
      "ADDRESS_VILLAGE_NUMBER":current_address_village_number,  
      "ADDRESS_LANE":current_address_lane,  
      "ADDRESS_STREET":current_address_street,  
      "ADDRESS_LOCALITY":current_address_locality,  
      "ADDRESS_POSTAL_CODE":current_address_postal_code,  
      "ADDRESS_LATITUDE":current_address_latitude, 
      "ADDRESS_LONGITUDE":current_address_longitude, 
      "SUBDISTRICT_ID":current_subdistrict_id,  
      "ADDRESS_STATUS_ID":current_address_status_id};  
                                                                  
  
      db.query("INSERT INTO ADDRESS SET ?",temp_cur_addr, function (error, results, fields) { 
              // var temp = results[0]; 
              // temp_per_addr=temp[0].ID; 
              // console.log(results); 
              // if(error) console.log(error); 
              // else  
              // res.end(results); 
              // this.per_addr="123123"; 
          }); 
           
      // console.log(per_addr); 
 
 
 
 
    //////////////// 
 
    const contactAddressOther = req.body.contactAddressOther; 
    const house_number3 = contactAddressOther.houseNumber; 
    const village_number3 = contactAddressOther.villageNumber; 
    const lane3 = contactAddressOther.alley; 
    const street3 = contactAddressOther.road; 
    const locality3 = contactAddressOther.houseNumber; 
    const postcode3 = contactAddressOther.postCode; 
    const lat3 = 1; 
    const lng3 = 1; 
    const subdistrict3 = contactAddressOther.subDistrict; 
    const addr_status3 = 1; 
 
 
 
 
 
    // let temp_addr_contact={ 
    //   "ADDRESS_HOUSE_NUMBER":contact_address_house_number,  
    //   "ADDRESS_VILLAGE_NUMBER":contact_address_village_number,  
    //   "ADDRESS_LANE":contact_address_lane,  
    //   "ADDRESS_STREET":contact_address_street,  
    //   "ADDRESS_LOCALITY":contact_address_locality,  
    //   "ADDRESS_POSTAL_CODE":contact_address_postal_code,  
    //   "SUBDISTRICT_ID":contact_subdistrict_id,  
    //   "ADDRESS_STATUS_ID":contact_subdistrict_id} 
 
     
 
     
    // const village_number2 = req.body.village_number; 
    // const lane2 = req.body.lane; 
    // const street2 = req.body.street; 
    // const locality2 = req.body.locality; 
   
   
 
 
  res.json({"status":"Success"}); 
 
// console.log("Insert"); 
//     const idcard = req.body.idcard["asdasd"]; 
//     const firstname = req.body.firstname; 
//     const lastname = req.body.lastname; 
//     const image = req.body.img; 
//     const birthday = req.body.birthday; 
//     const issueby = req.body.issueby; 
//     const issuedate = req.body.issuedate; 
//     const expiry = req.body.expiry; 
//     const phonenumber = req.body.phonenumber; 
//     const mobilephonenumber = req.body.mobilephonenumber; 
//     const faxnumber = req.body.faxnumber; 
//     const email = req.body.email; 
//     const line = req.body.line; 
//     const facebook = req.body.facebook; 
//     const weight = req.body.weight; 
//     const height = req.body.height; 
//     const waistline = req.body.waistline; 
//     const bmi = req.body.bmi; 
//     const systolic_blood = req.body.systolic_blood; 
//     const diastolic_blood = req.body.diastolic_blood; 
//     const fasting_sugar = req.body.fasting_sugar; 
//     const disabled_card = req.body.disabled_card; 
//     const title_id = req.body.title_id; 
//     const province = req.body.province; 
//     const per_addr = req.body.per_addr; 
//     const cur_addr = req.body.cur_addr; 
//     const nationality = req.body.nationality; 
//     const ethnicity = req.body.ethnicity; 
//     const religion = req.body.religion; 
//     const status_id = req.body.status_id; 
 
 
// //   Address1 
//     const house_number1 = req.body.house_number; 
//     const village_number1 = req.body.village_number; 
//     const lane1 = req.body.lane; 
//     const street1 = req.body.street; 
//     const locality1 = req.body.locality; 
//     const postcode1 = req.body.postcode; 
//     const lat1 = req.body.lat; 
//     const lng1 = req.body.lng; 
//     const subdistrict1 = req.body.subdistrict; 
//     const addr_status1 = 1; 
 
//     const addr_checkbox = true; 
 
// //   Address2 
//     const house_number2 = req.body.house_number; 
//     const village_number2 = req.body.village_number; 
//     const lane2 = req.body.lane; 
//     const street2 = req.body.street; 
//     const locality2 = req.body.locality; 
//     const postcode2 = req.body.postcode; 
//     const lat2 = req.body.lat; 
//     const lng2 = req.body.lng; 
//     const subdistrict2 = req.body.subdistrict; 
//     const addr_status2 = 2; 
 
 
// //   const lastname = req.body.lastname; 
// //   res.end("Received  Feedback : " + feedback + ", Username : " +username ); 
// //   var data=[1, 1, 1, 1, '2019-09-02 00:00:00.000000', 1, '2019-09-16 00:00:00.000000', '2019-09-16 00:00:00.000000', 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]; 
//     //  var data  = {"MEMBER_IDENTIFICATION_NUMBER":idcard, "MEMBER_FIRST_NAME":firstname, "MEMBER_LAST_NAME":lastname, "MEMBER_IMAGE":image, "MEMBER_BIRTH_DATE":birthday, "MEMBER_ISSUE_BY":issueby, "MEMBER_ISSUE_DATE":issuedate, "MEMBER_EXPIRY_DATE":expiry,"MEMBER_PHONE_NUMBER":phonenumber,"MEMBER_MOBILE_PHONE_NUMBER":mobilephonenumber, "MEMBER_FAX_NUMBER":faxnumber, "MEMBER_EMAIL":email, "MEMBER_LINE_ID":line, "MEMBER_FACEBOOK_ID":facebook, "MEMBER_WEIGHT":weight, "MEMBER_HEIGHT":height, "MEMBER_WAISTLINE":waistline, "MEMBER_BMI":bmi,"MEMBER_SYSTOLIC_BLOOD_PRESSURE":systolic_blood, "MEMBER_DIASTOLIC_BLOOD_PRESSURE":diastolic_blood, "MEMBER_FASTING_BLOOD_SUGAR":fasting_sugar, "MEMBER_DISABLED_CARD":disabled_card, "NAME_TITLE_ID":title_id, "BIRTHPLACE_PROVINCE_ID":province, "PERMANENT_ADDRESS_ID":per_addr, "CURRENT_ADDRESS_ID":cur_addr, "NATIONALITY_ID":nationality, "ETHNICITY_ID":ethnicity, "RELIGION_ID":religion, "MEMBER_STATUS_ID":status_id}; 
//                  db.query("CALL INSERT_MEMBER ("+idcard+", '"+firstname+"', '"+lastname+"', '"+image+"', '"+birthday+"', '"+issueby+"', '"+issuedate+"', '"+expiry+"','"+phonenumber+"','"+mobilephonenumber+"', '"+faxnumber+"', '"+email+"', '"+line+"', '"+facebook+"', '"+weight+"', '"+height+"', '"+waistline+"', '"+bmi+"', '"+systolic_blood+"', '"+diastolic_blood+"', '"+fasting_sugar+"', '"+disabled_card+"', '"+title_id+"', '"+province+"', '"+per_addr+"', '"+cur_addr+"', '"+nationality+"', '"+ethnicity+"', '"+ethnicity+"', '"+status_id+"')", function (error, results, fields) { 
//   db.query("INSERT INTO `MEMBER`(`MEMBER_IDENTIFICATION_NUMBER`, `MEMBER_FIRST_NAME`, `MEMBER_LAST_NAME`, `MEMBER_IMAGE`, `MEMBER_BIRTH_DATE`, `MEMBER_ISSUE_BY`, `MEMBER_ISSUE_DATE`, `MEMBER_EXPIRY_DATE`, `MEMBER_PHONE_NUMBER`, `MEMBER_MOBILE_PHONE_NUMBER`, `MEMBER_FAX_NUMBER`, `MEMBER_EMAIL`, `MEMBER_LINE_ID`, `MEMBER_FACEBOOK_ID`, `MEMBER_WEIGHT`, `MEMBER_HEIGHT`, `MEMBER_WAISTLINE`, `MEMBER_BMI`, `MEMBER_SYSTOLIC_BLOOD_PRESSURE`, `MEMBER_DIASTOLIC_BLOOD_PRESSURE`, `MEMBER_FASTING_BLOOD_SUGAR`, `MEMBER_DISABLED_CARD`, `NAME_TITLE_ID`, `BIRTHPLACE_PROVINCE_ID`, `PERMANENT_ADDRESS_ID`, `CURRENT_ADDRESS_ID`, `NATIONALITY_ID`, `ETHNICITY_ID`, `RELIGION_ID`, `MEMBER_STATUS_ID`) VALUES ("+idcard+", '"+firstname+"', '"+lastname+"', '"+image+"', '"+birthday+"', '"+issueby+"', '"+issuedate+"', '"+expiry+"','"+phonenumber+"','"+mobilephonenumber+"', '"+faxnumber+"', '"+email+"', '"+line+"', '"+facebook+"', '"+weight+"', '"+height+"', '"+waistline+"', '"+bmi+"', '"+systolic_blood+"', '"+diastolic_blood+"', '"+fasting_sugar+"', '"+disabled_card+"', '"+title_id+"', '"+province+"', '"+per_addr+"', '"+cur_addr+"', '"+nationality+"', '"+ethnicity+"', '"+religion+"', '"+status_id+"')", function (error, results, fields) { 
        // db.query("INSERT INTO `MEMBER` SET ?",data, function (error, results, fields) { 
//     if (error) { 
//         console.log(error); 
//         res.json({"status":"Cannot Insert"}); 
//     } 
//     else { 
//         // console.log('The solution is: ', results); 
//         res.json({"status":"Insert Success","name":firstname}); 
//     } 
//   }); 
 
// let temp_per_addr=0; 
// let temp_cur_addr=0; 
// if (addr_checkbox) { 
//     // db.query("CALL `INSERT_ADDRESS`("+house_number1+","+village_number1+", "+lane1+", "+street1+", "+locality1+", "+postcode1+", "+lat1+", "+lng1+", "+subdistrict1+","+addr_status1+")", function (error, results, fields) { 
//     db.query("CALL `INSERT_ADDRESS`('2','1', '1', '1', '1', '1', '1', '1', '1','1')", function (error, results, fields) { 
//         var temp = results[0]; 
//         temp_per_addr=temp[0].ID; 
//         console.log(temp_per_addr); 
         
//         // res.json({"status":"Insert Success","name":temp[0].ID}); 
//     }); 
//     db.query("CALL `INSERT_ADDRESS`('2','1', '1', '1', '1', '1', '1', '1', '1','2')", function (error, results, fields) { 
//         var temp = results[0]; 
//         temp_cur_addr=temp[0].ID; 
//         console.log(temp_cur_addr); 
//         // res.json({"status":"Insert Success","name":temp[0].ID}); 
//     }); 
// } 
// else{ 
 
// } 
// const per_addr = temp_per_addr; 
// const cur_addr = temp_cur_addr; 
// console.log(per_addr); 
// console.log(cur_addr); 
 
        // var data  = {"MEMBER_IDENTIFICATION_NUMBER":idcard, "MEMBER_FIRST_NAME":firstname, "MEMBER_LAST_NAME":lastname, "MEMBER_IMAGE":image, "MEMBER_BIRTH_DATE":birthday, "MEMBER_ISSUE_BY":issueby, "MEMBER_ISSUE_DATE":issuedate, "MEMBER_EXPIRY_DATE":expiry,"MEMBER_PHONE_NUMBER":phonenumber,"MEMBER_MOBILE_PHONE_NUMBER":mobilephonenumber, "MEMBER_FAX_NUMBER":faxnumber, "MEMBER_EMAIL":email, "MEMBER_LINE_ID":line, "MEMBER_FACEBOOK_ID":facebook, "MEMBER_WEIGHT":weight, "MEMBER_HEIGHT":height, "MEMBER_WAISTLINE":waistline, "MEMBER_BMI":bmi,"MEMBER_SYSTOLIC_BLOOD_PRESSURE":systolic_blood, "MEMBER_DIASTOLIC_BLOOD_PRESSURE":diastolic_blood, "MEMBER_FASTING_BLOOD_SUGAR":fasting_sugar, "MEMBER_DISABLED_CARD":disabled_card, "NAME_TITLE_ID":title_id, "BIRTHPLACE_PROVINCE_ID":province, "PERMANENT_ADDRESS_ID":per_addr, "CURRENT_ADDRESS_ID":cur_addr, "NATIONALITY_ID":nationality, "ETHNICITY_ID":ethnicity, "RELIGION_ID":religion, "MEMBER_STATUS_ID":status_id}; 
        // db.query("INSERT INTO `MEMBER` SET ?",data, function (error, results, fields) { 
        //     if (error) { 
        //         console.log(error); 
        //         res.json({"status":"Cannot Insert"}); 
        //     } 
        //     else { 
              
        //         res.json({"status":"Insert Success","name":firstname}); 
        //     } 
        //   }); 
 
         
 
 
 
 
 
 
 
   
}); 
}); 
 
app.post('/delete_data', (req,res)=>{ 
 
  //res.end("Received  Feedback : " + feedback + ", Username : " +username ); 
  // var data  = {customer_id: null, customer_first_name: firstname ,customer_last_name: lastname}; 
  db.query('DELETE FROM `customer` WHERE `customer`.`customer_id` = '+req.body.index, function (error, results, fields) { 
    if (error){ 
      console.log(error); 
      res.json(false); 
    } 
    else{ 
      res.json(true); 
    } 
  }); 
}); 