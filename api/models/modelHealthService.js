const db = require('../../connect');

var healthservice = function (task) {

};

healthservice.createHealthScreening = function (fetch_data, result) {
    let member_id = fetch_data.member_id;
    let health_screening_adl_evaluation_id = fetch_data.health_screening_adl_evaluation_id;
    let health_screening_has_choice = fetch_data.health_screening_has_choice;
    let id_health_screening_adl_evaluation = health_screening_adl_evaluation_id;

    if (health_screening_adl_evaluation_id == null && member_id == null) {
        result(null, { "status": "404", "massage": "member_id and id_health_screening_adl_evaluation not found" });
    }
    else {
        if (health_screening_adl_evaluation_id == null) {
            id_health_screening_adl_evaluation = await insert_health_screening(member_id);
        }
        for (let index = 0; index < health_screening_has_choice.length; index++) {

            let temp_data = {
                "HEALTH_SCREENING_HAS_CHOICE_ID": health_screening_has_choice[index].health_screening_has_choice_id,
                "HEALTH_SCREENING_HAS_CHOICE_DETAIL": health_screening_has_choice[index].health_screening_has_choice_detail,
                "HEALTH_SCREENING_HAS_CHOICE_CORRECT": health_screening_has_choice[index].health_screening_has_choice_correct,
                "HEALTH_SCREENING_AND_ADL_EVALUATION_ID": id_health_screening_adl_evaluation,
                "HEALTH_SCREENING_CHOICE_ID": health_screening_has_choice[index].health_screening_choice_id
            }
            let temp_data_on = {
                "HEALTH_SCREENING_HAS_CHOICE_DETAIL": health_screening_has_choice[index].health_screening_has_choice_detail,
                "HEALTH_SCREENING_HAS_CHOICE_CORRECT": health_screening_has_choice[index].health_screening_has_choice_correct,
                "HEALTH_SCREENING_CHOICE_ID": health_screening_has_choice[index].health_screening_choice_id
            }


            db.query('INSERT INTO HEALTH_SCREENING_HAS_CHOICE SET ? ON DUPLICATE KEY UPDATE ?', [temp_data, temp_data_on], function (error, results, fields) {
                if (error) {
                    result(null, { "status": "404" });
                }
            });
        }
        let health_screening_sub_choice = fetch_data.health_screening_sub_choice;
        for (let index2 = 0; index2 < health_screening_sub_choice.length; index2++) {
            let temp_data2 = {
                "HEALTH_SCREENING_HAS_SUB_CHOICE_ID": health_screening_sub_choice[index2].health_screening_has_sub_choice_id,
                "HEALTH_SCREENING_HAS_SUB_CHOICE_DETAIL": health_screening_sub_choice[index2].health_screening_has_sub_choice_detail,
                "HEALTH_SCREENING_AND_ADL_EVALUATION_ID": id_health_screening_adl_evaluation,
                "HEALTH_SCREENING_SUB_CHOICE_ID": health_screening_sub_choice[index2].health_screening_sub_choice_id
            }
            let temp_data2_on = {

                "HEALTH_SCREENING_HAS_SUB_CHOICE_DETAIL": health_screening_sub_choice[index2].health_screening_has_sub_choice_detail,
                "HEALTH_SCREENING_SUB_CHOICE_ID": health_screening_sub_choice[index2].health_screening_sub_choice_id
            }

            db.query("INSERT INTO HEALTH_SCREENING_HAS_SUB_CHOICE SET ? ON DUPLICATE KEY UPDATE ?", [temp_data2, temp_data2_on], function (error, results, fields) {
                if (error) {
                    result(null, { "status": "404" });
                }
            });
        }


        let get_health_screening_data = await get_health_screening(id_health_screening_adl_evaluation)
        let get_health_screening_sub_data = await get_health_screening_sub(id_health_screening_adl_evaluation)
        result(null, { "status": 200, "data": { "member_id": member_id, "health_screening_adl_evaluation_id": id_health_screening_adl_evaluation, "health_screening_has_choice": get_health_screening_data, "health_screening_sub_choice": get_health_screening_sub_data } });

    }
};


