// var format = require('pg-format');
// const express = require('express');

// module.exports = (client,app)=> {
//     app.get('/api/v2/patient', (req, res) => {
//         console.log("hhh");
//         client.query("SELECT * FROM patient",  (error, results, fields) => {
//                 if(error) throw error;
        
//                 //res.json(results);
        
//                 try{
//                     //res.json(results.rows);
//                     //res.send("Welcome to Unity Success");
//                     res.json(results.rows[0]);
//                 }catch (error){
//                     res.status(500).send(error);
//                 }
//             });

//     }) 
    
// }