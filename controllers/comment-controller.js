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


exports.load = function(req, res, next, commnentId) {
    console.log('cargamos comentario:' + commnentId);
    models.Comment.find(
		{
			where: {id: Number(commnentId)}
		}).then(
        function (comment) {
            if (comment) {
                req.comment = comment;
                next();
            } else {
				next(new Error('No existe commnentId=' + commnentId))
			}
			
        }
    ).catch(function(error){next(error)});
};

exports.publish = function(req, res) {
    console.log("Comentario a publicar " + req.comment);
    req.comment.publicado = true;

  req.comment.save( {fields: ["publicado"]})
    .then( function(){ res.redirect('/quizes/'+req.params.quizId);} )
    .catch(function(error){next(error)});
};

