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
 
 
// app.get('/', (req,res)=>{ 
//   res.end("welcome to root path"); 
// }); 
 
// app.get('/home', (req,res)=>{ 
//   res.end("welcome to home path"); 
// }); 
 
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
  
/////////// General Data ///////////////
app.get('/get_prefix', (req,res)=>{ 
  db.query('SELECT * FROM `NAME_TITLE`', function (error, results, fields) { 
    console.log(results);
    
    res.json({results}); 
  }); 
}); 

app.get('/get_province', (req,res)=>{ 
  db.query('SELECT * FROM `PROVINCE`', function (error, results, fields) { 
    console.log(results);
    
    res.json({results}); 
  }); 
}); 

app.post('/get_district', (req,res)=>{ 
  let id_province = req.body.id;
  db.query('SELECT * FROM `DISTRICT` WHERE `DISTRICT`.`PROVINCE_ID` ='+id_province, function (error, results, fields) { 
    console.log(results);
    
    res.json({results}); 
  }); 
});

app.post('/get_subdistrict', (req,res)=>{ 
  let id_district = req.body.id;
  db.query('SELECT * FROM `SUBDISTRICT` WHERE `SUBDISTRICT`.`DISTRICT_ID` ='+id_district, function (error, results, fields) { 
    console.log(results);
    
    res.json({results}); 
  }); 
});

app.get('/get_member_status', (req,res)=>{ 
  db.query('SELECT * FROM `MEMBER_STATUS`', function (error, results, fields) { 
    console.log(results);
    
    res.json({results}); 
  }); 
}); 

//สัญชาติ
app.get('/get_nationality', (req,res)=>{ 
  db.query('SELECT * FROM `NATIONALITY`', function (error, results, fields) { 
    console.log(results);
    
    res.json({results}); 
  }); 
}); 

//เชื้อชาติ
app.get('/get_ethnicity', (req,res)=>{ 
  db.query('SELECT * FROM `ETHNICITY`', function (error, results, fields) { 
    console.log(results);
    
    res.json({results}); 
  }); 
}); 
//ศาสนา
app.get('/get_religiion', (req,res)=>{ 
  db.query('SELECT * FROM `RELIGION`', function (error, results, fields) { 
    console.log(results);
    
    res.json({results}); 
  }); 
}); 

app.get('/get_member', (req,res)=>{ 
  db.query('SELECT MEMBER.MEMBER_ID,CONVERT(MEMBER.MEMBER_IDENTIFICATION_NUMBER,char(255)) AS ID_CARD,CONCAT((SELECT NAME_TITLE.NAME_TITLE_NAME FROM NAME_TITLE WHERE NAME_TITLE.NAME_TITLE_ID = MEMBER.NAME_TITLE_ID),MEMBER.MEMBER_FIRST_NAME," ",MEMBER.MEMBER_LAST_NAME) AS NAME_MEMBER, MEMBER.MEMBER_BIRTH_DATE FROM MEMBER', function (error, results, fields) { 
    console.log(results);
    
    res.json({results}); 
  }); 
}); 


