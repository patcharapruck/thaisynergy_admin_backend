const db = require('../../connect');

var users = function (task) {

};

users.createUser = async function (userData, result) {

    console.log(userData);
    
    let fetch_login = userData.login;

    let username = fetch_login.username;
    let password = fetch_login.password;

    let fetch_user = userData.user;
    let department_id = fetch_user.department_id;
    let idcard = fetch_user.user_identification_number;
    let user_first_name = fetch_user.user_first_name;
    let user_last_name = fetch_user.user_last_name;
    let user_image = fetch_user.user_image;
    let user_email = fetch_user.user_email;
    let user_line_id = fetch_user.user_line_id;
    let user_facebook_id = fetch_user.user_facebook_id;
    let name_title_id = fetch_user.name_title_id;
    let subdistrict_id = fetch_user.subdistrict_id;
    // let department_id = fetch_user.department_id;
    let user_type_id = fetch_user.user_type_id;

    //   console.log();

    // result(null, { "status": "200", "data": userData });

    db.query("INSERT INTO `LOGIN`(`LOGIN_USERNAME`, `LOGIN_PASSWORD`) VALUES ((SELECT CONCAT(DEPARTMENT.DEPARTMENT_PREFIX_USERNAME,?) as uname FROM DEPARTMENT WHERE DEPARTMENT.DEPARTMENT_ID = ?),ENCODE((SELECT CONCAT(DEPARTMENT.DEPARTMENT_PREFIX_USERNAME,?) as uname FROM DEPARTMENT WHERE DEPARTMENT.DEPARTMENT_ID = ?),?))", [username,department_id, username, department_id, password], function (error, results, fields) {
        if (error) {
            console.log(error);

            result(null, { "status": "400" });
        }
    });


    db.query("INSERT INTO `USER`(`USER_ID`,`USER_IDENTIFICATION_NUMBER`, `USER_FIRST_NAME`, `USER_LAST_NAME`, `USER_IMAGE`, `USER_EMAIL`, `USER_LINE_ID`, `USER_FACEBOOK_ID`, `NAME_TITLE_ID`, `SUBDISTRICT_ID`, `DEPARTMENT_ID`, `LOGIN_ID`, `USER_TYPE_ID` ,`USER_STATUS`) VALUES (UNIX_TIMESTAMP()*1000,?,?,?,?,?,?,?,?,?,?,LAST_INSERT_ID(),?,1)", [idcard, user_first_name, user_last_name, user_image, user_email, user_line_id, user_facebook_id, name_title_id, subdistrict_id, department_id, user_type_id], function (error, results, fields) {
        if (error) {
            console.log(error);
            result(null, { "status": "404" });
        }
        else {
            // res.json({ "results": { "status": "200","data":{"username":username,"password":password} } });
        }
    });


    db.query("SELECT LOGIN.LOGIN_USERNAME FROM `LOGIN` WHERE LOGIN.LOGIN_ID = LAST_INSERT_ID()", function (error, results, fields) {
        if (error) {
            result(null, { "status": "404" });
        }
        else {
            result(null, { "status": "200", "data": { "username": results[0].LOGIN_USERNAME, "password": password } });
        }
    });
}

users.updateUser = async function (userData, result) {
    let login_id = userData.login_id;
    let user = userData.user;
    let temp_data = {
        "USER_IDENTIFICATION_NUMBER": user.user_identification_number,
        "USER_FIRST_NAME": user.user_first_name,
        "USER_LAST_NAME": user.user_last_name,
        "USER_IMAGE": user.user_image,
        "USER_EMAIL": user.user_email,
        "USER_LINE_ID": user.user_line_id,
        "USER_FACEBOOK_ID": user.user_facebook_id,
        "NAME_TITLE_ID": user.name_title_id,
        "SUBDISTRICT_ID": user.subdistrict_id,
        "DEPARTMENT_ID": user.department_id
    }

    db.query("UPDATE `USER` SET ? WHERE `USER`.`LOGIN_ID` = ? ", [temp_data, login_id], function (error, results, fields) {
        if (error) {
            console.log(error);

            result(null, { "status": "400" });
        }
        else {
            result(null, { "status": "200" });
        }
    });
}

users.checkUserEmail = async function (emailData, result) {
    let user_email = emailData.email;
    db.query('SELECT IF(COUNT(USER.USER_ID)>=1,false,true) as email_status FROM `USER` WHERE `USER`.`USER_EMAIL` = ? ', user_email, function (error, results, fields) {
        //console.log(results);

        result(null, { "status": "200", "data": results });
    });

}

users.userList = async function (userData, result) {
    let user_type = userData.user_type;
    let data_temp = "SELECT * FROM `USER` ";
    if (user_type==2) {
      data_temp += "WHERE USER.USER_TYPE_ID = 2";
    }
    console.log(data_temp);
    
    db.query( data_temp, function (error, results, fields) {
        //console.log(results);

        result(null, { "status": "200", "data": results });
    });

}

module.exports = users;