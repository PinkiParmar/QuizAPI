const express = require('express');
const router = express.Router();
const admin = require('./controllers/admin');
const user= require('./controllers/user');
const reqFilter= require('./middleware/middleware.js');



router.get('/get-quiz-list',admin.getQuiz)
router.post('/add-quiz',reqFilter,admin.AddQuiz);
router.post('/get-questions',admin.getQuestions);
router.post('/add-questions',admin.AddQuestions);
router.post('/login_api',admin.loginAPI);
router.get('/participants_list',admin.getParticipantsList)
router.post('/submit_ans',user.submitAnswer)
router.get('/attempt_question_no',user.attemptQuestionNo)
router.post('/show_result',user.showResultNew)
router.post('/detailed_result',user.showDetailedResult)
module.exports = router;