async function insert_health_screening(id) {
    return new Promise(resolve => {
        setTimeout(() => {

            // let temp_data = {
            //   "MEMBER_ID":id
            // }
            db.query('INSERT INTO `HEALTH_SCREENING_AND_ADL_EVALUATION`( `HEALTH_SCREENING_AND_ADL_EVALUATION_DATE`, `MEMBER_ID`) VALUES (NOW(),?)', id, function (error, results, fields) {
                if (error) {
                    resolve({ "results": { "status": "404", "massage": error } });
                }
            });

            db.query('SELECT LAST_INSERT_ID() AS id', function (error, results, fields) {
                resolve(results[0].id);
            });

        }, 250);
    });
}


healthservice.createAdlEvaluation = function (fetch_data, result) {
    let id = fetch_data.id_health_screening_adl_evaluation;
    let member_id = fetch_data.member_id;

    if (id == null && member_id == null) {
        result(null, { "status": "404", "massage": "member_id and id_health_screening_adl_evaluation not found" });
    }
    else {

        let id_health_screening_adl_evaluation = id;
        if (id_health_screening_adl_evaluation == null) {
            id_health_screening_adl_evaluation = await insert_health_screening(member_id);
        }

        let adl_evaluation = fetch_data.adl_evaluation;
        for (let index = 0; index < adl_evaluation.length; index++) {

            let temp_data = {
                "EVALUATION_HAS_CHOICE_ID": adl_evaluation[index].adl_has_choice_id,
                "HEALTH_SCREENING_AND_ADL_EVALUATION_ID": id_health_screening_adl_evaluation,
                "ADL_CHOICE_ID": adl_evaluation[index].adl_choice_id
            }

            let temp_data_on = {
                "ADL_CHOICE_ID": adl_evaluation[index].adl_choice_id
            }

            db.query('INSERT INTO ADL_EVALUATION_HAS_CHOICE SET ? ON DUPLICATE KEY UPDATE ?', [temp_data, temp_data_on], function (error, results, fields) {
                if (error) {
                    result(null, { "status": "404" });
                }
            });
        }
        let get_adl_data = await get_adl_screening(id_health_screening_adl_evaluation);
        result(null, { "status": 200, "data": { "adl_evaluation": get_adl_data, "health_screening_adl_evaluation_id": id_health_screening_adl_evaluation } });

    }
};

healthservice.getHealthScreeningChoice = function (id, result) {
    let health_screening_and_adl_evaluation_id = id;
    db.query('SELECT HEALTH_SCREENING_HAS_CHOICE.*,HEALTH_SCREENING_QUESTIONNAIRE.HEALTH_SCREENING_QUESTIONNAIRE_ID FROM HEALTH_SCREENING_HAS_CHOICE,HEALTH_SCREENING_CHOICE,HEALTH_SCREENING_QUESTIONNAIRE WHERE HEALTH_SCREENING_HAS_CHOICE.HEALTH_SCREENING_CHOICE_ID = HEALTH_SCREENING_CHOICE.HEALTH_SCREENING_CHOICE_ID AND HEALTH_SCREENING_CHOICE.HEALTH_SCREENING_QUESTIONNAIRE_ID = HEALTH_SCREENING_QUESTIONNAIRE.HEALTH_SCREENING_QUESTIONNAIRE_ID AND HEALTH_SCREENING_HAS_CHOICE.HEALTH_SCREENING_AND_ADL_EVALUATION_ID =  ? ', health_screening_and_adl_evaluation_id, function (error, results, fields) {
        result(null, { "status": 200, "data": { results } });
    });
}

