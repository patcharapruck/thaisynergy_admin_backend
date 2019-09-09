const express = require('express');
const bodyPaeser = require('body-parser');
const mysql = require('mysql');

const app = express();

app.use(bodyPaeser.json());
app.use(bodyPaeser.urlencoded());


app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'content-type, x-access-token');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});


app.listen(3000, () => {
  //console.log("server is running...");
});

// app.get('/', (req,res)=>{
//   res.end("welcome to root path");
// });

// app.get('/home', (req,res)=>{
//   res.end("welcome to home path");
// });

app.post('/api', (req, res) => {
  const feedback = req.body.feedback;
  const username = req.body.username;
  //res.end("Received  Feedback : " + feedback + ", Username : " +username );
  res.json({ result: "success", Username: username, Feedback: feedback });
});



const db = mysql.createConnection({
  host: 'localhost',
  port: 8889,
  user: 'root',
  password: 'root',
  database: 'THAISYNERGY'
});

db.connect((err) => {
  if (err) {
    //console.log(err);
  }
  //console.log('Mysql Connected...');
});

/////////// General Data ///////////////
app.get('/get_prefix', (req, res) => {
  db.query('SELECT * FROM `NAME_TITLE`', function (error, results, fields) {
    //console.log(results);

    res.json({ results });
  });
});

app.get('/get_province', (req, res) => {
  db.query('SELECT * FROM `PROVINCE`', function (error, results, fields) {
    //console.log(results);

    res.json({ results });
  });
});

app.post('/get_district', (req, res) => {
  let id_province = req.body.id;
  db.query('SELECT * FROM `DISTRICT` WHERE `DISTRICT`.`PROVINCE_ID` =' + id_province, function (error, results, fields) {
    //console.log(results);

    res.json({ results });
  });
});

app.post('/get_subdistrict', (req, res) => {
  let id_district = req.body.id;
  db.query('SELECT * FROM `SUBDISTRICT` WHERE `SUBDISTRICT`.`DISTRICT_ID` =' + id_district, function (error, results, fields) {
    //console.log(results);

    res.json({ results });
  });
});

app.get('/get_member_status', (req, res) => {
  db.query('SELECT * FROM `MEMBER_STATUS`', function (error, results, fields) {
    //console.log(results);

    res.json({ results });
  });
});

//สัญชาติ
app.get('/get_nationality', (req, res) => {
  db.query('SELECT * FROM `NATIONALITY`', function (error, results, fields) {
    //console.log(results);

    res.json({ results });
  });
});

//เชื้อชาติ
app.get('/get_ethnicity', (req, res) => {
  db.query('SELECT * FROM `ETHNICITY`', function (error, results, fields) {
    //console.log(results);

    res.json({ results });
  });
});
//ศาสนา
app.get('/get_religiion', (req, res) => {
  db.query('SELECT * FROM `RELIGION`', function (error, results, fields) {
    //console.log(results);

    res.json({ results });
  });
});

app.get('/get_member', (req, res) => {
  db.query('SELECT MEMBER.MEMBER_ID,CONVERT(MEMBER.MEMBER_IDENTIFICATION_NUMBER,char(255)) AS ID_CARD,CONCAT((SELECT NAME_TITLE.NAME_TITLE_NAME FROM NAME_TITLE WHERE NAME_TITLE.NAME_TITLE_ID = MEMBER.NAME_TITLE_ID),MEMBER.MEMBER_FIRST_NAME," ",MEMBER.MEMBER_LAST_NAME) AS NAME_MEMBER, MEMBER.MEMBER_BIRTH_DATE FROM MEMBER', function (error, results, fields) {
    //console.log(results);

    res.json({ results });
  });
});


