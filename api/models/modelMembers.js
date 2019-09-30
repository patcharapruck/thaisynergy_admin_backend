'user strict';
// var sql = require('./db.js');
const db = require('../../connect');

//Task object constructor
var member = function (task) {

};

member.checkIdCard = async function (idcard, result) {
  
  db.query('SELECT IF(COUNT(MEMBER.MEMBER_ID)>=1,false,true) AS STATUS_IDCARD FROM MEMBER WHERE MEMBER.MEMBER_IDENTIFICATION_NUMBER = ?', idcard, function (error, results, fields) {
  
    if (error) {
      result(null,{ "status": 404 });
    }
    else {
      result(null,{ "status": 200, "data": results[0] });
    }
  });
}

member.getMemberByUserId = function (user_id, result) {
  let sql = 'SELECT MEMBER.MEMBER_ID,CONVERT(MEMBER.MEMBER_IDENTIFICATION_NUMBER,char(255)) AS ID_CARD,CONCAT((SELECT NAME_TITLE.NAME_TITLE_NAME FROM NAME_TITLE WHERE NAME_TITLE.NAME_TITLE_ID = MEMBER.NAME_TITLE_ID),MEMBER.MEMBER_FIRST_NAME," ",MEMBER.MEMBER_LAST_NAME) AS NAME_MEMBER, DATE_FORMAT(MEMBER.MEMBER_BIRTH_DATE, "%d/%m/%Y") AS MEMBER_BIRTH_DATE FROM MEMBER  WHERE MEMBER.USER_ID = '+user_id;
  // console.log(user_id);
  if (user_id==0) {
    sql='SELECT MEMBER.MEMBER_ID,CONVERT(MEMBER.MEMBER_IDENTIFICATION_NUMBER,char(255)) AS ID_CARD,CONCAT((SELECT NAME_TITLE.NAME_TITLE_NAME FROM NAME_TITLE WHERE NAME_TITLE.NAME_TITLE_ID = MEMBER.NAME_TITLE_ID),MEMBER.MEMBER_FIRST_NAME," ",MEMBER.MEMBER_LAST_NAME) AS NAME_MEMBER,  DATE_FORMAT(MEMBER.MEMBER_BIRTH_DATE, "%d/%m/%Y") AS MEMBER_BIRTH_DATE FROM MEMBER';
  }  
  db.query(sql, function (error, results, fields) {
      //console.log(results);

      result(null, { "status": "200", "data": results });
  });
}

member.getMemberInfoById = async function (member_id, result) {
  
  db.query('SELECT MEMBER.MEMBER_ID,MEMBER.MEMBER_IDENTIFICATION_NUMBER,CONCAT(MEMBER.MEMBER_FIRST_NAME," ",MEMBER.MEMBER_LAST_NAME) AS FULLNAME, CONVERT(MEMBER.MEMBER_BIRTH_DATE,char(255)) as MEMBER_BIRTH_DATE ,MEMBER.MEMBER_IMAGE FROM MEMBER WHERE MEMBER.MEMBER_ID = ?', member_id, function (error, results, fields) {
      //console.log(results);

      result(null, { "status": "200", "data": results });
  });

}

member.getMemberById = async function (member_id, result) {
    let member_info = await get_data_member(member_id);
    let addr_permanent = await get_data_addr_permanent(member_id);
    let addr_current = await get_data_addr_current(member_id);
    let ice_contact = await get_data_ice_contact(member_id);
    let addr_addr_permanent = await get_data_addr_ice_contact(member_id);
    result(null, { "status": "200", "data": { "member_info": member_info, "permanent_address": addr_permanent, "current_address": addr_current, "ice_contact": ice_contact, "ice_contact_address": addr_addr_permanent } });

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

        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            // console.log('tasks : ', res);

            result(null, { "status": "200", "data": res });
        }
    });
};