healthservice.getHealthScreeningList = function (member_id, result) {
    db.query('SELECT HEALTH_SCREENING_AND_ADL_EVALUATION.*,DATE_FORMAT(HEALTH_SCREENING_AND_ADL_EVALUATION.HEALTH_SCREENING_AND_ADL_EVALUATION_DATE,"%d/%m/%Y") as HEALTH_SCREENING_AND_ADL_EVALUATION_DATE,(SELECT SUM(ADL_CHOICE.ADL_CHOICE_SCORE) FROM ADL_EVALUATION_HAS_CHOICE,ADL_CHOICE WHERE ADL_CHOICE.ADL_CHOICE_ID = ADL_EVALUATION_HAS_CHOICE.ADL_CHOICE_ID AND ADL_EVALUATION_HAS_CHOICE.HEALTH_SCREENING_AND_ADL_EVALUATION_ID = HEALTH_SCREENING_AND_ADL_EVALUATION.HEALTH_SCREENING_AND_ADL_EVALUATION_ID) AS SCORE , IF((SELECT SUM(ADL_CHOICE.ADL_CHOICE_SCORE) FROM ADL_EVALUATION_HAS_CHOICE,ADL_CHOICE WHERE ADL_CHOICE.ADL_CHOICE_ID = ADL_EVALUATION_HAS_CHOICE.ADL_CHOICE_ID AND ADL_EVALUATION_HAS_CHOICE.HEALTH_SCREENING_AND_ADL_EVALUATION_ID = HEALTH_SCREENING_AND_ADL_EVALUATION.HEALTH_SCREENING_AND_ADL_EVALUATION_ID)<5,"(3) ผู้สูงอายุกลุ่มที่พึ่งตนเองไม่ได้",IF((SELECT SUM(ADL_CHOICE.ADL_CHOICE_SCORE) FROM ADL_EVALUATION_HAS_CHOICE,ADL_CHOICE WHERE ADL_CHOICE.ADL_CHOICE_ID = ADL_EVALUATION_HAS_CHOICE.ADL_CHOICE_ID AND ADL_EVALUATION_HAS_CHOICE.HEALTH_SCREENING_AND_ADL_EVALUATION_ID = HEALTH_SCREENING_AND_ADL_EVALUATION.HEALTH_SCREENING_AND_ADL_EVALUATION_ID)<12,"(2) ผู้สูงอายุที่ดูแลตนเองได้บ้าง", IF((SELECT SUM(ADL_CHOICE.ADL_CHOICE_SCORE) FROM ADL_EVALUATION_HAS_CHOICE,ADL_CHOICE WHERE ADL_CHOICE.ADL_CHOICE_ID = ADL_EVALUATION_HAS_CHOICE.ADL_CHOICE_ID AND ADL_EVALUATION_HAS_CHOICE.HEALTH_SCREENING_AND_ADL_EVALUATION_ID = HEALTH_SCREENING_AND_ADL_EVALUATION.HEALTH_SCREENING_AND_ADL_EVALUATION_ID)<=20,"(1) ผู้สูงอายุที่พึ่งตนเองได้","-"))) AS ADL_GROUP FROM `HEALTH_SCREENING_AND_ADL_EVALUATION` WHERE HEALTH_SCREENING_AND_ADL_EVALUATION.MEMBER_ID = ?', member_id, function (error, results, fields) {
        result(null, { "status": 200, "data": { results } });
    });
}

healthservice.getHealthScreeningById = function (member_id, result) {
    db.query('SELECT HEALTH_SCREENING_AND_ADL_EVALUATION.HEALTH_SCREENING_AND_ADL_EVALUATION_ID,HEALTH_SCREENING_AND_ADL_EVALUATION.HEALTH_SCREENING_AND_ADL_EVALUATION_DATE,MEMBER.MEMBER_IDENTIFICATION_NUMBER,CONCAT(MEMBER.MEMBER_FIRST_NAME," ",MEMBER.MEMBER_LAST_NAME) as FULLNAME,MEMBER.MEMBER_BIRTH_DATE FROM HEALTH_SCREENING_AND_ADL_EVALUATION,MEMBER,USER WHERE HEALTH_SCREENING_AND_ADL_EVALUATION.MEMBER_ID = MEMBER.MEMBER_ID AND MEMBER.MEMBER_ID = ?', member_id, function (error, results, fields) {
        result(null, { "status": 200, "data": { results } });
    });
}

healthservice.healthscreeningHasChoiceById = async function (id, result) {

    let health_screening_and_adl_evaluation_id = id;
    let get_health_screening_data = await get_health_screening(health_screening_and_adl_evaluation_id)
    let get_adl_data = await get_adl_screening(health_screening_and_adl_evaluation_id)
    let get_health_screening_sub_data = await get_health_screening_sub(health_screening_and_adl_evaluation_id)

    result(null, { "status": 200, "data": { "health_screening_has_choice": get_health_screening_data, "health_screening_sub_choice": get_health_screening_sub_data, "adl_screening": get_adl_data } });
}