/////////// insert member ///////////////
app.post('/insert_member', async (req, res) => {

  // console.log(req.body);
  const fetchData_member = req.body.member;

  const permanentAddressMember = fetchData_member.permanentAddressMember;

  const permanent_address_house_number = permanentAddressMember.houseNumber;
  const permanent_address_village_number = permanentAddressMember.villageNumber;
  const permanent_address_lane = permanentAddressMember.alley;
  const permanent_address_street = permanentAddressMember.road;
  const permanent_address_locality = permanentAddressMember.houseNumber;
  const permanent_address_postal_code = permanentAddressMember.postCode;
  const permanent_subdistrict_id = permanentAddressMember.subDistrict;
  const permanent_address_status_id = 1;

  let temp_per_addr = {
    "ADDRESS_HOUSE_NUMBER": permanent_address_house_number,
    "ADDRESS_VILLAGE_NUMBER": permanent_address_village_number,
    "ADDRESS_LANE": permanent_address_lane,
    "ADDRESS_STREET": permanent_address_street,
    "ADDRESS_LOCALITY": permanent_address_locality,
    "ADDRESS_POSTAL_CODE": permanent_address_postal_code,
    "SUBDISTRICT_ID": permanent_subdistrict_id,
    "ADDRESS_STATUS_ID": permanent_address_status_id
  };

  let per_addr = 0;
  db.query("INSERT INTO ADDRESS SET ?", temp_per_addr, async function (error, results, fields) {
    if (error) {
      console.log(error);
      res.json({ "results": { "status": "404", "massage": 'Cannot Insert permanent address' } });

    }
    else {
      //console.log("Insert permanent address");
    }
  });


  const currentAddressMember = fetchData_member.currentAddressMember;
  const current_address_house_number = currentAddressMember.houseNumber;
  const current_address_village_number = currentAddressMember.villageNumber;
  const current_address_lane = currentAddressMember.alley;
  const current_address_street = currentAddressMember.road;
  const current_address_locality = currentAddressMember.houseNumber;
  const current_address_postal_code = currentAddressMember.postCode;
  const current_address_latitude = 1;
  const current_address_longitude = 1;
  const current_subdistrict_id = currentAddressMember.subDistrict;
  const current_address_status_id = 2;

  let temp_cur_addr = {
    "ADDRESS_HOUSE_NUMBER": current_address_house_number,
    "ADDRESS_VILLAGE_NUMBER": current_address_village_number,
    "ADDRESS_LANE": current_address_lane,
    "ADDRESS_STREET": current_address_street,
    "ADDRESS_LOCALITY": current_address_locality,
    "ADDRESS_POSTAL_CODE": current_address_postal_code,
    "ADDRESS_LATITUDE": current_address_latitude,
    "ADDRESS_LONGITUDE": current_address_longitude,
    "SUBDISTRICT_ID": current_subdistrict_id,
    "ADDRESS_STATUS_ID": current_address_status_id
  };

  // var temp =0;
  db.query("INSERT INTO ADDRESS SET ?", temp_cur_addr, function (error, results, fields) {

    if (error) {
      console.log(error);

      res.json({ "results": { "status": "404" } });
    }
    else {
      //console.log("Insert current address");
    }
  });
  // console.log(temp);



  ////////// informationMember ///////////
  const personalData = fetchData_member.informationMember;
  const idcard = personalData.idcard;
  const firstname = personalData.fname;
  const lastname = personalData.lname;
  const image = personalData.img;
  const birthday = personalData.birthDate;
  const issueby = personalData.issueBy;
  const issuedate = personalData.issueDate;
  const expiry = personalData.expiredDate;
  const title_id = personalData.prefix;
  const province = personalData.provinceOfBirth;
  const nationality = personalData.nationality;
  const ethnicity = personalData.ethnicity;
  const religion = personalData.religion;

  ////////// phoneContactMember ///////////
  const phoneContactMember = fetchData_member.phoneContactMember;
  const phonenumber = phoneContactMember.telNumber;
  const mobilephonenumber = phoneContactMember.phoneNumber;
  const faxnumber = phoneContactMember.faxNumber;
  const email = phoneContactMember.email;
  const line = phoneContactMember.line;
  const facebook = phoneContactMember.facebook;


  ////////// informationBody ///////////
  const informationBody = fetchData_member.informationBody;
  const weight = informationBody.weight;
  const height = informationBody.height;
  const waistline = informationBody.waistline;
  const bmi = informationBody.bmi;
  const systolic_blood = informationBody.sbp;
  const diastolic_blood = informationBody.dbp;
  const fasting_sugar = informationBody.fbs;
  const disabled_card = informationBody.disabledCard;
  const status_id = informationBody.memberStatus;


  db.query("INSERT INTO MEMBER(MEMBER_IDENTIFICATION_NUMBER, MEMBER_FIRST_NAME, MEMBER_LAST_NAME, MEMBER_IMAGE, MEMBER_BIRTH_DATE, MEMBER_ISSUE_BY, MEMBER_ISSUE_DATE, MEMBER_EXPIRY_DATE, MEMBER_PHONE_NUMBER, MEMBER_MOBILE_PHONE_NUMBER, MEMBER_FAX_NUMBER, MEMBER_EMAIL, MEMBER_LINE_ID, MEMBER_FACEBOOK_ID, MEMBER_WEIGHT, MEMBER_HEIGHT, MEMBER_WAISTLINE, MEMBER_BMI, MEMBER_SYSTOLIC_BLOOD_PRESSURE, MEMBER_DIASTOLIC_BLOOD_PRESSURE, MEMBER_FASTING_BLOOD_SUGAR, MEMBER_DISABLED_CARD, NAME_TITLE_ID, BIRTHPLACE_PROVINCE_ID, PERMANENT_ADDRESS_ID, CURRENT_ADDRESS_ID, NATIONALITY_ID, ETHNICITY_ID, RELIGION_ID, MEMBER_STATUS_ID) VALUES('" + idcard + "', '" + firstname + "', '" + lastname + "', '" + image + "', '" + birthday + "', '" + issueby + "', '" + issuedate + "', '" + expiry + "', '" + phonenumber + "', '" + mobilephonenumber + "', '" + faxnumber + "', '" + email + "', '" + line + "', '" + facebook + "', '" + weight + "', '" + height + "', '" + waistline + "', '" + bmi + "', '" + systolic_blood + "', '" + diastolic_blood + "', '" + fasting_sugar + "', '" + disabled_card + "', '" + title_id + "', '" + province + "', LAST_INSERT_ID()-1, LAST_INSERT_ID(), '" + nationality + "', '" + ethnicity + "', '" + religion + "', '" + status_id + "')", function (error, results, fields) {

    if (error) {
      console.log(error);

      res.json({ "results": { "status": "404" } });
    }
    else {
      //console.log("Insert Member Success");
    }


  });



  const fetchData_contact = req.body.contact;

  const contactAddress = fetchData_contact.contactAddress;
  const contact_address_house_number = contactAddress.houseNumber;
  const contact_address_village_number = contactAddress.villageNumber;
  const contact_address_lane = contactAddress.alley;
  const contact_address_street = contactAddress.road;
  const contact_address_locality = contactAddress.locality;
  const contact_address_postal_code = contactAddress.postCode;
  const contact_subdistrict_id = contactAddress.subDistrict;


  let temp_addr_contact = {
    "ADDRESS_HOUSE_NUMBER": contact_address_house_number,
    "ADDRESS_VILLAGE_NUMBER": contact_address_village_number,
    "ADDRESS_LANE": contact_address_lane,
    "ADDRESS_STREET": contact_address_street,
    "ADDRESS_LOCALITY": contact_address_locality,
    "ADDRESS_POSTAL_CODE": contact_address_postal_code,
    "SUBDISTRICT_ID": contact_subdistrict_id,
    "ADDRESS_STATUS_ID": 1
  }

  db.query("INSERT INTO ADDRESS SET ?", temp_addr_contact, function (error, results, fields) {


    if (error) {
      // console.log(error);

      res.json({ "results": { "status": "404" } });
    }
    else {
      //console.log("Insert contact address");
    }
  });

  const informationContact = fetchData_contact.informationContact;
  const contact_name_title_id = informationContact.contactPrefix;
  const contact_first_name = informationContact.contactFname;
  const contact_last_name = informationContact.contactLname;

  const phoneContact = fetchData_contact.phoneContact;
  const contact_phone_number = phoneContact.telNumber;
  const contact_mobile_phone_number = phoneContact.phoneNumber;
  const contact_fax_number = phoneContact.faxNumber;
  const contact_email = phoneContact.email;
  const contact_line_id = phoneContact.lineId;
  const contact_facebook_id = phoneContact.facebookId;



  let sql_temp_contact = "INSERT INTO ICE_CONTACT(ICE_CONTACT_FIRST_NAME, ICE_CONTACT_LAST_NAME, ICE_CONTACT_PHONE_NUMBER, ICE_CONTACT_MOBILE_PHONE_NUMBER, ICE_CONTACT_FAX_NUMBER, ICE_CONTACT_EMAIL, ICE_CONTACT_LINE_ID, ICE_CONTACT_FACEBOOK_ID, NAME_TITLE_ID, ADDRESS_ID, MEMBER_ID) VALUES('" + contact_first_name + "', '" + contact_last_name + "', '" + contact_phone_number + "', '" + contact_mobile_phone_number + "', '" + contact_fax_number + "', '" + contact_email + "', '" + contact_line_id + "', '" + contact_facebook_id + "', '" + contact_name_title_id + "', LAST_INSERT_ID(), (SELECT MAX(MEMBER.MEMBER_ID) FROM MEMBER));"


  db.query(sql_temp_contact, function (error, results, fields) {

    if (error) {
      // console.log(error);

      res.json({ "results": { "status": "404" } });
    }
    else {
      //console.log("Insert ICE_CONTACT Success");

      // res.json({"status":"200"});
    }
  });

  db.query("SELECT MAX(MEMBER.MEMBER_ID) AS ID FROM MEMBER", function (error, results, fields) {

    if (error) {
      console.log(error);
      res.json({ "results": { "status": "404" } });
    }
    else {
      //console.log("Insert ICE_CONTACT Success");
      let data = results[0];
      res.json({ "results": { "status": "200", data } });
    }
  });
});