member.createMember = function (memberData, result) {
    const user_id = memberData.user_id;
    const fetchData_member = memberData.member;
    const permanentAddressMember = fetchData_member.permanentAddressMember;
    const permanent_address_house_number = permanentAddressMember.houseNumber;
    const permanent_address_village_number = permanentAddressMember.villageNumber;
    const permanent_address_lane = permanentAddressMember.alley;
    const permanent_address_street = permanentAddressMember.road;
    const permanent_address_locality = permanentAddressMember.houseNumber;
    const permanent_address_postal_code = permanentAddressMember.postCode;
    const permanent_subdistrict_id = permanentAddressMember.subDistrict;
    const permanent_address_status_id = 1;

    const currentAddressMember = fetchData_member.currentAddressMember;
    const current_address_house_number = currentAddressMember.houseNumber;
    const current_address_village_number = currentAddressMember.villageNumber;
    const current_address_lane = currentAddressMember.alley;
    const current_address_street = currentAddressMember.road;
    const current_address_locality = currentAddressMember.houseNumber;
    const current_address_postal_code = currentAddressMember.postCode;
    const current_address_latitude = currentAddressMember.latitude;;
    const current_address_longitude = currentAddressMember.longitude;;
    const current_subdistrict_id = currentAddressMember.subDistrict;
    const current_address_status_id = 2;

    ////////// informationMember ///////////
    const personalData = fetchData_member.informationMember;
    const idcard = personalData.idcard;
    const firstname = personalData.fname;
    const lastname = personalData.lname;
    const image = personalData.image;

    const old_image = personalData.imageOld;
    if (old_image != null) {
        // console.log("old_image : " + old_image);

    }

    const birthday_data = personalData.birthDate;
    let birthday = null;
    if (birthday_data != '') {
        birthday = birthday_data;
    }

    const issuedate_data = personalData.issueDate;

    let issuedate = null;
    if (issuedate_data != '') {
        issuedate = issuedate_data;
    }

    const expiry_data = personalData.expiredDate;

    let expiry = null;
    if (expiry_data != '') {
        expiry = expiry_data;
    }

    const issueby = personalData.issueBy;
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
    const line = phoneContactMember.lineId;
    const facebook = phoneContactMember.facebookId;

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

    /////////////////////contact addr/////////////////////////////
    const fetchData_contact = memberData.contact;
    const contactAddress = fetchData_contact.contactAddress;
    const contact_address_house_number = contactAddress.houseNumber;
    const contact_address_village_number = contactAddress.villageNumber;
    const contact_address_lane = contactAddress.alley;
    const contact_address_street = contactAddress.road;
    const contact_address_locality = contactAddress.locality;
    const contact_address_postal_code = contactAddress.postCode;
    const contact_subdistrict_id = contactAddress.subDistrict;

    /////////////////////informationContact/////////////////////////////
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
            result(null, { "status": "404", "massage": 'Cannot Insert permanent address' });
        }
    });

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

    db.query("INSERT INTO ADDRESS SET ?", temp_cur_addr, function (error, results, fields) {
        if (error) {
            result(null, { "status": "404" });
        }
    });


    db.query("INSERT INTO `MEMBER`(`MEMBER_ID`, `MEMBER_IDENTIFICATION_NUMBER`, `MEMBER_FIRST_NAME`, `MEMBER_LAST_NAME`, `MEMBER_IMAGE`, `MEMBER_BIRTH_DATE`, `MEMBER_ISSUE_BY`, `MEMBER_ISSUE_DATE`, `MEMBER_EXPIRY_DATE`, `MEMBER_PHONE_NUMBER`, `MEMBER_MOBILE_PHONE_NUMBER`, `MEMBER_FAX_NUMBER`, `MEMBER_EMAIL`, `MEMBER_LINE_ID`, `MEMBER_FACEBOOK_ID`, `MEMBER_WEIGHT`, `MEMBER_HEIGHT`, `MEMBER_WAISTLINE`, `MEMBER_BMI`, `MEMBER_SYSTOLIC_BLOOD_PRESSURE`, `MEMBER_DIASTOLIC_BLOOD_PRESSURE`, `MEMBER_FASTING_BLOOD_SUGAR`, `MEMBER_DISABLED_CARD`, `MEMBER_CREATED_DATE`, `MEMBER_LAST_EDITED_DATE`, `NAME_TITLE_ID`, `BIRTHPLACE_PROVINCE_ID`, `PERMANENT_ADDRESS_ID`, `CURRENT_ADDRESS_ID`, `NATIONALITY_ID`, `ETHNICITY_ID`, `RELIGION_ID`, `MEMBER_STATUS_ID`, `USER_ID`) VALUES( UNIX_TIMESTAMP()*1000 ,?,?,?,?,?,?,?,?,?,?, ?, ?, ?, ?, ?,?, ?, ?, ?,?,?, ?,NOW(),NOW(), ?, ?, LAST_INSERT_ID()-1, LAST_INSERT_ID(),?,?,?,?,?)", [idcard, firstname, lastname, image, birthday, issueby, issuedate, expiry, phonenumber, mobilephonenumber, faxnumber, email, line, facebook, weight, height, waistline, bmi, systolic_blood, diastolic_blood, fasting_sugar, disabled_card, title_id, province, nationality, ethnicity, religion, status_id, user_id], function (error, results, fields) {
        if (error) {
            result(null, { "status": "404", error });
        }
    });


    /////////////////////contact addr/////////////////////////////
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
            result(null, { "status": "404" });
        }
    });


    /////////////////////informationContact/////////////////////////////
    db.query("INSERT INTO ICE_CONTACT(ICE_CONTACT_FIRST_NAME, ICE_CONTACT_LAST_NAME, ICE_CONTACT_PHONE_NUMBER, ICE_CONTACT_MOBILE_PHONE_NUMBER, ICE_CONTACT_FAX_NUMBER, ICE_CONTACT_EMAIL, ICE_CONTACT_LINE_ID, ICE_CONTACT_FACEBOOK_ID, NAME_TITLE_ID, ADDRESS_ID, MEMBER_ID) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ? , LAST_INSERT_ID(), (SELECT MAX(MEMBER.MEMBER_ID) FROM MEMBER))", [contact_first_name, contact_last_name, contact_phone_number, contact_mobile_phone_number, contact_fax_number, contact_email, contact_line_id, contact_facebook_id, contact_name_title_id], function (error, results, fields) {

        if (error) {
            result(null, { "status": "404" });
        }
    });

    db.query("SELECT MAX(MEMBER.MEMBER_ID) AS ID FROM MEMBER", function (error, results, fields) {

        if (error) {
            result(null, { "status": "404" });
        }
        else {
            let data = results[0];
            result(null, { "status": "200", data });
        }
    });
};

