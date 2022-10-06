const { appendFile } = require("fs");
// const http = require("http");
const express = require("express");
const app = express();
const {Pool} = require('pg')
const Patient = require("./libs/Patient");
const role_user = require("./libs/User");
const util = require('util');

var loginCode = "0";
var user_no = 0;
var patient_no = 0;
var level_two = 0;
var score = 0;
var alert_count = 0;
var take_time = 0;
var success_obj = 0;
var miss_obj = 0;

const jwt = require("jsonwebtoken");

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false}));

app.use(bodyParser.json());

app.use('/images', express.static('images'));

// const session = require('express-session');

app.use('/images', express.static('images'));

const hostname = "127.0.0.1"; //localhost หรือ เครื่องคอมพิวเตอร์ของเรา
const port = 8080; //ปกติใช้ 80 หรือ 443

const cors = require("cors");
const { response, query } = require("express");
const { debug } = require("console");

app.use(cors());

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "1234",
    database: "VR-Project"
})

pool.connect();

pool.query = util.promisify(pool.query);

//Session
// app.unsubscribe(session({
//     secret: "1595",
//     resave: true,
//     saveUnitinitialized: true
// }));

//Unique Value
function getRandomInt(max){
    return Math.floor(Math.random() * Math.floor(max));
}

var randomID = getRandomInt(10);

app.get("/", (req, res) => {
    res.send("Hello Unity");
});

app.get('/setstart', async (req, res) => {

    pool.query("SELECT * FROM username_password WHERE user_no = $1", [5], (error, results, fields) => {
        if(error) throw error;

        //res.json(results);

        try{
            //res.json(results.rows);
            //res.send("Welcome to Unity Success");
            res.json(results.rows[0].user_no);
        }catch (error){
            res.status(500).send(error);
        }
    });

    // try{ 

    //     //res.send("Welcome to Unity Success");
    // }catch (error){
    //     res.status(500).send(error);
    // }
});

app.post("/TestPage", (req, res) => {

    // var user_no;

    try{
        console.log("Username: "+req.body.username);
        console.log("Password: "+req.body.password);

        const username = req.body.username;
        const password = req.body.password;

        pool.query("SELECT * FROM username_password WHERE username = $1 AND pwd = MD5($2)", [username,password], function(error, result, fields){
            console.log(result.rows);

            if(error){
                res.json(error);
            }
    
            if(result.rows.length){

                user_no = result.rows[0].user_no;

                res.json({
                    code: "1",
                    user_no: user_no

                    // result: true
                });
            
                // res.send("1");
                // res.send(result.rows[0].user_no);

                // id = "1";

                console.log("Login code part 1");
                // loginCode = "1";

                pool.query("SELECT patient_no FROM patient WHERE user_no = $1", [user_no], function(error, result, fields){
                    // console.log(result.rows[0].patient_no);
        
                    if(error){
                        res.json(error);
                    }
            
                    if(result.rows.length){
        
                        patient_no = result.rows[0].patient_no;
                        console.log("patient_no: "+patient_no);
                    }
                });

            }else{

                res.json({
                    code: "0"
                    
                });

                // res.send("0");

                // id = "0";

                console.log("Login code part 2");
                // loginCode = "2";

            }
        });

    }catch (error){
        res.status(501).send(error);
    }
    
})

app.get("/gameone/gettime", (req, res)=> {

    pool.query("SELECT a.g1_time FROM g1_difficulty a JOIN patient b "
    + "ON a.patient_no = b.patient_no "
    + "WHERE b.user_no = $1;", [user_no], (error, results, fields) => {
        
        if(error) throw error;
        
        try{

            // console.log(results);
            // console.log("User No = "+ user_no);
            res.json(results.rows[0].g1_time);

        }catch (error){
            res.status(500).send(error);
        }
    });

});

app.get("/view/stats", (req, res) => {
    const userNo = req.params.userNo;

    pool.query("SELECT a.")
})

app.get("/view/weight", (req, res) => {

    // console.log("user_no = "+ user_no);

    pool.query("SELECT weight FROM patient WHERE user_no = $1", [user_no], (error, results, fields) => {
        
        if(error) throw error;

        try{

            res.json(results.rows[0].weight);
            // console.log(results);
        }catch (error){
            res.status(500).send(error);
        }
        
        // console.log("weight = "+);
    })

})