app.post('/delete_member', (req, res) => {
  // console.log(req.body);
  const member_id = req.body.member_id;
  //console.log(member_id);


  db.query("DELETE FROM ADDRESS WHERE ADDRESS.ADDRESS_ID = (SELECT ICE_CONTACT.ADDRESS_ID FROM ICE_CONTACT WHERE ICE_CONTACT.MEMBER_ID =" + member_id + ")", function (error, results, fields) {

    if (error) {
      //console.log(error);
      res.json({ "results": { "status": "404" } });
    }
    else {
      //console.log("DELETE ICE_CONTACT ADDRESS");
      // res.json({"status":"200"});
    }
  });

  db.query("DELETE FROM ICE_CONTACT WHERE ICE_CONTACT.MEMBER_ID =" + member_id, function (error, results, fields) {

    if (error) {
      //console.log(error);
      res.json({ "results": { "status": "404" } });
    }
    else {
      //console.log("DELETE ICE_CONTACT");
      // res.json({"status":"200"});
    }
  });





  db.query("DELETE FROM `EQUIPMENT` WHERE EQUIPMENT.MEMBER_ID =" + member_id + "", function (error, results, fields) {

    if (error) {
      //console.log(error);
      res.json({ "results": { "status": "404" } });
    }
    else {
      //console.log("DELETE EQUIPMENT");
      // res.json({"status":"200"});
    }
  });

  db.query("DELETE FROM `CARETAKER` WHERE CARETAKER.MEMBER_ID =" + member_id + "", function (error, results, fields) {

    if (error) {
      //console.log(error);
      res.json({ "results": { "status": "404" } });
    }
    else {
      //console.log("DELETE CARETAKER");
      // res.json({"status":"200"});
    }
  });

  db.query("DELETE FROM `MEDICAL_CARE` WHERE MEDICAL_CARE.MEMBER_ID=" + member_id + "", function (error, results, fields) {

    if (error) {
      //console.log(error);
      res.json({ "results": { "status": "404" } });
    }
    else {
      //console.log("DELETE MEDICAL_CARE");
      // res.json({"status":"200"});
    }
  });

  db.query("DELETE FROM MEMBER_HAS_DISABILITY WHERE MEMBER_HAS_DISABILITY.MEMBER_ID = ? ", member_id, function (error, results, fields) {

    if (error) {
      //console.log(error);
      res.json({ "results": { "status": "404" } });
    }
    else {
      //console.log("DELETE MEDICAL_CARE");
      // res.json({"status":"200"});
    }
  });

  db.query("DELETE FROM MEMBER_HAS_RESIDENCE WHERE MEMBER_HAS_RESIDENCE.MEMBER_ID= ? ", member_id, function (error, results, fields) {

    if (error) {
      //console.log(error);
      res.json({ "results": { "status": "404" } });
    }
    else {
      //console.log("DELETE MEDICAL_CARE");
      // res.json({"status":"200"});
    }
  });



  db.query("DELETE FROM ADDRESS WHERE ADDRESS.ADDRESS_ID = (SELECT MEMBER.PERMANENT_ADDRESS_ID FROM MEMBER WHERE MEMBER.MEMBER_ID = " + member_id + ")", function (error, results, fields) {

    if (error) {
      //console.log(error);
      res.json({ "results": { "status": "404" } });
    }
    else {
      //console.log("DELETE PERMANENT ADDRESS");
      // res.json({"status":"200"});
    }
  });

  db.query("DELETE FROM ADDRESS WHERE ADDRESS.ADDRESS_ID = (SELECT MEMBER.CURRENT_ADDRESS_ID FROM MEMBER WHERE MEMBER.MEMBER_ID = " + member_id + ")", function (error, results, fields) {

    if (error) {
      //console.log(error);
      res.json({ "results": { "status": "404" } });
    }
    else {
      //console.log("DELETE CURRENT ADDRESS_ID");
      // res.json({"status":"200"});
    }
  });

  db.query("DELETE FROM `MEMBER` WHERE MEMBER.MEMBER_ID=" + member_id, function (error, results, fields) {

    if (error) {
      //console.log(error);
      res.json({ "results": { "status": "404" } });
    }
    else {
      //console.log("DELETE MEMBER");
      res.json({ "results": { "status": "200" } });
    }
  });

});


app.post('/insert_equipment', (req, res) => {
  //console.log(req.body);
  let fetchdata_equipment = req.body.equipment;
  let equipment_walker = fetchdata_equipment.equipment_walker;
  let equipment_prostheses = fetchdata_equipment.equipment_prostheses;
  let equipment_standard_tricycle = fetchdata_equipment.equipment_standard_tricycle;
  let equipment_white_cane = fetchdata_equipment.equipment_white_cane;
  let equipment_slate = fetchdata_equipment.equipment_slate;
  let equipment_stylus = fetchdata_equipment.equipment_stylus;
  let equipment_hearing_aids = fetchdata_equipment.equipment_hearing_aids;
  let equipment_other = fetchdata_equipment.equipment_other;
  let member_id = fetchdata_equipment.member_id;

  // res.json({"status":"200"});

  db.query("INSERT INTO `EQUIPMENT`(`EQUIPMENT_WALKER`, `EQUIPMENT_PROSTHESES`, `EQUIPMENT_STANDARD_TRICYCLE`, `EQUIPMENT_WHITE_CANE`, `EQUIPMENT_SLATE`, `EQUIPMENT_STYLUS`, `EQUIPMENT_HEARING_AIDS`, `EQUIPMENT_OTHER`, `MEMBER_ID`) " +
    " VALUES ('" + equipment_walker + "'," +
    "'" + equipment_prostheses + "'," +
    "'" + equipment_standard_tricycle + "'," +
    "'" + equipment_white_cane + "'," +
    "'" + equipment_slate + "'," +
    "'" + equipment_stylus + "'," +
    "'" + equipment_hearing_aids + "'," +
    "'" + equipment_other + "'," +
    "'" + member_id + "')", function (error, results, fields) {
      // console.log(results);
      if (error) {
        res.json({ "results": { "status": "404" } });
      }
      else {
        res.json({ "results": { "status": "200" } });
      }
    });

});


