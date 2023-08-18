const { user } = require('../config');
const con = require('../database');



submitAnswer=(req,res)=>{
    const user_id = req.body.user_id;
    const quiz_id = req.body.quiz_id;
    const question_id = req.body.question_id;
    const submit_ans = req.body.submit_ans;
    const correct_ans= req.body.correct_ans;
    if (user_id== null || user_id==undefined){
        res.json({'code':400,'status':false,'message':'user id is required'});  
    }else if(question_id==null || question_id==undefined){
      res.json({'code':400,'status':false,'message':'question_id is required'});  
    }else if(submit_ans==null || submit_ans==undefined){
      res.json({'code':400,'status':false,'message':'submit_ans is required'});  

    }else if(correct_ans==null || correct_ans==undefined){
      res.json({'code':400,'status':false,'message':'correct_ans is required'});  
    }
     else {
     let sql="INSERT INTO participants(quiz_id,question_id,submit_ans,correct_ans,user_id) values(?,?,?,?,?)"
    var values=[quiz_id,question_id,submit_ans,correct_ans,user_id];
con.query(sql,values,function(err,result){
      if(err)throw err;
      console.log("Answer submitted successfully"+result);
      res.json({'code':200,'status':true,'message':'Answer submitted successfully'})  
    });
  }
}
  attemptQuestionNo=(req,res)=>{
    const sql = "Select * from participants";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Result: " + JSON.stringify(result));
        res.json(result);
    });
  }
 showResult=(req,res)=>{
   const quiz_id=req.body.quiz_id;
   const user_id=req.body.user_id;
   if (quiz_id== null || quiz_id==undefined){
    res.json({'code':400,'status':false,'message':'quiz id is required'});  
   }else if(user_id==null || user_id==undefined){
    res.json({'code':400,'status':false,'message':'user id is required'});  

   }
   else { 
   const sql= `SELECT COUNT(quiz_id) FROM questions WHERE quiz_id='${quiz_id}'`;
   con.query(sql, function (err, result) {
    if (err) throw err;

    res.json({'code':400,'status':false,'message':'quiz id is required'});  
    console.log("Result: " + JSON.stringify(result));
    res.json(result);
    const count=0;
    const sql1=`select* from participants where user_id='${user_id}'`;
    for (let i=0; i<result.length; i++){
        if(submit_ans==correct_ans){
            count++;
        }
    }
       con.query(sql1, function (err, count){
        if (err) throw err;
        const submit_ans=req.body.submit_ans;
        const correct_ans=req.body.correct_ans;
     
        console.log("Result: " + JSON.stringify(count));
        res.json(count);
        const score=req.body.score;
        const sql2=`update participants set score='${score}'`;
       con.query(sql2, function (err, score) {
       if (err) throw err;
       console.log("Result: " + JSON.stringify(score));
       res.json(score);
});
});
   });
}
 }


 showResultNew=(req,res)=>{
  let totalQuestion = 0;
  const quiz_id=req.body.quiz_id;
  const user_id=req.body.user_id;
  let correctAnswers = 0;
  let wrongAnswers = 0;
  if (quiz_id== null || quiz_id==undefined){
   res.json({'code':400,'status':false,'message':'quiz id is required'});  
  }else if(user_id==null || user_id==undefined){
   res.json({'code':400,'status':false,'message':'user id is required'});  
  }
  else { 
  const sql= `SELECT COUNT(quiz_id) as totalQuestion FROM questions WHERE quiz_id='${quiz_id}'`;
  con.query(sql, function (err, result) {
   if (err) {
    res.json({'code':400,'status':false,'message':'There is something went wrong at server.'});
   };
    totalQuestion = result[0].totalQuestion;
   console.log("totalQuestion: ", totalQuestion);
  })
  const getResult = `SELECT * from participants WHERE quiz_id='${quiz_id}' AND user_id='${user_id}'`;
  con.query(getResult, function (errResult, getAllresult) {
    if (errResult) {
      res.json({'code':400,'status':false,'message':'There is something went wrong at server.'});
    };
    console.log("getAllResult: ", JSON.stringify(getAllresult));
    console.log("getAllResult: ", getResult);
    for (let i=0; i<getAllresult.length; i++){
      if(getAllresult[i].submit_ans==getAllresult[i].correct_ans){
        correctAnswers++;
      } else {
        wrongAnswers++;
      }
    }
    res.json({'code':200,'status':true,'message':'Result Fetched', 'data':{correctAnswers, wrongAnswers, totalQuestion}});  
  })
 
}
 }


 showDetailedResult=(req,res)=>{




 }
module.exports ={submitAnswer,showResult,showDetailedResult,attemptQuestionNo, showResultNew}





