member.updateMember = function (memberData, result) {

  const fetchData_member = memberData[0].member;
  const member_id = memberData[1].member_id;
 
  ////////// informationMember ///////////
  const personalData = fetchData_member.informationMember;
  if (personalData.imageOld) {
    // console.log("IMAGE OLD : "+personalData.imageOld);
    fs.unlinkSync(personalData.imageOld)
  }

  const idcard = personalData.idcard;
  const firstname = personalData.fname;
  const lastname = personalData.lname;
  const image = personalData.image;
  const birthday_data = personalData.birthDate;
  let birthday = null;
  if (birthday_data != '') {
    birthday = birthday_data;
  }
  const issueby = personalData.issueBy;
  const issuedate_data = personalData.issueDate;
  let issuedate = null;
  if (issuedate_data != '') {
    issuedate = issuedate_data;
  }
  const expiry_data = personalData.expiredDate;

  let expiry = null;
  if (expiry_data != "") {
    expiry = expiry_data;
  }
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
  const line = phoneContactMember.lineId;
  const facebook = phoneContactMember.facebookId;

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

  db.query("UPDATE `MEMBER` SET `MEMBER_IDENTIFICATION_NUMBER`=?,`MEMBER_FIRST_NAME`=?,`MEMBER_LAST_NAME`=?,`MEMBER_IMAGE`=?,`MEMBER_BIRTH_DATE`=?,`MEMBER_ISSUE_BY`=?,`MEMBER_ISSUE_DATE`=?,`MEMBER_EXPIRY_DATE`=?,`MEMBER_PHONE_NUMBER`=?,`MEMBER_MOBILE_PHONE_NUMBER`=?,`MEMBER_FAX_NUMBER`=?,`MEMBER_EMAIL`=?,`MEMBER_LINE_ID`=?,`MEMBER_FACEBOOK_ID`=?,`MEMBER_WEIGHT`=?,`MEMBER_HEIGHT`=?,`MEMBER_WAISTLINE`=?,`MEMBER_BMI`=?,`MEMBER_SYSTOLIC_BLOOD_PRESSURE`=?,`MEMBER_DIASTOLIC_BLOOD_PRESSURE`=?,`MEMBER_FASTING_BLOOD_SUGAR`=?,`MEMBER_DISABLED_CARD`=?,`MEMBER_LAST_EDITED_DATE`=NOW(),`NAME_TITLE_ID`=?,`BIRTHPLACE_PROVINCE_ID`=?,`NATIONALITY_ID`=?,`ETHNICITY_ID`=?,`RELIGION_ID`=?,`MEMBER_STATUS_ID`=? WHERE MEMBER.MEMBER_ID = ?", [idcard, firstname, lastname, image, birthday, issueby, issuedate, expiry, phonenumber, mobilephonenumber, faxnumber, email, line, facebook, weight, height, waistline, bmi, systolic_blood, diastolic_blood, fasting_sugar, disabled_card, title_id, province, nationality, ethnicity, religion, status_id, member_id], function (error, results, fields) {
    if (error) {
      result(null,{ "status": "404" } );
    }
  });


  //////////// UPDATE ADDRESS //////////////
  //////////// PERMANENT ADDRESS //////////////
  const permanentAddressMember = fetchData_member.permanentAddressMember;
  const permanent_address_house_number = permanentAddressMember.houseNumber;
  const permanent_address_village_number = permanentAddressMember.villageNumber;
  const permanent_address_lane = permanentAddressMember.alley;
  const permanent_address_street = permanentAddressMember.road;
  const permanent_address_locality = permanentAddressMember.locality;
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

  db.query("UPDATE `ADDRESS` SET ? WHERE ADDRESS.ADDRESS_ID = (SELECT MEMBER.PERMANENT_ADDRESS_ID FROM MEMBER WHERE MEMBER.MEMBER_ID = ? ) ", [temp_per_addr, member_id], async function (error, results, fields) {
    if (error) {
      // console.log(error);

      result(null,{ "status": "404" });
    }
  });

  //////////// CURRENT ADDRESS //////////////
  const currentAddressMember = fetchData_member.currentAddressMember;
  const current_address_house_number = currentAddressMember.houseNumber;
  const current_address_village_number = currentAddressMember.villageNumber;
  const current_address_lane = currentAddressMember.alley;
  const current_address_street = currentAddressMember.road;
  const current_address_locality = currentAddressMember.locality;
  const current_address_postal_code = currentAddressMember.postCode;
  const current_address_latitude = currentAddressMember.latitude;
  const current_address_longitude = currentAddressMember.longitude;
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

  db.query("UPDATE `ADDRESS` SET ? WHERE ADDRESS.ADDRESS_ID = (SELECT MEMBER.CURRENT_ADDRESS_ID FROM MEMBER WHERE MEMBER.MEMBER_ID = ? ) ", [temp_cur_addr, member_id], async function (error, results, fields) {

    if (error) {
      result(null,{ "status": "404" });
    }
  });


  /////////////// CONTACT ////////////////////
  const fetchData_contact = memberData[0].contact;
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
      result(null, { "status": "404" });
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
      result(null, { "status": "404" });
    }
    else {
      result(null, { "status": "200" });
    }
  });

};

