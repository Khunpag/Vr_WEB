const postgres = require('pg');
var format = require('pg-format');

module.exports = {
    // addPatient: async (pool, )

    deletePatient: async (pool, user_no) => {
        // console.log(user_no);
        var sql = "DELETE FROM patient WHERE user_no = %L";
        sql = format(sql, [user_no]);

        return await pool.query(sql);
    },

    deleteUserPatient: async (pool, user_no) => {
        // console.log(user_no);
        var sql = "DELETE FROM username_password WHERE user_no = %L";
        
        sql = format(sql, [user_no]);

        return await pool.query(sql);
    },

    deleteGame: async (pool, patientNo) => {
        var sql = "DELETE FROM game WHERE patient_no = %L";

        sql = format(sql, [patientNo]);

        return await pool.query(sql);
    },

    deleteG1: async (pool, patientNo) => {
        var sql = "DELETE FROM g1_difficulty WHERE patient_no = %L";

        sql = format(sql, [patientNo]);

        return await pool.query(sql);
    },

    deleteG2: async (pool, patientNo) => {
        var sql = "DELETE FROM g2_difficulty WHERE patient_no = %L";

        sql = format(sql, [patientNo]);

        return await pool.query(sql);
    },

    deleteG3: async (pool, patientNo) => {
        var sql = "DELETE FROM g3_difficulty WHERE patient_no = %L"

        sql = format(sql, [patientNo]);

        return await pool.query(sql);
    },

    getByPatientNo: async (pool, patientNo) => {
        var sql = "SELECT * FROM patient WHERE patient_no = %L";
        sql = format(sql, [patientNo]);

        return await pool.query(sql);
    },

    getG1ByPatientNo: async (pool, patientNo) => {
        return await pool.query("SELECT * FROM g1_difficulty WHERE patient_no = $1", [patientNo]);
    },

    getG2ByPatientNo: async (pool, patientNo) => {
        return await pool.query("SELECT * FROM g2_difficulty WHERE patient_no = $1", [patientNo]);
    },

    getG3ByPatientNo: async (pool, patientNo) => {
        return await pool.query("SELECT * FROM g3_difficulty WHERE patient_no = $1", [patientNo]);
    },

    addPatient: async (pool, sex, date, weight, height, neck, arm, bust, diseases, userNo) => {
        // var sql = "insert into patient(sex, birthday, weight, height, neck_length, arm_length, bust_waist_length, related_diseases, user_no) "
        //             +"values (%S, %S, %L, %L, %L, %L, %L, %S, %L)";
        // sql = format(sql, [sex, date, weight, height, neck, arm, bust, diseases, userNo]);

        return await pool.query("INSERT INTO patient(sex, birthday, weight, height, neck_length, arm_length, bust_waist_length, related_diseases, user_no) "
                                +"VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)", [sex, date, weight, height, neck, arm, bust, diseases, userNo]);
    },

    addPatientUserPass: async (pool, username, password) => {
        
        return await pool.query("INSERT INTO username_password (username, pwd, department_no) "
                                +"VALUES ($1, MD5($2), 1)", [username, password]);
    },

    selectUser: async (pool, username, password) => {
        
        return await pool.query("SELECT user_no FROM username_password WHERE username = $1 AND pwd = MD5($2)", [username, password]);
    },

    selectPatientNo: async (pool, userNo) => {

        return await pool.query("SELECT patient_no FROM patient WHERE user_no = $1", [userNo]);
    },

    addG1: async (pool, time, patientNo) => {
        return await pool.query("INSERT INTO g1_difficulty (g1_time, patient_no) VALUES($1, $2)", [time, patientNo]);
    },

    addG2: async (pool, level, patientNo) => {
        return await pool.query("INSERT INTO g2_difficulty (level_two, patient_no) VALUES($1, $2)", [level, patientNo]);
    },

    addG3: async (pool, level, patientNo) => {
        return await pool.query("INSERT INTO g3_difficulty (level_three, patient_no) VALUES($1, $2)", [level, patientNo]);
    },

    updatePatient: async (pool, patientNo, sex, date, weight, height, neck, arm, bust, diseases) => {
        return await pool.query("UPDATE patient SET "
                                + "sex=$1, "
                                + "birthday=$2, "
                                + "weight=$3, "
                                + "height=$4, "
                                + "neck_length=$5, "
                                + "arm_length=$6, "
                                + "bust_waist_length=$7, "
                                + "related_diseases=$8 "
                                + "WHERE patient_no=$9", [sex, date, weight, height, neck, arm, bust, diseases, patientNo]);
    },

    updateG1: async (pool, time, patientNo) => {
        return await pool.query("UPDATE g1_difficulty SET "
                                + "g1_time=$1 "
                                + "WHERE patient_no=$2", [time, patientNo]);
    },

    updateG2: async (pool, level, patientNo) => {
        return await pool.query("UPDATE g2_difficulty SET "
                                + "level_two=$1 "
                                + "WHERE patient_no=$2", [level, patientNo]);
    },

    isDuplicate: async (pool, username, patientNo) => {
        var sql = "SELECT * FROM username_password WHERE username = $1 ";
        var result;

        if(patientNo != null) {
            sql = sql + "AND patient_no <> $2";
            result = await pool.query(sql, [username, patientNo]);
        }else {
            result = await pool.query(sql, [username]);
        }
        // console.log("11111");
        // console.log(result);
        // var result = await pool.query
        
        if(result.rows.length > 0){
            return true;
        }

        return false;
    },
    
    updateG3: async (pool, level, patientNo) => {
        return await pool.query("UPDATE g3_difficulty SET "
                                + "level_three=$1 "
                                + "WHERE patient_no=$2", [level, patientNo]);
    },

    getSumGame: async (pool) => {
        return await pool.query("SELECT a.game_type_no, COUNT(a.game_type_no), b.game_name "
                                + "FROM game a "
                                + "JOIN game_type b ON a.game_type_no = b.game_type_no "
                                + "GROUP BY a.game_type_no, b.game_name "
                                + "ORDER BY a.game_type_no ASC");
    },
}