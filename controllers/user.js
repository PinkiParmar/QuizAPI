const { user } = require('../config');
const con = require('../database');

getExamList = function (req, res) {
    const sql = "Select * from quiz";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Result: " + JSON.stringify(result));
        res.json(result);
    });
}
answerAPI=async(req,res)=>{
    const user_id=req.body.user_id;
    console.log("user_id",user_id);
    const sql=`SELECT * FROM answer WHERE user_id='${user_id}'`;
    console.log("sql",sql);
    await con.query(sql,(err,result)=>{
        console.log("result",result);
        if (err) {
            console.log(err);
            res.json(err);
        }else{
            console.log("result",result);
            res.json(result);
        }
    
    })
        }


submitAnswer=(req,res)=>{
     let sql="INSERT INTO participants(participant_id,quiz_id,question_id,submit_ans,correct_ans,user_id) values(?,?,?,?,?,?)"
    var values=[req.body.participant_id,req.body.quiz_id,req.body.question_id,req.body.submit_ans,req.body.correct_ans,req.body.user_id];
con.query(sql,values,function(err,result){
      if(err)throw err;
      console.log("Answer submitted successfully"+result);
      res.json({'code':200,'status':true,'message':'Answer submitted successfully'})  
    });
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



    

 }

 showDetailedResult=(req,res)=>{




 }




module.exports ={getExamList,answerAPI,submitAnswer,showResult,showDetailedResult,attemptQuestionNo}





































