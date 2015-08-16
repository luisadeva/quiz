var models = require('../models/models.js');


exports.new = function (req, res) {
    console.log("entramos en new:" + req.params.quizId);
    
    res.render('comments/new.ejs', {quizId: req.params.quizId, errors:[]});
};


exports.create = function(req, res) {
  var comment = models.Comment.build( {texto: req.body.comment.texto, QuizId: req.params.quizId} );

  comment
  .validate()
  .then(
    function(err){
      if (err) {
        res.render('comments/new.ejs', {comment: comment, quizId: req.params.quizId, errors: err.errors});
      } else {
        comment // save: guarda en DB el comentario
        .save()
        .then( function(){ res.redirect('/quizes/'+req.params.quizId)}) 
      }      // res.redirect: Redirección HTTP a lista de preguntas
    }
  ).catch(function(error){next(error)});
};


exports.load = function(req, res, next, quizId) {
    console.log('cargamos comentarios:' + quizId);
    models.Quiz.find(
		{
			where: {id: Number(quizId)},
			include: [{model: models.Comment}]
		}).then(
        function (quiz) {
            if (quiz) {
                req.quiz = quiz;
                next();
            } else {
				next(new Error('No existe quizId=' + quizId))
			}
			
        }
    ).catch(function(error){next(error)});
};