async function get_health_screening(id) {
    return new Promise(resolve => {
        setTimeout(() => {
            db.query('SELECT HEALTH_SCREENING_HAS_CHOICE.HEALTH_SCREENING_HAS_CHOICE_ID as health_screening_has_choice_id,HEALTH_SCREENING_HAS_CHOICE.HEALTH_SCREENING_HAS_CHOICE_DETAIL as health_screening_has_choice_detail,HEALTH_SCREENING_HAS_CHOICE.HEALTH_SCREENING_HAS_CHOICE_CORRECT as health_screening_has_choice_correct,HEALTH_SCREENING_HAS_CHOICE.HEALTH_SCREENING_CHOICE_ID as health_screening_choice_id FROM HEALTH_SCREENING_HAS_CHOICE,HEALTH_SCREENING_CHOICE WHERE HEALTH_SCREENING_HAS_CHOICE.HEALTH_SCREENING_CHOICE_ID = HEALTH_SCREENING_CHOICE.HEALTH_SCREENING_CHOICE_ID AND HEALTH_SCREENING_HAS_CHOICE.HEALTH_SCREENING_AND_ADL_EVALUATION_ID = ? ', id, function (error, results, fields) {
                resolve(results);
            });
        }, 250);
    });
}

async function get_health_screening_sub(id) {
    return new Promise(resolve => {
        setTimeout(() => {
            db.query('SELECT HEALTH_SCREENING_HAS_SUB_CHOICE.HEALTH_SCREENING_HAS_SUB_CHOICE_ID as health_screening_has_sub_choice_id ,HEALTH_SCREENING_HAS_SUB_CHOICE.HEALTH_SCREENING_HAS_SUB_CHOICE_DETAIL as health_screening_has_sub_choice_detail,HEALTH_SCREENING_HAS_SUB_CHOICE.HEALTH_SCREENING_SUB_CHOICE_ID as health_screening_sub_choice_id FROM `HEALTH_SCREENING_HAS_SUB_CHOICE` WHERE HEALTH_SCREENING_HAS_SUB_CHOICE.HEALTH_SCREENING_AND_ADL_EVALUATION_ID =  ? ', id, function (error, results, fields) {
                resolve(results);
            });
        }, 250);
    });
}

async function get_adl_screening(id) {
    return new Promise(resolve => {
        setTimeout(() => {
            db.query('SELECT * FROM `ADL_EVALUATION_HAS_CHOICE` WHERE ADL_EVALUATION_HAS_CHOICE.HEALTH_SCREENING_AND_ADL_EVALUATION_ID = ? ', id, function (error, results, fields) {
                resolve(results);
            });
        }, 250);
    });
}