app.post("/edit/weight/:weight", (req, res) => {

    const weight = req.params.weight;

    pool.query("UPDATE patient SET weight = $1 WHERE user_no = $2", [weight,user_no], (error, results, fields) => {
        // console.log(results);
        
        if(error){
            console.log("In if");
            res.json(error);
        }else{
            console.log("In else");
            res.json({
                wei_code: "1",
            });
        }

        // if(results.rowCount.length){
        //     res.json({
        //         wei_code: "1",
        //     });
        // }else{
        //     res.json({
        //         wei_code: "0",
        //     });
        // }

    })

})

app.post("/result/game1", (req, res) => {
    try{
        console.log("Score: "+req.body.score);
        console.log("Alert count: "+req.body.alert_count);
        console.log("Set time: "+req.body.set_time);
        console.log("Take time: "+req.body.take_time);

        score = req.body.score;
        alert_count = req.body.alert_count;
        const set_time = req.body.set_time;
        take_time = req.body.take_time;

        pool.query("SELECT create_game_1($1, $2, 1, $3, $4, $5)", [score, alert_count, patient_no, set_time, take_time], function(error, results, fields) {
            
            if(error){

                console.log("Game 1 Error");
                res.json(error);

            }else{

                console.log("Game 1 Success");

            }

        })

    }catch (error){
        res.status(201).send(error);
    }
})

app.post("/result/game2", (req,res) => {
    try{
        console.log("Score: "+req.body.score);
        console.log("Alert_count: "+req.body.alert_count);
        console.log("Success_obj: "+req.body.success_obj);
        console.log("Miss_obj: "+req.body.miss_obj);

        score = req.body.score;
        alert_count = req.body.alert_count;
        success_obj = req.body.success_obj;
        miss_obj = req.body.miss_obj;

        pool.query("SELECT create_game_2($1, $2, 2, $3, $4, $5, $6)", [score, alert_count, patient_no, level_two, success_obj, miss_obj], function(error, results, fields){
            if(error){
                console.log("Game 2 Error");
                res.json(error);
            }else{
                console.log("Game 2 Success");
            }
        })


    }catch(error){
        res.status(202).send(error);
    }
})

app.get("/gametwo/delaytime", (req,res) => {
    pool.query("SELECT a.* "
            +"FROM game_two_level a "
            +"JOIN g2_difficulty b "
            +"ON a.level_two = b.level_two "
            +"where b.patient_no = $1", [patient_no], function(error,result,fields){

                if(error) throw error;

                try{

                    res.json(result.rows[0].delay_time);
                    level_two = result.rows[0].level_two;
                    console.log(level_two);
                    console.log(result.rows[0].delay_time);

                }catch (error){
                    res.status(800).send(error);
                }

            })
})

app.get("/users", (req, res) => {
    pool.query("SELECT * FROM username_password", function(error,result,fields){
        if(error) throw error;

        res.json(result);
    });
});

app.get("/user/:userId",(req, res) => {
    const userId = req.params.userId;

    pool.query("SELECT * FROM username_password WHERE user_no = $1", [userId], (error, results, fields) => {
        if(error) throw error;

        res.json(results);
    });
});


app.post('/add_user',(req,res) => {
    const input = req.body;

    pool.query("INSERT INTO username_password (username, pwd) VALUES ($1, MD5($2))" ,
        [
            input.username,
            input.password,
        ], function(error, results, fields){
            if(error) throw error;

            res.json(results);
    });
});

app.post("/login", (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    pool.query("SELECT * FROM username_password WHERE username = $1 AND pwd = MD5($2)", [username,password], function(error, result, fields){
        if(error){
            res.json({
                result: false,
                message: error.message
            });
        }

        if(result.rows.length){
            res.json({
                result: true
            });
        }else{
            res.json({
                result: false,
                message: "ไม่พบ Username หรือ Password ไม่ถูกต้อง"
            });
        }
    });
});

let checkAuth = (req, res, next) => {
    let token = null;

    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {

    } else {
        token = req.body.token;
    }

    if(token) {
        jwt.verify(token, "MySecretKey", (err, decoded) => {
            if(err){
                res.send(JSON.stringify({
                    result: false,
                    message: "ไม่ได้เข้าสู่ระบบ"
                }));
            }else {
                req.decoded = decoded;
                next();
            }
        });
    }else {
        res.status(401).send("Not authorized");
    }
}

app.get("/api/department_types", checkAuth, (req, res) => {
    const query = "SELECT * FROM department";

    pool.query(query, (error, results) => {
        if(error) {
            res.json ({
                result: false,
                message: error.message
            })
        }else {
            
            res.json({
                result: true,
                data: results
            });
        }
    });
});

