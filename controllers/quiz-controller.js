var models = require('../models/models.js');

exports.question = function (req, res) {
    models.Quiz.findAll().then(
        function (quiz) {
            res.render('quizes/question', {pregunta: quiz[0].pregunta});
        }
    );
};


exports.answer = function (req, res) {
    console.log("LLEGA quiz-controller asnswer");
    models.Quiz.findAll().then(
        function(quiz) {
            if (req.query.respuesta === quiz[0].respuesta) {
                res.render("quizes/answer", {respuesta: "Correcto"});
            } else {
                res.render("quizes/answer", {respuesta: "Incorrecto"});
            }
        }
    );
    
    
}

exports.creditos = function (req, res) {
    
    res.render('author', {autor: {nombre: "Luis Adeva", email: "asdasd@asdasd", foto: "me.jpg"} });
};