healthservice.createMedicalCheckup = function (fetch_data, result) {

  let member_id = fetch_data.member_id;

  let fetch_medical_checkup_date = fetch_data.medical_checkup

  let medical_checkup_id = fetch_medical_checkup_date.medical_checkup_id;
  let medical_checkup_date = fetch_medical_checkup_date.medical_checkup_date;
  let medical_checkup_weight = fetch_medical_checkup_date.medical_checkup_weight;
  let medical_checkup_height = fetch_medical_checkup_date.medical_checkup_height;
  let medical_checkup_bmi = fetch_medical_checkup_date.medical_checkup_bmi;
  let medical_checkup_sbp = fetch_medical_checkup_date.medical_checkup_sbp;
  let medical_checkup_dbp = fetch_medical_checkup_date.medical_checkup_dbp;
  let medical_checkup_fbs = fetch_medical_checkup_date.medical_checkup_fbs;
  let medical_note = fetch_medical_checkup_date.medical_note;


  let json_data = {
    "MEDICAL_CHECKUP_ID": medical_checkup_id,
    "MEDICAL_CHECKUP_DATE": medical_checkup_date,
    "MEDICAL_CHECKUP_WEIGHT": medical_checkup_weight,
    "MEDICAL_CHECKUP_HEIGHT": medical_checkup_height,
    "MEDICAL_CHECKUP_BMI": medical_checkup_bmi,
    "MEDICAL_CHECKUP_SYSTOLIC_BLOOD_PRESSURE": medical_checkup_sbp,
    "MEDICAL_CHECKUP_DIASTOLIC_BLOOD_PRESSURE": medical_checkup_dbp,
    "MEDICAL_CHECKUP_FASTING_BLOOD_SUGAR": medical_checkup_fbs,
    "MEDICAL_NOTE": medical_note,
    "MEMBER_ID": member_id
  }

  let json_data2 = {
    "MEDICAL_CHECKUP_DATE": medical_checkup_date,
    "MEDICAL_CHECKUP_WEIGHT": medical_checkup_weight,
    "MEDICAL_CHECKUP_HEIGHT": medical_checkup_height,
    "MEDICAL_CHECKUP_BMI": medical_checkup_bmi,
    "MEDICAL_CHECKUP_SYSTOLIC_BLOOD_PRESSURE": medical_checkup_sbp,
    "MEDICAL_CHECKUP_DIASTOLIC_BLOOD_PRESSURE": medical_checkup_dbp,
    "MEDICAL_CHECKUP_FASTING_BLOOD_SUGAR": medical_checkup_fbs,
    "MEDICAL_NOTE": medical_note,

  }

  db.query('INSERT INTO MEDICAL_CHECKUP SET ? ON DUPLICATE KEY UPDATE ?', [json_data, json_data2], function (error, results, fields) {
    if (error) {
        result(null,{ "status": 404 });
    }
  });

  if (medical_checkup_id == null) {
    db.query('SELECT MEDICAL_CHECKUP.*,DATE_FORMAT(MEDICAL_CHECKUP.MEDICAL_CHECKUP_DATE, "%d/%m/%Y") AS MEDICAL_CHECKUP_DATE FROM `MEDICAL_CHECKUP` WHERE MEDICAL_CHECKUP.MEDICAL_CHECKUP_ID = LAST_INSERT_ID()', function (error, results, fields) {

      if (error) {
        result(null,{ "status": 404 });
      }
      else {
        result(null, { "status": 200, "data": results[0] });
      }
    });
  }
  else {
    db.query('SELECT MEDICAL_CHECKUP.*,DATE_FORMAT(MEDICAL_CHECKUP.MEDICAL_CHECKUP_DATE, "%d/%m/%Y") AS MEDICAL_CHECKUP_DATE FROM `MEDICAL_CHECKUP` WHERE MEDICAL_CHECKUP.MEDICAL_CHECKUP_ID = ?', medical_checkup_id, function (error, results, fields) {

      if (error) {
        result(null,{ "status": 404 });
      }
      else {
        result(null,{ "status": 200, "data": results[0] });
      }
    });
  }

}

healthservice.getMedicalCheckUpByMemberId = function (member_id, result) {
    db.query('SELECT MEDICAL_CHECKUP.*,IF(MEDICAL_CHECKUP.MEDICAL_CHECKUP_BMI<18,"ผอมเกินไป",IF(MEDICAL_CHECKUP.MEDICAL_CHECKUP_BMI<30,"ปกติ","อ้วนเกินไป")) as NOTE,DATE_FORMAT(MEDICAL_CHECKUP.MEDICAL_CHECKUP_DATE, "%d/%m/%Y") AS DATE_CHECKUP FROM `MEDICAL_CHECKUP` WHERE MEDICAL_CHECKUP.MEMBER_ID = ?', member_id, function (error, results, fields) {

        if (error) {
            result(null,{ "status": 404 });
        }
        else {
            result(null, { "status": 200, "data": results } );
        }
      });
}

healthservice.getMedicalCheckUpById = function (medical_checkup_id, result) {

    db.query('SELECT MEDICAL_CHECKUP.*,DATE_FORMAT(MEDICAL_CHECKUP.MEDICAL_CHECKUP_DATE, "%d/%m/%Y") AS MEDICAL_CHECKUP_DATE FROM `MEDICAL_CHECKUP` WHERE MEDICAL_CHECKUP.MEDICAL_CHECKUP_ID = ?', medical_checkup_id, function (error, results, fields) {
  
      if (error) {
        // console.log(error);
        result(null,{ "status": 404 });
      }
      else {
        result(null, { "status": 200, "data": results[0] } );
      }
    });
}


module.exports = healthservice;