app.get("/api/users/department_type/:department_no", checkAuth, (req, res) => {
    const departmentId = req.params.department_no;
    const sql = "SELECT a.*, b.department_name "
                + "FROM username_password a "
                + "JOIN department b ON a.department_no = b.department_no ";

    // console.log(departmentId);
    if (departmentId == 0){
        pool.query(sql, (error, results) => {
            if(error) {
                res.json({
                    result: false,
                    message: error.message
                });
            }else {
                res.json({
                    result: true,
                    data: results
                });
            }
        });
    }else {
        pool.query(sql + "WHERE a.department_no = $1",
        [departmentId], (error, results) => {
            if (error){
                res.json({
                    result: false,
                    message: error.message
                });
            } else {
                res.json({
                    result: true,
                    data: results
                });
            }
        });
    }
});

app.post("/api/authen_request", (req, res) => {
    const query = "SELECT * FROM username_password WHERE MD5(username) = $1";
    pool.query(query, [req.body.username], (error, results) => {
        var response;
        if (error) {
            response = {
                result: false,
                message: error.message
            };
        } else {
            console.log(results);
            if (results) {
                var payload = {username: req.body.username};
                var secretKey= "MySecretKey";
                const authToken = jwt.sign(payload, secretKey);
                response = {
                    result: true,
                    data: {
                        auth_token: authToken
                    }
                };
            } else {
                response = {
                    result: false,
                    message: "Username ไม่ถูกต้อง"
                };
            }
        }
        res.json(response);
    });
});

app.post("/api/access_request", (req, res) => {
    const authenSignature = req.body.auth_signature;
    const authToken = req.body.auth_token;

    // console.log(req.body);

    var decoded = jwt.verify(authToken, "MySecretKey");

    if(decoded) {
        const query = "SELECT a.user_no, a.username, a.pwd, a.department_no, b.department_name "
            + "FROM username_password a JOIN department b ON a.department_no = b.department_no where MD5(CONCAT(username, '&', pwd)) = $1";
            pool.query(query, [authenSignature], (error, results) => {
            var response;
            if(error) {
                response = {
                    results: false,
                    message: error.message
                };
            }else{
                console.log(results.rows);
                
                if(results.rows.length) {
                    // console.log(results.rows);
                    var payload = {
                        user_no: results.rows[0].user_no, username: results.rows[0].username, pwd: results.rows[0].pwd,
                        department_no: results.rows[0].department_no, department_name: results.rows[0].department_name
                    };
                    const accessToken = jwt.sign(payload, "MySecretKey");
                    response = { result: true, data: { access_token: accessToken, account_info: payload } };
                }else {
                    // console.log("22");
                    response = { result: false, message: "ชื่อผู้ใช้งาน หรือ รหัสผ่าน ไม่ถูกต้อง"};
                }
            }
            res.json(response);
        });
    }
});

app.get("/api/patient",checkAuth, (req, res) => {
    let query = "SELECT * FROM patient ORDER BY patient_no ASC";

    // console.log("Here");

    pool.query(query, (error, results) => {
        // console.log("Here2");
        if (error){
            res.json({
                result: false,
                message: error.message
            });
        } else {
            res.json({
                result: true,
                data: results.rows
            });
            // console.log("Here3");
        }
        
    });
    
    // console.log("Here4");
});

app.get("/api/game_report/:patientNo", checkAuth, (req, res) => {
    const patient_No = req.params.patientNo;
    const query = "SELECT * FROM game WHERE patient_no = $1";

    pool.query(query, [patient_No], (error, results) => {
        if (error) {
            res.json({
                result: false,
                message: error.message
            })
        } else {
            res.json({
                result: true,
                data: results
            });
        }
        pool.end();
    });
})

app.post("/api/patient/delete", checkAuth, async (req, res) => {
    const input = req.body;

    try{
        // console.log("T1");

        var result1 = await Patient.deleteGame(pool, input.patient_no);

        if(result1){
            // console.log("T2");
            await Patient.deleteG1(pool, input.patient_no);
            await Patient.deleteG2(pool, input.patient_no);
            var result2 = await Patient.deleteG3(pool, input.patient_no);
            
            if(result2){
                // console.log("T3");
                // console.log(input.user_no);
                var result3 = await Patient.deletePatient(pool, input.user_no);
                // console.log("re3: "+result3);

                if(result3){
                    // console.log("T4");
                    await Patient.deleteUserPatient(pool, input.user_no);

                    res.json({
                        result: true
                    });
                }
            }
        }

    }catch(ex) {
        res.json({
            result: false,
            message: ex.message
        });
    }
});

