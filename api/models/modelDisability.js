const db = require('../../connect');

var disability = function (task) {

};

disability.createDisability = function (fetch_data,result) {
    
    let fetch_data_has_disability = fetch_data.disability;
  let member_id = fetch_data.member_id;


  for (let index = 0; index < fetch_data_has_disability.length; index++) {
    if (fetch_data_has_disability[index].checked == 1) {
      let temp_has_disability = {
        "MEMBER_HAS_DISABILITY_ID": fetch_data_has_disability[index].member_has_disability_id,
        "MEMBER_HAS_DISABILITY_LEVEL": fetch_data_has_disability[index].member_has_disability_level,
        "MEMBER_HAS_DISABILITY_DETAIL": fetch_data_has_disability[index].member_has_disability_detail,
        "MEMBER_ID": member_id,
        "DISABILITY_ID": fetch_data_has_disability[index].disability_id
      };
      let temp_has_disability_on_duplicate = {

        "MEMBER_HAS_DISABILITY_LEVEL": fetch_data_has_disability[index].member_has_disability_level,
        "MEMBER_HAS_DISABILITY_DETAIL": fetch_data_has_disability[index].member_has_disability_detail,
        "DISABILITY_ID": fetch_data_has_disability[index].disability_id
      };
      db.query('INSERT INTO MEMBER_HAS_DISABILITY SET ?  ON DUPLICATE KEY UPDATE ?', [temp_has_disability, temp_has_disability_on_duplicate], function (error, results, fields) {
        if (error) {
          result(null, { "status": "404" } );
        }
      });
    }
    else if (fetch_data_has_disability[index].checked == 0) {
      db.query('DELETE a FROM MEMBER_HAS_DISABILITY a LEFT JOIN DISABILITY b ON b.DISABILITY_ID = a.DISABILITY_ID WHERE b.DISABILITY_TYPE_ID = ? AND a.MEMBER_ID = ?', [(index + 1), member_id], function (error, results, fields) {
        if (error) {
          result(null, { "status": "404" } );
        }
      });
    }
  }

  db.query('SELECT DISABILITY.DISABILITY_TYPE_ID,MEMBER_HAS_DISABILITY.* FROM MEMBER_HAS_DISABILITY,DISABILITY WHERE MEMBER_HAS_DISABILITY.DISABILITY_ID = DISABILITY.DISABILITY_ID AND MEMBER_HAS_DISABILITY.MEMBER_ID = ? ', member_id, function (error, results, fields) {
    if (error) {
        result(null,  { "status": "404" } );
    }
    else {
      // console.log(results);

      result(null, { "status": "200", "data": results } );
    }
  });

  // }
};


disability.getDisabilityByMemberId = function (fetch_data,result) {
    
    let member_id = fetch_data.member_id;
    db.query('SELECT DISABILITY.DISABILITY_TYPE_ID,MEMBER_HAS_DISABILITY.* FROM MEMBER_HAS_DISABILITY,DISABILITY WHERE MEMBER_HAS_DISABILITY.DISABILITY_ID = DISABILITY.DISABILITY_ID AND MEMBER_HAS_DISABILITY.MEMBER_ID = ? ', member_id, function (error, results, fields) {
  
      if (error) {
  
        result(null, { "status": "404" } );
      }
      else {
        let temp_data = results.length;
        if (temp_data >= 1) {
          res.json({ "results": { "status": 200, "data": results } });
        }
        else {
            result(null,  { "status": "204" } );
        }
      }
    });
};


module.exports = disability;