app.post('/insert_medical_care', (req, res) => {

  //console.log(req.body);
  let fetchdata_medical_care = req.body.medical_care;
  let medical_care_nhso_disabled = fetchdata_medical_care.medical_care_nhso_disabled;
  let medical_care_nhso_uc = fetchdata_medical_care.medical_care_nhso_uc;
  let medical_care_pension = fetchdata_medical_care.medical_care_pension;
  let medical_care_veteran = fetchdata_medical_care.medical_care_veteran;
  let medical_care_social_security = fetchdata_medical_care.medical_care_social_security;
  let medical_care_life_insurance = fetchdata_medical_care.medical_care_life_insurance;
  let medical_care_self = fetchdata_medical_care.medical_care_self;
  let medical_other = fetchdata_medical_care.medical_other;
  let member_id = fetchdata_medical_care.member_id;

  // res.json({"status":"200"});

  db.query("INSERT INTO `MEDICAL_CARE`(`MEDICAL_CARE_NHSO_DISABLED`, `MEDICAL_CARE_NHSO_UC`, `MEDICAL_CARE_PENSION`, `MEDICAL_CARE_VETERAN`, `MEDICAL_CARE_SOCIAL_SECURITY`, `MEDICAL_CARE_LIFE_INSURANCE`, `MEDICAL_CARE_SELF`, `MEDICAL_OTHER`, `MEMBER_ID`) " +
    " VALUES ('" + medical_care_nhso_disabled + "'," +
    "'" + medical_care_nhso_uc + "'," +
    "'" + medical_care_pension + "'," +
    "'" + medical_care_veteran + "'," +
    "'" + medical_care_social_security + "'," +
    "'" + medical_care_life_insurance + "'," +
    "'" + medical_care_self + "'," +
    "'" + medical_other + "'," +
    "'" + member_id + "')", function (error, results, fields) {
      if (error) {
        res.json({ "results": { "status": "404" } });
      }
      else {
        res.json({ "results": { "status": "200" } });
      }
    });


});


/////////////////// insert_rights_information /////////////////////////
app.post('/insert_rights_information', (req, res) => {

  ////////////////fetchdata_member_id//////////////////
  // let fetchdata_member_id = req.body.member_id;
  let member_id = req.body.member_id;

  ////////////////equipment//////////////////
  let fetchdata_equipment = req.body.equipment;
  let equipment_walker = fetchdata_equipment.equipment_walker;
  let equipment_prostheses = fetchdata_equipment.equipment_prostheses;
  let equipment_standard_tricycle = fetchdata_equipment.equipment_standard_tricycle;
  let equipment_white_cane = fetchdata_equipment.equipment_white_cane;
  let equipment_slate = fetchdata_equipment.equipment_slate;
  let equipment_stylus = fetchdata_equipment.equipment_stylus;
  let equipment_hearing_aids = fetchdata_equipment.equipment_hearing_aids;
  let equipment_other = fetchdata_equipment.equipment_other;


  let temp_equipment = {
    "EQUIPMENT_WALKER": equipment_walker,
    "EQUIPMENT_PROSTHESES": equipment_prostheses,
    "EQUIPMENT_STANDARD_TRICYCLE": equipment_standard_tricycle,
    "EQUIPMENT_WHITE_CANE": equipment_white_cane,
    "EQUIPMENT_SLATE": equipment_slate,
    "EQUIPMENT_STYLUS": equipment_stylus,
    "EQUIPMENT_HEARING_AIDS": equipment_hearing_aids,
    "EQUIPMENT_OTHER": equipment_other,
    "MEMBER_ID": member_id
  }

  let temp_equipment_on = {
    "EQUIPMENT_WALKER": equipment_walker,
    "EQUIPMENT_PROSTHESES": equipment_prostheses,
    "EQUIPMENT_STANDARD_TRICYCLE": equipment_standard_tricycle,
    "EQUIPMENT_WHITE_CANE": equipment_white_cane,
    "EQUIPMENT_SLATE": equipment_slate,
    "EQUIPMENT_STYLUS": equipment_stylus,
    "EQUIPMENT_HEARING_AIDS": equipment_hearing_aids,
    "EQUIPMENT_OTHER": equipment_other,

  }


  db.query("INSERT INTO `EQUIPMENT` SET ? ON DUPLICATE KEY UPDATE ? ", [temp_equipment, temp_equipment_on], function (error, results, fields) {
    if (error) {
      console.log(error);

      res.json({ "results": { "status": "404" } });
    }
    else {
      //console.log("EQUIPMENT");
      // res.json({"status":"200"});
    }
  });

  ////////////////medical_care//////////////////

  let fetchdata_medical_care = req.body.medical_care;
  let medical_care_nhso_disabled = fetchdata_medical_care.medical_care_nhso_disabled;
  let medical_care_nhso_uc = fetchdata_medical_care.medical_care_nhso_uc;
  let medical_care_pension = fetchdata_medical_care.medical_care_pension;
  let medical_care_veteran = fetchdata_medical_care.medical_care_veteran;
  let medical_care_social_security = fetchdata_medical_care.medical_care_social_security;
  let medical_care_life_insurance = fetchdata_medical_care.medical_care_life_insurance;
  let medical_care_self = fetchdata_medical_care.medical_care_self;
  let medical_other = fetchdata_medical_care.medical_other;

  let temp_medical_care = {
    "MEDICAL_CARE_NHSO_DISABLED": medical_care_nhso_disabled,
    "MEDICAL_CARE_NHSO_UC": medical_care_nhso_uc,
    "MEDICAL_CARE_PENSION": medical_care_pension,
    "MEDICAL_CARE_VETERAN": medical_care_veteran,
    "MEDICAL_CARE_SOCIAL_SECURITY": medical_care_social_security,
    "MEDICAL_CARE_LIFE_INSURANCE": medical_care_life_insurance,
    "MEDICAL_CARE_SELF": medical_care_self,
    "MEDICAL_OTHER": medical_other,
    "MEMBER_ID": member_id
  }

  let temp_medical_care_onduplicate = {
    "MEDICAL_CARE_NHSO_DISABLED": medical_care_nhso_disabled,
    "MEDICAL_CARE_NHSO_UC": medical_care_nhso_uc,
    "MEDICAL_CARE_PENSION": medical_care_pension,
    "MEDICAL_CARE_VETERAN": medical_care_veteran,
    "MEDICAL_CARE_SOCIAL_SECURITY": medical_care_social_security,
    "MEDICAL_CARE_LIFE_INSURANCE": medical_care_life_insurance,
    "MEDICAL_CARE_SELF": medical_care_self,
    "MEDICAL_OTHER": medical_other,
    "MEMBER_ID": member_id
  }

  db.query("INSERT INTO `MEDICAL_CARE` SET ? ON DUPLICATE KEY UPDATE ?", [temp_medical_care, temp_medical_care_onduplicate], function (error, results, fields) {
    if (error) {
      res.json({ "results": { "status": "404" } });
    }
    else {
      //console.log("MEDICAL_CARE");
      // res.json({"status":"200"});
    }
  });

  //////////////CARETAKER/////////////////


  let fetchdata_caretaker_requirement = req.body.caretaker;
  let caretaker_requirement = fetchdata_caretaker_requirement.caretaker_requirement;

  let temp_caretaker = {
    "CARETAKER_REQUIREMENT": caretaker_requirement,
    "MEMBER_ID": member_id
  }
  let temp_caretaker_onduplicate = {
    "CARETAKER_REQUIREMENT": caretaker_requirement,
  }

  db.query("INSERT INTO `CARETAKER` SET ? ON DUPLICATE KEY UPDATE ?", [temp_caretaker, temp_caretaker_onduplicate], function (error, results, fields) {
    if (error) {
      res.json({ "results": { "status": "404" } });
    }
    else {
      //console.log("CARETAKER");

      // res.json({"results":{"status":"200"}});
    }
  });


  db.query("SELECT CARETAKER.CARETAKER_ID as id FROM `CARETAKER` WHERE CARETAKER.MEMBER_ID = ?", member_id, function (error, results, fields) {
    if (error) {
      res.json({ "results": { "status": "404" } });
    }
    else {
      //console.log("CARETAKER");

      res.json({ "results": { "status": "200", "data": { "ID": results[0].id } } });
    }
  });

});


