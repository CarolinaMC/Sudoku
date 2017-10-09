/*
 Primer proyecto de paradigmas de programación.
 Sudoku.
 II Ciclo 2017.
 Universidad Nacional de Costa Rica.
 Cynthia Madrigal Quesada 1-1510-0465 Grupo:10:00 a.m. 1-1510-0465 Grupo:10:00 a.m.
 #
 #
 #
 */

let SUDOKU = require('./models/model');
Sudoku = require("./public/js/Sudoku").Sudoku,
        Generador = require("./public/js/Generador").Generador;

exports.findAllSudokus = (req, res)=>{
    SUDOKU.find((err, sudokus)=>{
        console.log('GET /sudokus');
        err ? res.send(500, err.message)
            : 0;
        res.status(200).jsonp(sudokus);
    });
};

exports.findSudokuById = (req, res)=> {
    SUDOKU.findById(req.params.id, (err, sudoku)=> {
        console.log('GET /sudoku/' + req.params.id);
        return err ? res.send(500, err.message)
                   : res.status(200).jsonp({sudoku: sudoku});
    });
};

exports.addSudoku = (req, res)=> {
    console.log('POST');
    console.log(req.params.dificultad);

    let dificultad = req.params.dificultad;
    let generador = new Generador();

    var sudoku = new Sudoku(generador, dificultad);
    let model = new SUDOKU({
        casillas: sudoku.casillas,
        dificultad: sudoku.dificultad,
        numeros: sudoku.numeros
    });
    model.save((err, sudoku) => 
        err ? res.status(500).send(err.message)
            : res.status(200).json({sudoku: sudoku})    
    );
};

/*
 *Función encargada de guardar el estado del sudoku
 *recibe al sudoku en notación JSON en el parametro sudoku
 *retorna 200 en el caso de que se guardara bien
 *        500 en caso de algún fallo.
 */
exports.updateSudoku = (req, res) => {
    console.log("***GUARDANDO SUDOKU***");
    let sudoku = JSON.parse(req.params.sudoku);
    console.log(`--- ${sudoku._id}---`);
    SUDOKU.findOneAndUpdate(
            {_id: sudoku._id},
            sudoku,
            (err, ok) => err ? res.status(500).jsonp({mensaje: err})
                : res.status(200).jsonp({mensaje: "ok"})
    );
};

exports.deleteSudoku = (req, res)=> {
    SUDOKU.findById(req.params.id, (err, sudoku)=>{
        sudoku.remove( err=> 
            err ? res.status(500).send(err.message)
                :res.status(200).send()
        );
    });
};



exports.deleteAll = (req, res) =>
    SUDOKU.remove({}, err =>
        (err) ? console.log(err)
                : res.end('success')
    );

