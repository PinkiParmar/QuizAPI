const { user, password } = require('../config');
const con = require('../database');
const { Encrypt } = require('../auth');
const jwt = require('jsonwebtoken'); 

getUserList = function (req, res) { // for testing purpose only
    const sql = "Select * from users";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Result: " + JSON.stringify(result));
        res.json(result);
    });
}

postSignIn=function(req, res){ //outdated login.
    console.log('req',req.body);
    const email = req.body.email;
    const password = req.body.password;
    const sql=`SELECT * FROM users WHERE email='${email}'`;
    con.query(sql, async function (err, data) {
        if (err) {
            console.log(err);
            res.json(err)
        }
        if (data.length == 0) {
            console.log("user not exist");
            res.json({ 'code': 400, 'status': false, 'message': 'Email is incorrect.' })
        }
        else {
            const data2 = {
                email: data[0]['email'],//???????????????????????????????????????
                password: data[0]['password']
            }
            console.log(data2);
            if (password==password){
                res.json({ 'code': 200, 'status': true, 'message': 'User login successfully.'})
            }
            else{
                res.json({ 'code': 400, 'status': false, 'message': 'Password is incorrect.'})
            }
        }
    })
}


getQuiz =(req, res)=> {
    const sql = "Select * from quiz";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Result: " + JSON.stringify(result));
        res.json(result);
    });
}


postAddQuiz=(req,res)=>{
            let sql="INSERT INTO quiz (quiz_title,quiz_date,no_of_questions,passing_marks,each_question_marks, user_id) VALUES(?,?,?,?,?,?)";
            var values=[req.body.quiz_title,req.body.quiz_date,req.body.no_of_questions,req.body.passing_marks,req.body.each_question_marks, req.body.user_id];
            con.query(sql,values,function(err,result){
              if(err)throw err;
              console.log("Quiz added successfully"+result);
              res.json({'code':200,'status':true,'message':'Quiz added successfully'})  
            });
          }
          getQuestions = function (req, res){
            const quiz_id = req.body.quiz_id;
            if (quiz_id== null || quiz_id==undefined){
                res.json({'code':400,'status':false,'message':'Quiz id is required'});  
            } else {
                const sql = `Select * from questions WHERE quiz_id='${quiz_id}'`;
                con.query(sql, function (err, result) {
                    if (err) throw err;
                    console.log("Result: " + JSON.stringify(result));
                    res.json(result);
                });    
            }
        }


 postAddQuestions=function(req,res){
            const quiz_id = req.body.quiz_id;
           
            if (quiz_id== null || quiz_id==undefined){
                res.json({'code':400,'status':false,'message':'Quiz id is required'});  
            } else {
                let sql="INSERT INTO questions (question,option_a,option_b,option_c,option_d,correct_ans, quiz_id) VALUES(?,?,?,?,?,?, ?)";
                
                
                var values=[req.body.question,req.body.option_a,req.body.option_b,req.body.option_c,req.body.option_d,req.body.correct_ans, quiz_id];
                // const data=[{
                //     question:"req.body.question",
                //     option_a:"req.body.option_a",
                //     option_b:"req.body.option_b",
                //     option_c:"req.body.option_c",
                //     option_d:"req.body.option_d",
                //     correct_ans:"req.body.correct_ans"}]
                // var values = [data];
                con.query(sql,values,function(err,result){
                  if(err)throw err;
                  console.log("Question added successfully"+result);
                  res.json({'code':200,'status':true,'message':'Question added successfully'})  
                });
            }
          }


        getTest = async (req, res) => {

        const email = req.body.email;
        console.log("email", email);
        const sql = "SELECT * FROM users WHERE email ='" + email + "'";
        console.log(sql);
        await con.query(sql, (err, result_data) => {
            console.log(result_data);
            if (err) {
                console.log(err);
                res.json(err)
            }else{
                console.log("result", result_data);
                res.json(result_data);
            }
        });
    }
    

    loginAPI = async (req, res) =>{
        const {email, password } =req.body;
        if (email===undefined || password ===undefined) {
            res.json({'code':400,'status':false,'message':'Email and Password must be provided.'});  
            return false;
        } else {
            const sqlQuery = `SELECT * FROM users WHERE email ='${email}' AND password='${password}'`;
            await con.query(sqlQuery, (err, results) => {
                if (err) {
                    console.log(err);
                    res.json({'code':400,'status':false,'message':'There is something went wrong at server.'});
                    return false;  

                    
                } else {
                    if (results.length<1){
                        res.json({'code':400,'status':false,'message':'Invalid Username or Password.'});
                        return false
                    } else if (results.length===1){
                        const payload = results[0];
                        const token = jwt.sign({payload}, 'mySecret', { expiresIn: 3000 });
                        res.json({'code':200,'status':false,'message':'Logged in successfully.', 'data': {"token": token, "role":payload.role}});
                        return true
                    }

                }
            });
        }
    }
    
    
    getParticipantsList = function (req, res) {
        const sql = "Select * from participants";
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Result: " + JSON.stringify(result));
            res.json(result);
        });
    }
   
module.exports ={getUserList,getQuiz,postAddQuiz,getQuestions,postAddQuestions,postSignIn,getTest, loginAPI,getParticipantsList}