app.get("/api/patientData/:patientNo", async (req, res) => {
    const patientNo = req.params.patientNo;

    try {
        // console.log("p1");
        var result = await Patient.getByPatientNo(pool, patientNo);

        if(result){
            
            var result1 = await Patient.getG1ByPatientNo(pool, patientNo);
            var result2 = await Patient.getG2ByPatientNo(pool, patientNo);
            var result3 = await Patient.getG3ByPatientNo(pool, patientNo);

            res.json({
                result: true,
                data: result,
                data1: result1,
                data2: result2,
                data3: result3
            })
        }

    } catch (ex) {
        res.json({
            result: false,
            message: ex.message
        });
    }
});

app.post("/api/patient/add", checkAuth, async (req, res) => {
    const input = req.body;

    // console.log(input.username);
    // console.log(input.password);

    try{

        var result = await Patient.isDuplicate(pool, input.username, null);

        if(!result){

            var time = input.min * 60;
            time = time + parseInt(input.sec);

            var result1 = await Patient.addPatientUserPass(pool, input.username, input.password);

            if(result1){
                var result2 = await Patient.selectUser(pool, input.username, input.password);
                    if(result2){
                        var result3 = await Patient.addPatient(pool, input.sex, input.date, input.weight, input.height, input.neck, input.arm, input.bust, input.diseases, result2.rows[0].user_no);

                        if(result3){
                            var result4 = await Patient.selectPatientNo(pool, result2.rows[0].user_no);
                            if(result4){
                                var result5 = await Patient.addG1(pool, time, result4.rows[0].patient_no);
                                if(result5){
                                    console.log("5555555555");
                                    console.log(input.gTwo);
                                    await Patient.addG2(pool, input.gTwo, result4.rows[0].patient_no);
                                    await Patient.addG3(pool, input.gThree, result4.rows[0].patient_no);

                                    res.json({
                                        result: true
                                    })
                                }
                            }
                            
                        }
                    }
            }else{
                res.json({
                    result: false
                })
            }
        }else {
            res.json({
                result: false,
                message: "ชื่อผู้ใช้งานซ้ำ"
            })
        }

        

    }catch (ex) {
        res.json({
            result: false,
            message: ex.message
        });
    }
})

app.post("/api/patient/update", checkAuth, async (req, res) => {
    const input = req.body;

    try {

        var time2 = input.min * 60;
        time2 = time2 + parseInt(input.sec);

        // console.log("p1");

        var result1 = await Patient.updatePatient(pool, 
            input.patientNo, 
            input.sex, 
            input.date, 
            input.weight, 
            input.height, 
            input.neck, 
            input.arm, 
            input.bust, 
            input.diseases);

            if(result1){
                // console.log("p2");
                await Patient.updateG1(pool, time2, input.patientNo);
                await Patient.updateG2(pool, input.gTwo, input.patientNo);
                await Patient.updateG3(pool, input.gThree, input.patientNo);
                // console.log("p3");
                res.json({
                    result: true
                });
            }
    } catch (ex) {
        res.json({
            result: false,
            message: ex.message
        });
    }
})

app.get("/api/report", checkAuth, async (req, res) => {
    try {
        var result = await Patient.getSumGame(pool);

        res.json({
            result: true,
            data: result
        });
    } catch (ex) {
        res.json({
            result: false,
            message: ex.message
        });
    }
});

//----------------------------------------------------------------------------------------
// pool.query('Select * from username_password', (err, res) => {
//     if(!err){
//         console.log(res.rows);
//     }else{
//         console.log(err.message);
//     }
//     pool.end;
// })
//
 //!require("./routes")(client,app); Rount_P API
// app.get('/api/v2/patient',async (req, res) => {
//             console.log("hhh");
//             pool.query("SELECT * FROM patient",  (error, results) => {
//                      if(error) throw error;
            
//                     res.json(results);
            
//                     try{
//                          res.json(results.rows);
//                          res.send("Welcome to Unity Success");
//                           res.json(results.rows[0]);
//                     }catch (error){
//                         res.status(500).send(error);
//                    }
//                  });
    
//         }) 

