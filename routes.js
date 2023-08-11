const express = require('express');
const router = express.Router();
const admin = require('./controllers/admin');
const user= require('./controllers/user');



router.get('/user-list', admin.getUserList);
router.get('/get-quiz-list',admin.getQuiz)
router.post('/add-quiz',admin.postAddQuiz);
router.post('/get-questions',admin.getQuestions);
router.post('/add-questions',admin.postAddQuestions);
router.post('/sign_in',admin.postSignIn);
router.post('/login_api',admin.loginAPI);
router.post('/test',admin.getTest);
router.get('/participants_list',admin.getParticipantsList)
router.get('/exam_list',user.getExamList)
router.post('/answer',user.answerAPI)
router.post('/submit_ans',user.submitAnswer)
router.get('/attempt_question_no',user.attemptQuestionNo)
router.post('/show_result',user.showResult)
router.post('/detailed_result',user.showDetailedResult)
module.exports = router;