/////////////////// Update_rights_information /////////////////////////
app.post('/update_rights_information', (req, res) => {

  ////////////////fetchdata_member_id//////////////////
  // let fetchdata_member_id = req.body.member_id;
  let member_id = req.body.member_id;

  ////////////////equipment//////////////////
  let fetchdata_equipment = req.body.equipment;
  let equipment_walker = fetchdata_equipment.equipment_walker;
  let equipment_prostheses = fetchdata_equipment.equipment_prostheses;
  let equipment_standard_tricycle = fetchdata_equipment.equipment_standard_tricycle;
  let equipment_white_cane = fetchdata_equipment.equipment_white_cane;
  let equipment_slate = fetchdata_equipment.equipment_slate;
  let equipment_stylus = fetchdata_equipment.equipment_stylus;
  let equipment_hearing_aids = fetchdata_equipment.equipment_hearing_aids;
  let equipment_other = fetchdata_equipment.equipment_other;

  var temp_equipment = {
    "EQUIPMENT_WALKER": equipment_walker,
    "EQUIPMENT_PROSTHESES": equipment_prostheses,
    "EQUIPMENT_STANDARD_TRICYCLE": equipment_standard_tricycle,
    "EQUIPMENT_WHITE_CANE": equipment_white_cane,
    "EQUIPMENT_SLATE": equipment_slate,
    "EQUIPMENT_STYLUS": equipment_stylus,
    "EQUIPMENT_HEARING_AIDS": equipment_hearing_aids,
    "EQUIPMENT_OTHER": equipment_other
  }


  db.query("UPDATE `EQUIPMENT` SET ? WHERE EQUIPMENT.MEMBER_ID = ?", [temp_equipment, member_id], function (error, results, fields) {
    if (error) {
      res.json({ "results": { "status": "404" } });
    }
    else {
      //console.log("EQUIPMENT");
      // res.json({"status":"200"});
    }
  });

  ////////////////medical_care//////////////////

  let fetchdata_medical_care = req.body.medical_care;
  let medical_care_nhso_disabled = fetchdata_medical_care.medical_care_nhso_disabled;
  let medical_care_nhso_uc = fetchdata_medical_care.medical_care_nhso_uc;
  let medical_care_pension = fetchdata_medical_care.medical_care_pension;
  let medical_care_veteran = fetchdata_medical_care.medical_care_veteran;
  let medical_care_social_security = fetchdata_medical_care.medical_care_social_security;
  let medical_care_life_insurance = fetchdata_medical_care.medical_care_life_insurance;
  let medical_care_self = fetchdata_medical_care.medical_care_self;
  let medical_other = fetchdata_medical_care.medical_other;

  let temp_medical_care = {
    "MEDICAL_CARE_NHSO_DISABLED": medical_care_nhso_disabled,
    "MEDICAL_CARE_NHSO_UC": medical_care_nhso_uc,
    "MEDICAL_CARE_PENSION": medical_care_pension,
    "MEDICAL_CARE_VETERAN": medical_care_veteran,
    "MEDICAL_CARE_SOCIAL_SECURITY": medical_care_social_security,
    "MEDICAL_CARE_LIFE_INSURANCE": medical_care_life_insurance,
    "MEDICAL_CARE_SELF": medical_care_self,
    "MEDICAL_OTHER": medical_other

  }

  db.query("UPDATE `MEDICAL_CARE` SET ? WHERE MEDICAL_CARE.MEMBER_ID = ?", [temp_medical_care, member_id], function (error, results, fields) {
    if (error) {
      res.json({ "results": { "status": "404" } });
    }
    else {
      //console.log("MEDICAL_CARE");
      // res.json({"status":"200"});
    }
  });

  //////////////CARETAKER/////////////////


  let fetchdata_caretaker_requirement = req.body.caretaker;
  let caretaker_requirement = fetchdata_caretaker_requirement.caretaker_requirement;

  let temp_caretaker = {
    "CARETAKER_REQUIREMENT": caretaker_requirement
  }

  db.query("UPDATE `CARETAKER` SET ? WHERE CARETAKER.MEMBER_ID = ?", [temp_caretaker, member_id], function (error, results, fields) {
    if (error) {
      res.json({ "results": { "status": "404" } });
    }
    else {
      //console.log("CARETAKER");

      // res.json({"results":{"status":"200"}});
    }
  });

  db.query("SELECT CARETAKER.CARETAKER_ID as id FROM `CARETAKER` WHERE CARETAKER.MEMBER_ID = ?", member_id, function (error, results, fields) {
    if (error) {
      res.json({ "results": { "status": "404" } });
    }
    else {
      //console.log("CARETAKER");

      res.json({ "results": { "status": "200", "data": { "ID": results[0].id } } });
    }
  });

});