/////////// insert member ///////////////
 app.post('/insert_member',async (req,res)=>{ 

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
      "ADDRESS_HOUSE_NUMBER":permanent_address_house_number,  
      "ADDRESS_VILLAGE_NUMBER":permanent_address_village_number,  
      "ADDRESS_LANE":permanent_address_lane,  
      "ADDRESS_STREET":permanent_address_street,  
      "ADDRESS_LOCALITY":permanent_address_locality,  
      "ADDRESS_POSTAL_CODE":permanent_address_postal_code,  
      "SUBDISTRICT_ID":permanent_subdistrict_id,  
      "ADDRESS_STATUS_ID":permanent_address_status_id};  
                                                                  
      let per_addr = 0; 
      db.query("INSERT INTO ADDRESS SET ?",temp_per_addr,async function (error, results, fields) { 
        console.log("Insert permanent address"); 
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
                                                                  
      var temp =0;
      db.query("INSERT INTO ADDRESS SET ?",temp_cur_addr, function (error, results, fields) { 
        console.log("Insert current address");
          }); 
      console.log(temp);



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
 

            db.query("INSERT INTO MEMBER(MEMBER_IDENTIFICATION_NUMBER, MEMBER_FIRST_NAME, MEMBER_LAST_NAME, MEMBER_IMAGE, MEMBER_BIRTH_DATE, MEMBER_ISSUE_BY, MEMBER_ISSUE_DATE, MEMBER_EXPIRY_DATE, MEMBER_PHONE_NUMBER, MEMBER_MOBILE_PHONE_NUMBER, MEMBER_FAX_NUMBER, MEMBER_EMAIL, MEMBER_LINE_ID, MEMBER_FACEBOOK_ID, MEMBER_WEIGHT, MEMBER_HEIGHT, MEMBER_WAISTLINE, MEMBER_BMI, MEMBER_SYSTOLIC_BLOOD_PRESSURE, MEMBER_DIASTOLIC_BLOOD_PRESSURE, MEMBER_FASTING_BLOOD_SUGAR, MEMBER_DISABLED_CARD, NAME_TITLE_ID, BIRTHPLACE_PROVINCE_ID, PERMANENT_ADDRESS_ID, CURRENT_ADDRESS_ID, NATIONALITY_ID, ETHNICITY_ID, RELIGION_ID, MEMBER_STATUS_ID) VALUES('"+idcard+"', '"+firstname+"', '"+lastname+"', '"+image+"', '"+birthday+"', '"+issueby+"', '"+issuedate+"', '"+expiry+"', '"+phonenumber+"', '"+mobilephonenumber+"', '"+faxnumber+"', '"+email+"', '"+line+"', '"+facebook+"', '"+weight+"', '"+height+"', '"+waistline+"', '"+bmi+"', '"+systolic_blood+"', '"+diastolic_blood+"', '"+fasting_sugar+"', '"+disabled_card+"', '"+title_id+"', '"+province+"', LAST_INSERT_ID()-1, LAST_INSERT_ID(), '"+nationality+"', '"+ethnicity+"', '"+religion+"', '"+status_id+"')", function (error, results, fields) { 

            if (error) { 
                console.log(error); 
            } 
            else {  
                console.log("Insert Member Success");
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
  
 
    let temp_addr_contact={ 
      "ADDRESS_HOUSE_NUMBER":contact_address_house_number,  
      "ADDRESS_VILLAGE_NUMBER":contact_address_village_number,  
      "ADDRESS_LANE":contact_address_lane,  
      "ADDRESS_STREET":contact_address_street,  
      "ADDRESS_LOCALITY":contact_address_locality,  
      "ADDRESS_POSTAL_CODE":contact_address_postal_code,  
      "SUBDISTRICT_ID":contact_subdistrict_id,  
      "ADDRESS_STATUS_ID":1}

      db.query("INSERT INTO ADDRESS SET ?",temp_addr_contact, function (error, results, fields) { 
        console.log("Insert contact address");
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
    


      let sql_temp_contact ="INSERT INTO ICE_CONTACT(ICE_CONTACT_FIRST_NAME, ICE_CONTACT_LAST_NAME, ICE_CONTACT_PHONE_NUMBER, ICE_CONTACT_MOBILE_PHONE_NUMBER, ICE_CONTACT_FAX_NUMBER, ICE_CONTACT_EMAIL, ICE_CONTACT_LINE_ID, ICE_CONTACT_FACEBOOK_ID, NAME_TITLE_ID, ADDRESS_ID, MEMBER_ID) VALUES('"+contact_first_name+"', '"+contact_last_name+"', '"+contact_phone_number+"', '"+contact_mobile_phone_number+"', '"+contact_fax_number+"', '"+contact_email+"', '"+contact_line_id+"', '"+contact_facebook_id+"', '"+contact_name_title_id+"', LAST_INSERT_ID(), (SELECT MAX(MEMBER.MEMBER_ID) FROM MEMBER));"


      db.query(sql_temp_contact, function (error, results, fields) { 
       
        if (error) { 
          console.log(error); 
          res.json({"status":"404","massage":'Cannot Insert'}); 
      } 
      else {  
          console.log("Insert ICE_CONTACT Success");

          res.json({"status":"200"}); 
      } 
      });
}); 