member.removeMember = async function (member_id, result) {

  db.query("DELETE FROM `ADDRESS` WHERE ADDRESS.ADDRESS_ID = (SELECT MEMBER.PERMANENT_ADDRESS_ID FROM MEMBER WHERE MEMBER.MEMBER_ID = ? )",member_id, function (error, results, fields) {
    if (error) {
      result(null, { "status": "404" } );
    }
  });

  db.query("DELETE FROM `ADDRESS` WHERE ADDRESS.ADDRESS_ID = (SELECT MEMBER.CURRENT_ADDRESS_ID FROM MEMBER WHERE MEMBER.MEMBER_ID = ? )",member_id, function (error, results, fields) {
    if (error) {
      result(null, { "status": "404" } );
    }
  });

  db.query("DELETE FROM `EQUIPMENT` WHERE EQUIPMENT.MEMBER_ID =" + member_id + "", function (error, results, fields) {
    if (error) {
      result(null, { "status": "404" } );
    }
  });

  db.query("DELETE FROM `CARETAKER` WHERE CARETAKER.MEMBER_ID =" + member_id + "", function (error, results, fields) {
    if (error) {
      result(null, { "status": "404" } );
    }
  });

  db.query("DELETE FROM `MEDICAL_CARE` WHERE MEDICAL_CARE.MEMBER_ID=" + member_id + "", function (error, results, fields) {
    if (error) {
      result(null, { "status": "404" } );
    }
  });

  db.query("DELETE FROM MEMBER_HAS_DISABILITY WHERE MEMBER_HAS_DISABILITY.MEMBER_ID = ? ", member_id, function (error, results, fields) {
    if (error) {
      result(null, { "status": "404" } );
    }
  });

  db.query("DELETE FROM MEMBER_HAS_RESIDENCE WHERE MEMBER_HAS_RESIDENCE.MEMBER_ID= ? ", member_id, function (error, results, fields) {
    if (error) {
      result(null, { "status": "404" } );
    }
  });

  db.query("DELETE FROM ADDRESS WHERE ADDRESS.ADDRESS_ID = (SELECT MEMBER.PERMANENT_ADDRESS_ID FROM MEMBER WHERE MEMBER.MEMBER_ID = " + member_id + ")", function (error, results, fields) {

    if (error) {
      result(null, { "status": "404" } );
    }
  });

  db.query("DELETE FROM ADDRESS WHERE ADDRESS.ADDRESS_ID = (SELECT MEMBER.CURRENT_ADDRESS_ID FROM MEMBER WHERE MEMBER.MEMBER_ID = " + member_id + ")", function (error, results, fields) {
    if (error) {
      result(null, { "status": "404" } );
    }
  });

  db.query("DELETE FROM `MEMBER` WHERE MEMBER.MEMBER_ID=" + member_id, function (error, results, fields) {
    if (error) {
      result(null,{ "status": "404" });
    }
    else {
      //console.log("DELETE MEMBER");
      result(null,{ "status": "200" });
    }
  });
}

