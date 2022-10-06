const { Pool } = require("pg");
var format = require("pg-format");

module.exports = {
  // addUser: async (pool, )
  deleteUser: async (pool, person_no) => {
    console.log(person_no);
    var sql = "DELETE FROM role_user WHERE person_no = %L";
    sql = format(sql, [person_no]);

    return await pool.query(sql);
  },

  deleteUserUser: async (pool, person_no) => {
    console.log(person_no);
    var sql = "DELETE FROM username_password WHERE user_no = %L";

    sql = format(sql, [person_no]);

    return await pool.query(sql);
  },


  isDuplicate: async (pool, username, personNo) => {
    var sql = "SELECT * FROM username_password WHERE username = $1 ";
    var result;

    if (personNo != null) {
      sql = sql + "AND person_no <> $2";
      result = await pool.query(sql, [username, personNo]);
    } else {
      result = await pool.query(sql, [username]);
    }
    // console.log("11111");
    // console.log(result);
    // var result = await pool.query

    if (result.rows.length > 0) {
      return true;
    }

    return false;
  },

  addUserPass: async (pool, username, password) => {
    console.log(username, password);
    return await pool.query(
      "INSERT INTO username_password (username, pwd, department_no) " +
        "VALUES ($1, MD5($2), 1)",
      [username, password]
    );
  },

  selectUser: async (pool, username, password) => {
    return await pool.query(
      "SELECT user_no FROM username_password WHERE username = $1 AND pwd = MD5($2)",
      [username, password]
    );
  },

  addUser: async (pool, name, lastname, sex, birthday, userNo) => {
    console.log(name, lastname, sex, birthday, userNo);
    return await pool.query(
      "INSERT INTO role_user(name, last_name, birthday, sex, user_no) " +
        "VALUES ($1, $2, $3, $4, $5)",
      [name, lastname, birthday, sex, userNo]
    );
  },
  
  selectPersonNo: async (pool, userNo) => {
    return await pool.query(
      "SELECT person_no FROM role_user WHERE user_no = $1",
      [userNo]
    );
  },

  getByPersonNo: async (pool, personNo) => {
    var sql = "SELECT * FROM role_user WHERE person_no = %L";
    sql = format(sql, [personNo]);

    return await pool.query(sql);
  },

   
  /* A function that is updating the database. */
  updatePersonNo: async (pool, personNo, name, lastname, sex, date) => {
    console.log("updatePerson");
    return await pool.query(
      "UPDATE role_user SET "
      + "name=$1, "
      + "last_name=$2, "
      + "sex=$3, "
      + "birthday=$4, "
      + "WHERE person_no=$5",
      [name, lastname, sex, date, personNo]
    );
  },

   
};
