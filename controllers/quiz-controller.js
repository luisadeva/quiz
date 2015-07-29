var models = require('../models/models.js');


exports.load = function(req, res, next, quizId) {
    console.log('cargamos pregunta:' + quizId);
    models.Quiz.find(quizId).then(
        function (quiz) {
            if (quiz) {
                req.quiz = quiz;
                next();
            }
        }
    ).catch(function(error){next(error)});
}

exports.index = function (req, res) {
    
    var cadenaBusqueda = "%";
    
    if (req.query.search) {
        cadenaBusqueda += req.query.search.trim().replace(/ /g, '%') + '%';
    }
    
    console.log("Cadena de busqueda: " + cadenaBusqueda);
    models.Quiz.findAll({where: ["pregunta like ?", cadenaBusqueda]}).then (
            function(quizes) {res.render('quizes/index', {quizes:quizes});}
    ).catch(function (error){next(error)});
    
    
}


exports.show = function (req, res) {
    res.render('quizes/show', {quiz: req.quiz});
};


exports.answer = function (req, res) {
    console.log("LLEGA quiz-controller asnswer");
    if (req.query.respuesta === req.quiz.respuesta) {
        res.render("quizes/answer", {respuesta: "Correcto", quiz: req.quiz});
    } else {
        res.render("quizes/answer", {respuesta: "Incorrecto", quiz: req.quiz});
    }
        
   
    
    
}

exports.creditos = function (req, res) {
    
    res.render('author', {autor: {nombre: "Luis Adeva", email: "asdasd@asdasd", foto: "me.jpg"} });
};
