var express = require('express');
var router = express.Router();


var quizController = require("../controllers/quiz-controller");
var commentController = require("../controllers/comment-controller");
var sessionController = require("../controllers/session-controller");
var userController = require("../controllers/user-controller");


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' , errors:[]});
});

router.get("/quizes/new", sessionController.loginRequired, quizController.new);
router.post("/quizes/create", sessionController.loginRequired, quizController.create);
router.get("/quizes/:quizId/edit", sessionController.loginRequired, quizController.edit);
router.put("/quizes/:quizId", sessionController.loginRequired, quizController.update);
router.delete("/quizes/:quizId", sessionController.loginRequired, quizController.destroy);

router.get("/quizes/:quizId/comments/new", commentController.new);
router.post("/quizes/:quizId/comments", commentController.create);


router.get("/quizes", quizController.index);
router.param('quizId', quizController.load);
router.get("/quizes/:quizId", quizController.show);
router.get("/quizes/:quizId/answer", quizController.answer);

router.get('/login', sessionController.new);
router.post('/login', sessionController.create);
router.get('/logout', sessionController.destroy); //destruir session, deberia ser delete





router.get("/author", quizController.creditos);


module.exports = router;