/* The above code is a POST request to the server. It is sending the data from the form to the server. */
app.post("/api/person/add", checkAuth,async (req, res) => {
    const input = req.body;

    console.log(input.username);
    console.log(input.password);

    try{

        /* Checking if the username is already in the database. */
        var result = await role_user.isDuplicate(pool, input.username, null);
        console.log(result);
        if(!result){

            /* Checking if the username is already in the database. */
            var result1 = await role_user.addUserPass(pool, input.username, input.password);
             //console.log(result1);
            if(result1){
                try {
                   /* Calling the selectUser function in the role_user.js file. */
                   var result2 = await role_user.selectUser(pool, input.username, input.password);
                
               } catch (error) {
                console.log(error);
                
               }
                //console.log(result2); 
                if(result2){
                        console.log( input.name, input.lastname, input.sex, input.date, result2.rows[0].person_no);
                        
                        try 
                    {
                        /* Adding the user to the database. */
                        var result3 = await role_user.addUser(pool, input.name, input.lastname, input.sex, input.date, result2.rows[0].person_no);
                            //console.log(result3); 
                            
                        } catch (error) {
                            console.log(error);
                        }
                        
                      
                        // if(result3){
                        //     var result4 = await role_user.selectPersonNo(pool, result2.rows[0].person_no);
                        //  if(result4){
                        //         var result5 = await role_user.addG1(pool, time, result4.rows[0].person_no);
                        //         if(result5){
                        //             console.log("5555555555");
                        //             console.log(input.gTwo);
                        //             await Patient.addG2(pool, input.gTwo, result4.rows[0].patient_no);
                        //             await Patient.addG3(pool, input.gThree, result4.rows[0].patient_no);

                        //             res.json({
                        //                 result: true
                        //             })
                        //         }
                        //      }
                            
                        // }
                    }
                }else{
                    res.json({
                        result: false
                    })
                }
            }else {
                res.json({
                    result: false,
                    message: "ชื่อผู้ใช้งานซ้ำ"
                })
            }
    
        }catch (ex) {
            res.json({
                result: false,
                message: ex.message
            });
        }
    })
    app.post("/api/person/update", checkAuth, async (req, res) => {
        const input = req.body;
        // console.log(input);
    
        try {
    
            // console.log("p1");
    
            var result1 = await role_user.updatePersonNo(pool, 
                input.personNo,
                input.name,
                input.lastname, 
                input.sex, 
                input.date
                );
    
                res.json({
                            result: true
                        });
        } catch (ex) {
            res.json({
                result: false,
                message: ex.message
            });
        }
    })

    
app.get("/api/personData/:personNo", async (req, res) => {
    const personNo = req.params.personNo;

    try {
        // console.log("p1");
        /* Getting the role_user data from the database. */
        var result = await role_user.getByPersonNo(pool, personNo);

        if(result){
            
            // var result1 = await Patient.getG1ByPatientNo(pool, patientNo);
            // var result2 = await Patient.getG2ByPatientNo(pool, patientNo);
            // var result3 = await Patient.getG3ByPatientNo(pool, patientNo);

            res.json({
                result: true,
                data: result,
                // data1: result1,
                // data2: result2,
                // data3: result3
            })
        }

    } catch (ex) {
        res.json({
            result: false,
            message: ex.message
        });
    }
});

app.get("/api/department_types", checkAuth, (req, res) => {
    const query = "SELECT * FROM department";

    pool.query(query, (error, results) => {
        if(error) {
            res.json ({
                result: false,
                message: error.message
            })
        }else {
            
            res.json({
                result: true,
                data: results
            });
        }
    });
});

app.get("/api/users/department_type/:department_no", checkAuth, (req, res) => {
    const departmentId = req.params.department_no;
    const sql = "SELECT a.*, b.department_name "
                + "FROM username_password a "
                + "JOIN department b ON a.department_no = b.department_no ";

    // console.log(departmentId);
    if (departmentId == 0){
        pool.query(sql, (error, results) => {
            if(error) {
                res.json({
                    result: false,
                    message: error.message
                });
            }else {
                res.json({
                    result: true,
                    data: results
                });
            }
        });
    }else {
        pool.query(sql + "WHERE a.department_no = $1",
        [departmentId], (error, results) => {
            if (error){
                res.json({
                    result: false,
                    message: error.message
                });
            } else {
                res.json({
                    result: true,
                    data: results
                });
            }
        });
    }
});