app.post('/update_member', (req, res) => {
  // console.log(req.body[0].member);
  const fetchData_member = req.body[0].member;
  const member_id = req.body[1].member_id;
  //console.log(member_id);

  ////////// informationMember ///////////
  const personalData = fetchData_member.informationMember;
  const idcard = personalData.idcard;
  const firstname = personalData.fname;
  const lastname = personalData.lname;
  const image = personalData.img;
  const birthday = personalData.birthDate;
  const issueby = personalData.issueBy;
  const issuedate = personalData.issueDate;
  const expiry = personalData.expiredDate;
  const title_id = personalData.prefix;
  const province = personalData.provinceOfBirth;
  const nationality = personalData.nationality;
  const ethnicity = personalData.ethnicity;
  const religion = personalData.religion;

  ////////// phoneContactMember ///////////
  const phoneContactMember = fetchData_member.phoneContactMember;
  const phonenumber = phoneContactMember.telNumber;
  const mobilephonenumber = phoneContactMember.phoneNumber;
  const faxnumber = phoneContactMember.faxNumber;
  const email = phoneContactMember.email;
  const line = phoneContactMember.line;
  const facebook = phoneContactMember.facebook;


  ////////// informationBody ///////////
  const informationBody = fetchData_member.informationBody;
  const weight = informationBody.weight;
  const height = informationBody.height;
  const waistline = informationBody.waistline;
  const bmi = informationBody.bmi;
  const systolic_blood = informationBody.sbp;
  const diastolic_blood = informationBody.dbp;
  const fasting_sugar = informationBody.fbs;
  const disabled_card = informationBody.disabledCard;
  const status_id = informationBody.memberStatus;


  var data = {
    "MEMBER_IDENTIFICATION_NUMBER": idcard,
    "MEMBER_FIRST_NAME": firstname,
    "MEMBER_LAST_NAME": lastname,
    "MEMBER_IMAGE": image,
    "MEMBER_BIRTH_DATE": birthday,
    "MEMBER_ISSUE_BY": issueby,
    "MEMBER_ISSUE_DATE": issuedate,
    "MEMBER_EXPIRY_DATE": expiry,
    "MEMBER_PHONE_NUMBER": phonenumber,
    "MEMBER_MOBILE_PHONE_NUMBER": mobilephonenumber,
    "MEMBER_FAX_NUMBER": faxnumber,
    "MEMBER_EMAIL": email,
    "MEMBER_LINE_ID": line,
    "MEMBER_FACEBOOK_ID": facebook,
    "MEMBER_WEIGHT": weight,
    "MEMBER_HEIGHT": height,
    "MEMBER_WAISTLINE": waistline,
    "MEMBER_BMI": bmi,
    "MEMBER_SYSTOLIC_BLOOD_PRESSURE": systolic_blood,
    "MEMBER_DIASTOLIC_BLOOD_PRESSURE": diastolic_blood,
    "MEMBER_FASTING_BLOOD_SUGAR": fasting_sugar,
    "MEMBER_DISABLED_CARD": disabled_card,
    "NAME_TITLE_ID": title_id,
    "BIRTHPLACE_PROVINCE_ID": province,
    "NATIONALITY_ID": nationality,
    "ETHNICITY_ID": ethnicity,
    "RELIGION_ID": religion,
    "MEMBER_STATUS_ID": status_id
  };

  // var data  = "\"MEMBER_IDENTIFICATION_NUMBER\"=\""+idcard+"\","+
  //   "\"MEMBER_FIRST_NAME\"=\""+firstname+"\","+
  //   "\"MEMBER_LAST_NAME\"=\""+lastname+"\","+
  //   "\"MEMBER_IMAGE\"=\""+image+ "\"," +
  //   "\"MEMBER_BIRTH_DATE\"=\""+birthday+"\"," +
  //   "\"MEMBER_ISSUE_BY\"=\""+issueby+"\","+
  //   "\"MEMBER_ISSUE_DATE\"=\""+issuedate+"\","+
  //   "\"MEMBER_EXPIRY_DATE\"=\""+expiry+"\","+
  //   "\"MEMBER_PHONE_NUMBER\"=\""+phonenumber+"\","+
  //   "\"MEMBER_MOBILE_PHONE_NUMBER\"=\""+mobilephonenumber+"\","+
  //   "\"MEMBER_FAX_NUMBER\"=\""+faxnumber+"\","+
  //   "\"MEMBER_EMAIL\"=\""+email+"\","+
  //   "\"MEMBER_LINE_ID\"=\""+line+"\","+
  //   "\"MEMBER_FACEBOOK_ID\"=\""+facebook+"\"," +
  //   "\"MEMBER_WEIGHT\"=\""+weight+"\","+
  //   "\"MEMBER_HEIGHT\"=\""+height+"\","+
  //   "\"MEMBER_WAISTLINE\"=\""+waistline+"\"," +
  //   "\"MEMBER_BMI\"=\""+bmi+"\","+
  //   "\"MEMBER_SYSTOLIC_BLOOD_PRESSURE\"=\""+systolic_blood+"\","+
  //   "\"MEMBER_DIASTOLIC_BLOOD_PRESSURE\"=\""+diastolic_blood+"\","+
  //   "\"MEMBER_FASTING_BLOOD_SUGAR\"=\""+fasting_sugar+"\","+
  //   "\"MEMBER_DISABLED_CARD\"=\""+disabled_card+"\","+
  //   "\"NAME_TITLE_ID\"=\""+title_id+"\","+
  //   "\"BIRTHPLACE_PROVINCE_ID\"=\""+province+"\"," +
  //   "\"NATIONALITY_ID\"=\""+nationality+"\","+
  //   "\"ETHNICITY_ID\"=\""+ethnicity+"\","+
  //   "\"RELIGION_ID\"=\""+religion+"\","+
  //   "\"MEMBER_STATUS_ID\"=\""+status_id+"\"";


  // res.json({data});


  db.query("UPDATE `MEMBER` SET ? WHERE MEMBER.MEMBER_ID = ?", [data, member_id], function (error, results, fields) {

    if (error) {
      //console.log(error);
      res.json({ "results": { "status": "404" } });
    }
    else {
      //console.log("UPDATE MEMBER");
      // res.json({"status":"200"});
    }
  });


  //////////// UPDATE ADDRESS //////////////

  //////////// PERMANENT ADDRESS //////////////
  const permanentAddressMember = fetchData_member.permanentAddressMember;

  const permanent_address_house_number = permanentAddressMember.houseNumber;
  const permanent_address_village_number = permanentAddressMember.villageNumber;
  const permanent_address_lane = permanentAddressMember.alley;
  const permanent_address_street = permanentAddressMember.road;
  const permanent_address_locality = permanentAddressMember.houseNumber;
  const permanent_address_postal_code = permanentAddressMember.postCode;
  const permanent_subdistrict_id = permanentAddressMember.subDistrict;
  const permanent_address_status_id = 1;

  let temp_per_addr = {
    "ADDRESS_HOUSE_NUMBER": permanent_address_house_number,
    "ADDRESS_VILLAGE_NUMBER": permanent_address_village_number,
    "ADDRESS_LANE": permanent_address_lane,
    "ADDRESS_STREET": permanent_address_street,
    "ADDRESS_LOCALITY": permanent_address_locality,
    "ADDRESS_POSTAL_CODE": permanent_address_postal_code,
    "SUBDISTRICT_ID": permanent_subdistrict_id,
    "ADDRESS_STATUS_ID": permanent_address_status_id
  };

  let per_addr = 0;
  db.query("UPDATE `ADDRESS` SET ? WHERE ADDRESS.ADDRESS_ID = (SELECT MEMBER.PERMANENT_ADDRESS_ID FROM MEMBER WHERE MEMBER.MEMBER_ID = ? ) ", [temp_per_addr, member_id], async function (error, results, fields) {
    if (error) {
      //console.log(error);

      res.json({ "results": { "status": "404" } });
    }
    else {
      //console.log("Update permanent address");
      // res.json({"status":"200"});
    }
  });

  //////////// CURRENT ADDRESS //////////////
  const currentAddressMember = fetchData_member.currentAddressMember;
  const current_address_house_number = currentAddressMember.houseNumber;
  const current_address_village_number = currentAddressMember.villageNumber;
  const current_address_lane = currentAddressMember.alley;
  const current_address_street = currentAddressMember.road;
  const current_address_locality = currentAddressMember.houseNumber;
  const current_address_postal_code = currentAddressMember.postCode;
  const current_address_latitude = 1;
  const current_address_longitude = 1;
  const current_subdistrict_id = currentAddressMember.subDistrict;
  const current_address_status_id = 2;

  let temp_cur_addr = {
    "ADDRESS_HOUSE_NUMBER": current_address_house_number,
    "ADDRESS_VILLAGE_NUMBER": current_address_village_number,
    "ADDRESS_LANE": current_address_lane,
    "ADDRESS_STREET": current_address_street,
    "ADDRESS_LOCALITY": current_address_locality,
    "ADDRESS_POSTAL_CODE": current_address_postal_code,
    "ADDRESS_LATITUDE": current_address_latitude,
    "ADDRESS_LONGITUDE": current_address_longitude,
    "SUBDISTRICT_ID": current_subdistrict_id,
    "ADDRESS_STATUS_ID": current_address_status_id
  };

  // var temp =0;
  db.query("UPDATE `ADDRESS` SET ? WHERE ADDRESS.ADDRESS_ID = (SELECT MEMBER.CURRENT_ADDRESS_ID FROM MEMBER WHERE MEMBER.MEMBER_ID = ? ) ", [temp_cur_addr, member_id], async function (error, results, fields) {

    if (error) {
      //console.log(error);

      res.json({ "results": { "status": "404" } });
    }
    else {

      //console.log("Update current address");
      // res.json({"status":"200"});
    }
  });


  /////////////// CONTACT ////////////////////
  const fetchData_contact = req.body[0].contact;
  const contactAddress = fetchData_contact.contactAddress;
  const contact_address_house_number = contactAddress.houseNumber;
  const contact_address_village_number = contactAddress.villageNumber;
  const contact_address_lane = contactAddress.alley;
  const contact_address_street = contactAddress.road;
  const contact_address_locality = contactAddress.locality;
  const contact_address_postal_code = contactAddress.postCode;
  const contact_subdistrict_id = contactAddress.subDistrict;


  let temp_addr_contact = {
    "ADDRESS_HOUSE_NUMBER": contact_address_house_number,
    "ADDRESS_VILLAGE_NUMBER": contact_address_village_number,
    "ADDRESS_LANE": contact_address_lane,
    "ADDRESS_STREET": contact_address_street,
    "ADDRESS_LOCALITY": contact_address_locality,
    "ADDRESS_POSTAL_CODE": contact_address_postal_code,
    "SUBDISTRICT_ID": contact_subdistrict_id,
    "ADDRESS_STATUS_ID": 1
  }

  db.query("UPDATE `ADDRESS` SET ? WHERE ADDRESS.ADDRESS_ID=(SELECT ICE_CONTACT.ADDRESS_ID FROM ICE_CONTACT WHERE ICE_CONTACT.MEMBER_ID = ?)", [temp_addr_contact, member_id], function (error, results, fields) {


    if (error) {
      //console.log(error);

      res.json({ "results": { "status": "404" } });
    }
    else {
      //console.log("Update contact address");
    }
  });

  const informationContact = fetchData_contact.informationContact;
  const contact_name_title_id = informationContact.contactPrefix;
  const contact_first_name = informationContact.contactFname;
  const contact_last_name = informationContact.contactLname;

  const phoneContact = fetchData_contact.phoneContact;
  const contact_phone_number = phoneContact.telNumber;
  const contact_mobile_phone_number = phoneContact.phoneNumber;
  const contact_fax_number = phoneContact.faxNumber;
  const contact_email = phoneContact.email;
  const contact_line_id = phoneContact.lineId;
  const contact_facebook_id = phoneContact.facebookId;


  let sql_temp_contact = {
    "ICE_CONTACT_FIRST_NAME": contact_first_name,
    "ICE_CONTACT_LAST_NAME": contact_last_name,
    "ICE_CONTACT_PHONE_NUMBER": contact_phone_number,
    "ICE_CONTACT_MOBILE_PHONE_NUMBER": contact_mobile_phone_number,
    "ICE_CONTACT_FAX_NUMBER": contact_fax_number,
    "ICE_CONTACT_EMAIL": contact_email,
    "ICE_CONTACT_LINE_ID": contact_line_id,
    "ICE_CONTACT_FACEBOOK_ID": contact_facebook_id,
    "NAME_TITLE_ID": contact_name_title_id
  }

  db.query("UPDATE `ICE_CONTACT` SET ? WHERE ICE_CONTACT.MEMBER_ID = ?", [sql_temp_contact, member_id], function (error, results, fields) {

    if (error) {
      //console.log(error);

      res.json({ "results": { "status": "404" } });
    }
    else {
      // console.log("Update ICE_CONTACT Success");
      res.json({ "results": { "status": "200" } });
      // res.json({"status":"200"});
    }
  });
});


