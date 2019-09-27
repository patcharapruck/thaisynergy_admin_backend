const db = require('../../connect');
const jwt = require('jsonwebtoken');

var login = function (task) {

};

login.checkToken = async function (loginData, result) {
  // console.log(loginData);
  // let fetch_data = loginData.login;
  let username = loginData.username;
  let password = loginData.password;
  var token = jwt.sign({ loginData },'secretkey');
  console.log(token);
  result(null,{ "status": "200", "data":  token  } );
};

login.checkLogin = async function (loginData, result) {
  // console.log(loginData);
  
  // let fetch_data = loginData.login;
  let username = loginData.username;
  let password = loginData.password;

  // var token = jwt.sign({ loginData }, privateKey, { algorithm: 'RS256' });
  // console.log(token);
  

  db.query("SELECT LOGIN.LOGIN_ID,COUNT(LOGIN.LOGIN_ID) as count_user,(SELECT CONCAT(USER.USER_FIRST_NAME,' ',USER.USER_LAST_NAME) as fullname FROM `USER` WHERE USER.LOGIN_ID = LOGIN.LOGIN_ID ) as fullname,(SELECT USER.USER_ID FROM USER WHERE USER.LOGIN_ID=LOGIN.LOGIN_ID) as user_id,(SELECT USER.USER_IMAGE FROM USER WHERE USER.LOGIN_ID=LOGIN.LOGIN_ID) as user_image FROM LOGIN,USER WHERE LOGIN.LOGIN_USERNAME = ? AND LOGIN.LOGIN_PASSWORD = ENCODE(?,?) AND LOGIN.LOGIN_ID = USER.LOGIN_ID AND USER.USER_STATUS = 1", [username, username, password], function (error, results, fields) {
    if (error) {
      console.log(error);
      result(null, { "status": "404"});
    }
    else {
      if ( results[0].count_user >=1 ) {
        var token = jwt.sign({ "username":loginData.username },'secretkey');        
        result(null,{ "status": "200", "data":{"login_id":results[0].LOGIN_ID,"count_user":results[0].count_user ,"fullname":results[0].fullname ,"user_id":results[0].user_id ,"user_image":results[0].user_image ,"token":token }  } );
      }
      else {
        result(null,{ "status": "204", "data": "Username Or Password Not found" } );
      }
    }
  });
}

module.exports = login;