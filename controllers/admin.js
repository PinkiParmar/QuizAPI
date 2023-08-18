const { user, password } = require('../config');
const con = require('../database');
const { Encrypt } = require('../auth');
const jwt = require('jsonwebtoken'); 
const dotenv = require("dotenv")
dotenv.config()
const secretKey = process.env.SECRET_KEY;
const expiresIn = process.env.EXPIRES_IN;

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
                    const token = jwt.sign({payload}, secretKey, { expiresIn:3000 });
                    res.json({'code':200,'status':true,'message':'Logged in successfully.', 'data': {"token": token, "role":payload.role}});
                    return true
                }

            }
        });
    }
}
AddQuiz=(req,res)=>{
    const user_id = req.body.user_id;
   
    if (user_id== null || user_id==undefined){
        res.json({'code':400,'status':false,'message':'user id is required'});  
     }else{
    let sql="INSERT INTO quiz (quiz_title,quiz_date,no_of_questions,passing_marks,each_question_marks, user_id) VALUES(?,?,?,?,?,?)";
    var values=[req.body.quiz_title,req.body.quiz_date,req.body.no_of_questions,req.body.passing_marks,req.body.each_question_marks, req.body.user_id];
    con.query(sql,values,function(err,result){
      if(err)throw err;
      console.log("Quiz added successfully"+result);
      res.json({'code':200,'status':true,'message':'Quiz added successfully'})  
    
    });
  }
}
  getQuiz =(req, res)=> {
    const user_id = req.body.user_id;
    if (user_id== null || user_id==undefined){
        res.json({'code':400,'status':false,'message':'user id is required'});  
    } else {
    const sql = `Select * from quiz WHERE user_id='${user_id}'`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Result: " + JSON.stringify(result));
        res.json(result);
    });
}
  }

AddQuestions=function(req,res){
    const quiz_id = req.body.quiz_id;
    const question = req.body.question;
    const option_a = req.body.option_a;
    const option_b = req.body.option_b;
    const option_c = req.body.option_c;
    const option_d = req.body.option_d;
    const correct_ans=req.body.correct_ans;
    if (quiz_id== null || quiz_id==undefined){
        res.json({'code':400,'status':false,'message':'Quiz id is required'});  
     }
    else if (question== null || question==undefined){
        res.json({'code':400,'status':false,'message':'question is required'});  
    }else if(option_a==null || option_a== undefined || option_b==null || option_b==undefined || option_c==null || option_c==undefined || option_d==null || option_d==undefined ){
        res.json({'code':400,'status':false,'message':'all 4 options are required'});  

    }else if(correct_ans==null || correct_ans==undefined){
        res.json({'code':400,'status':false,'message':'one option must be choose as a correct answer'});  
    }
     else {
        let sql="INSERT INTO questions (question,option_a,option_b,option_c,option_d,correct_ans, quiz_id) VALUES(?,?,?,?,?,?, ?)";
        var values=[question,option_a,option_b,option_c,option_d,correct_ans, quiz_id];
        con.query(sql,values,function(err,result){
          if(err)throw err;
          console.log("Question added successfully"+result);
          res.json({'code':200,'status':true,'message':'Question added successfully'})  
        });
    }
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
    
    
    getParticipantsList = function (req, res) {
    
        const sql = "Select * from participants";
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Result: " + JSON.stringify(result));
            res.json(result);
        });
    }
module.exports ={loginAPI,AddQuiz,getQuiz, AddQuestions,getQuestions, getParticipantsList}