app.post("/api/authen_request", (req, res) => {
    const query = "SELECT * FROM username_password WHERE MD5(username) = $1";
    pool.query(query, [req.body.username], (error, results) => {
        var response;
        if (error) {
            response = {
                result: false,
                message: error.message
            };
        } else {
            console.log(results);
            if (results) {
                var payload = {username: req.body.username};
                var secretKey= "MySecretKey";
                const authToken = jwt.sign(payload, secretKey);
                response = {
                    result: true,
                    data: {
                        auth_token: authToken
                    }
                };
            } else {
                response = {
                    result: false,
                    message: "Username ไม่ถูกต้อง"
                };
            }
        }
        res.json(response);
    });
});

app.post("/api/access_request", (req, res) => {
    const authenSignature = req.body.auth_signature;
    const authToken = req.body.auth_token;

    // console.log(req.body);

    var decoded = jwt.verify(authToken, "MySecretKey");

    if(decoded) {
        const query = "SELECT a.user_no, a.username, a.pwd, a.department_no, b.department_name "
            + "FROM username_password a JOIN department b ON a.department_no = b.department_no where MD5(CONCAT(username, '&', pwd)) = $1";
            pool.query(query, [authenSignature], (error, results) => {
            var response;
            if(error) {
                response = {
                    results: false,
                    message: error.message
                };
            }else{
                console.log(results.rows);
                
                if(results.rows.length) {
                    console.log("11");
                    var payload = {
                        user_no: results.user_no, username: results.username, pwd: results.pwd,
                        department_no: results.department_no, department_name: results.department_name
                    };
                    const accessToken = jwt.sign(payload, "MySecretKey");
                    response = { result: true, data: { access_token: accessToken, account_info: payload } };
                }else {
                    console.log("22");
                    response = { result: false, message: "ชื่อผู้ใช้งาน หรือ รหัสผ่าน ไม่ถูกต้อง"};
                }
            }
            res.json(response);
        });
    }
});

app.get("/api/role_user",checkAuth, (req, res) => {
    let query = "SELECT * FROM role_user";

    console.log("Here");

    // pool.query("SELECT * FROM role_user", (error, results, fields) => {
    //     console.log("Here2");
    //     if(error) throw error;

    //     try{
    //         res.json(results.rows[0].weight);
    //         // console.log(results);
    //     }catch (error){
    //         res.status(500).send(error);
    //     }
        

    // })

    pool.query(query, (error, results) => {
        console.log("Here2");
        if (error){
            res.json({
                result: false,
                message: error.message
            });
        } else {
            res.json({
                result: true,
                data: results.rows
            });
            console.log("Here3");
        }
        
    });
    
    console.log("Here4");
});

// app.get("/api/role_user", checkAuth, (req, res) => {
//     const query = "SELECT * FROM role_user";

//     pool.query(query, (error, results) => {
//         if (error) {
//             res.json({
//                 result: false,
//                 message: error.message
//             })
//         } else {
//             res.json({
//                 result: true,
//                 data: results
//             });
//         }
//     });
// });

// app.post("/api/role_user/delete", checkAuth, async (req, res) => {
//     const input = req.body;

//     try{
//         // console.log("T1");

//         var result1 = await role_user.deleteUser(pool, input.person_no);

//     }catch(ex) {
//         res.json({
//             result: false,
//             message: ex.message
//         });
//     }
// });




 
app.get("/api/game_report/:patientNo", checkAuth, (req, res) => {
    const person_no = req.params.patientNo;
    const query = "SELECT * FROM game WHERE person_no = $1";

    pool.query(query, [person_no], (error, results) => {
        if (error) {
            res.json({
                result: false,
                message: error.message
            })
        } else {
            res.json({
                result: true,
                data: results
            });
        }
        pool.end();
    });
})

app.post("/api/role_user/delete", checkAuth, async (req, res) => {
    const input = req.body;

    try{
        var result = await role_user.deleteUser(pool, input.person_no);
        
        if(result){
            var result2 = await role_user.deleteUserUser(pool, input.person_no);
        }

        res.json({
            result: true
        });

    }catch(ex) {
        res.json({
            result: false,
            message: ex.message
        });
    }
});

app.get("/api/product/:productId", async (req, res) => {
    const patientNo = req.params.patientNo;

    try {
        var result = await role_user.getByPatientNo(pool, patientNo);

        res.json({
            result: true,
            data: result
        })
    } catch (ex) {
        res.json({
            result: false,
            message: ex.message
        });
    }
});

         

app.listen(port, hostname, () => {
    console.log(`Server runing at http://${hostname}:${port}/`);
});