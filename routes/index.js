var express = require('express');
var router = express.Router();


var quizController = require("../controllers/quiz-controller");


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

router.get("/quizes/new", quizController.new);
router.post("/quizes/create", quizController.create);






router.get("/quizes", quizController.index);
router.param('quizId', quizController.load);
router.get("/quizes/:quizId", quizController.show);
router.get("/quizes/:quizId/answer", quizController.answer);

router.get("/author", quizController.creditos);


module.exports = router;