///////////////// insert_residence ///////////////
app.post('/insert_residence', (req, res) => {
  let fetch_data_residence = req.body.residence
  let temp_residence = {
    "MEMBER_HAS_RESIDENCE_DETAIL": fetch_data_residence.member_has_residence_detail,
    "MEMBER_ID": fetch_data_residence.residence_member_id,
    "RESIDENCE_ID": fetch_data_residence.residence_id
  };
  let temp_residence_on_duplicate = {
    "MEMBER_HAS_RESIDENCE_DETAIL": fetch_data_residence.member_has_residence_detail,
    "RESIDENCE_ID": fetch_data_residence.residence_id
  };
  db.query('INSERT INTO MEMBER_HAS_RESIDENCE SET ? ON DUPLICATE KEY UPDATE ?', [temp_residence, temp_residence_on_duplicate], function (error, results, fields) {
    if (error) {
      console.log(error);

      res.json({ "results": { "status": "404" } });
    }
    else {
      res.json({ "results": { "status": "200" } });
    }
  });
});

//////////////get_residence///////////////////
app.get('/get_residence', (req, res) => {

  db.query('SELECT * FROM `RESIDENCE`', function (error, results, fields) {

    if (error) {

      res.json({ "results": { "status": "404" } });
    }
    else {
      res.json({ "results": { "status": 200, "data": results } });
      // res.json({"status":200,"data":results})
    }
  });
});