member.createRightInfomation = function (rightInformationData, result) {

  let member_id = rightInformationData.member_id;
  ////////////////equipment//////////////////
  let fetchdata_equipment = rightInformationData.equipment;
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
      // console.log(error);

      result(null, { "status": "404" });
    }
  });

  ////////////////medical_care//////////////////

  let fetchdata_medical_care = rightInformationData.medical_care;
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
        result(null,{ "status": "404" });
    }
  });

  //////////////CARETAKER/////////////////
  let fetchdata_caretaker_requirement = rightInformationData.caretaker;
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
        result(null,{ "status": "404" });
    }
  });

  db.query("SELECT CARETAKER.CARETAKER_ID as id FROM `CARETAKER` WHERE CARETAKER.MEMBER_ID = ?", member_id, function (error, results, fields) {
    if (error) {
        result(null,{ "status": "404" });
    }
    else {
        result(null,{ "status": "200", "data": { "ID": results[0].id } } );
    }
  });

}

member.getRightInfomation = async function (member_id, result) {
  let equipment = await get_rights_information_equipment(member_id);
  let medical_care = await get_rights_information_medical_care(member_id);
  let caretaker = await get_rights_information_caretaker(member_id);

  result(null, { "status": "200", "data": { "equipment": equipment, "medical_care": medical_care, "caretaker": caretaker } });

}

async function get_rights_information_equipment(id) {
  return new Promise(resolve => {
    setTimeout(() => {
      db.query('SELECT * FROM `EQUIPMENT` WHERE EQUIPMENT.MEMBER_ID = ?', id, function (error, results, fields) {
        resolve(results[0]);
      });
    }, 250);
  });
}

async function get_rights_information_medical_care(id) {
  return new Promise(resolve => {
    setTimeout(() => {
      db.query('SELECT * FROM `MEDICAL_CARE` WHERE MEDICAL_CARE.MEMBER_ID = ?', id, function (error, results, fields) {
        resolve(results[0]);
      });
    }, 250);
  });
}

async function get_rights_information_caretaker(id) {
  return new Promise(resolve => {
    setTimeout(() => {
      db.query('SELECT * FROM `CARETAKER` WHERE CARETAKER.MEMBER_ID = ?', id, function (error, results, fields) {
        resolve(results[0]);
      });
    }, 250);
  });
}

module.exports = member;