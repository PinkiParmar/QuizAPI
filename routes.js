const express = require('express');
const router = express.Router();
const users = require('./controllers/admin');
router.get('/user-list', users.getUserList);
router.post('/login',users.postLogin);
router.get('/get-quiz-list',users.getQuiz)
router.post('/add-quiz',users.postAddQuiz);
router.get('/get-questions',users.getQuestions);
router.post('/add-questions',users.postAddQuestions);
router.post('/sign_in',users.postSignIn);
router.post('/test',users.loginAPI);
module.exports = router;