///////////////// insert_disability ///////////////
app.post('/insert_disability', (req, res) => {
  let fetch_data_has_disability = req.body.disability;

  for (let index = 0; index < fetch_data_has_disability.length; index++) {
    let temp_has_disability = {
      "MEMBER_HAS_DISABILITY_LEVEL": fetch_data_has_disability[index].member_has_disability_level,
      "MEMBER_HAS_DISABILITY_DETAIL": fetch_data_has_disability[index].member_has_disability_detail,
      "MEMBER_ID": fetch_data_has_disability[index].member_id,
      "DISABILITY_ID": fetch_data_has_disability[index].disability_id
    };
    console.log(fetch_data_has_disability[index].member_id);
    db.query('INSERT INTO MEMBER_HAS_DISABILITY SET ? ', temp_has_disability, function (error, results, fields) {
      if (error) {
        console.log(error);

        res.json({ "results": { "status": "404" } });
      }
    });

  }
  res.json({ "results": { "status": "200" } });

});

////////////////// update_disability ////////////////////////////
app.post('/update_disability', (req, res) => {
  let fetch_data_has_disability = req.body.disability;
  let fetch_data_remove_disability = req.body.remove_disability;

  for (let index = 0; index < fetch_data_has_disability.length; index++) {
    let temp_has_disability = {
      "MEMBER_HAS_DISABILITY_ID": fetch_data_has_disability[index].member_has_disability_id,
      "MEMBER_HAS_DISABILITY_LEVEL": fetch_data_has_disability[index].member_has_disability_level,
      "MEMBER_HAS_DISABILITY_DETAIL": fetch_data_has_disability[index].member_has_disability_detail,
      "MEMBER_ID": fetch_data_has_disability[index].member_id,
      "DISABILITY_ID": fetch_data_has_disability[index].disability_id
    };
    let temp_has_disability_on_duplicate = {

      "MEMBER_HAS_DISABILITY_LEVEL": fetch_data_has_disability[index].member_has_disability_level,
      "MEMBER_HAS_DISABILITY_DETAIL": fetch_data_has_disability[index].member_has_disability_detail,
      "DISABILITY_ID": fetch_data_has_disability[index].disability_id
    };
    console.log(fetch_data_has_disability[index].member_id);
    db.query('INSERT INTO MEMBER_HAS_DISABILITY SET ?  ON DUPLICATE KEY UPDATE ?', [temp_has_disability, temp_has_disability_on_duplicate], function (error, results, fields) {
      if (error) {
        console.log(error);

        res.json({ "results": { "status": "404" } });
      }
    });

  }
  // console.log(fetch_data_remove_disability.length);

  for (let index2 = 0; index2 < fetch_data_remove_disability.length; index2++) {

    // console.log(fetch_data_remove_disability[index2]);
    db.query('DELETE FROM `MEMBER_HAS_DISABILITY` WHERE MEMBER_HAS_DISABILITY.MEMBER_HAS_DISABILITY_ID = ? ', fetch_data_remove_disability[index2], function (error, results, fields) {
      if (error) {
        res.json({ "results": { "status": "404" } });
      }
    });

  }
  res.json({ "results": { "status": "200" } });
});

//////////////get_disability///////////////////
app.post('/get_disability', (req, res) => {
  let member_id = req.body.member_id;
  db.query('SELECT MEMBER_HAS_DISABILITY.*,DISABILITY.DISABILITY_TYPE_ID FROM MEMBER_HAS_DISABILITY,DISABILITY WHERE MEMBER_HAS_DISABILITY.DISABILITY_ID = DISABILITY.DISABILITY_ID AND MEMBER_HAS_DISABILITY.MEMBER_ID = ? ', member_id, function (error, results, fields) {

    if (error) {

      res.json({ "results": { "status": "404" } });
    }
    else {
      let temp_data = results.length;
      if (temp_data >= 1) {
        res.json({ "results": { "status": 200, "data": results } });
        // res.json({"status":200,"data":results})
      }
      else {

        res.json({ "results": { "status": "204" } });
      }


    }
  });
});


