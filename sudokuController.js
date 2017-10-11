/*
 Primer proyecto de paradigmas de programación.
 Sudoku.
 II Ciclo 2017.
 Universidad Nacional de Costa Rica.
 Cynthia Madrigal Quesada 1-1510-0465 Grupo:10:00 a.m. 1-1510-0465 Grupo:10:00 a.m.
 Greivin Rojas Hernadez 4-0211-0725 Grupo:10:00 a.m. 4-0211-0725 Grupo:10:00 a.m.
 Elena Carolina Mora Cordero 1-1553-0351 Grupo:10:00 a.m. 1-1553-0351 Grupo:10:00 a.m.
 Daniel Mora Cordero 1-1473-0950 Grupo:10:00 a.m. 1-1473-0950 Grupo:10:00 a.m.
 #
 #
 #
 */

let SUDOKU = require('./models/model');
Sudoku = require("./public/js/Sudoku").Sudoku,
        Generador = require("./public/js/Generador").Generador;

		
/*
 *Función encargada de enviar todas las partidas de sudokus guardadas en la base de datos
 *envia los sudokus en notación JSON 
 *retorna 200 en el caso de que se enviaran bien
 *        500 en caso de algún fallo.
 */		
exports.findAllSudokus = (req, res)=>{
    SUDOKU.find((err, sudokus)=>{
        console.log('GET /sudokus');
        err ? res.send(500, err.message)
            : 0;
        res.status(200).jsonp(sudokus);
    });
};


/*
 *Función encargada de retornar un sudoku guardado en la base de datos buscado por su id
 *recibe el id del sudoku en notación JSON en el parametro id
 *retorna 200 en el caso de que se encontrara en la base y retorna el sudoku
 *        500 en caso de algún fallo.
 */
exports.findSudokuById = (req, res)=> {
    SUDOKU.findById(req.params.id, (err, sudoku)=> {
        console.log('GET /sudoku/' + req.params.id);
        return err ? res.send(500, err.message)
                   : res.status(200).jsonp({sudoku: sudoku});
    });
};


/*
 *Función encargada de guardar y crear el sudoku
 *recibe la dificultad del sudoku en notación JSON en el parametro dificultad
 *retorna 200 en el caso de que se guardara bien y retorna el nuevo sudoku
 *        500 en caso de algún fallo.
 */
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
    console.log(`---  ${sudoku._id}---`);
    SUDOKU.findOneAndUpdate(
            {_id: sudoku._id},
            sudoku,
            (err, ok) => err ? res.status(500).jsonp({mensaje: err})
                : res.status(200).jsonp({mensaje: "ok"})
    );
};


/*
 *Función encargada de guardar el estado del sudoku
 *recibe al sudoku en notación JSON en el parametro sudoku
 *retorna 200 en el caso de que se guardara bien
 *        500 en caso de algún fallo.
 */
exports.deleteSudoku = (req, res)=> {
    SUDOKU.findById(req.params.id, (err, sudoku)=>{
        sudoku.remove( err=> 
            err ? res.status(500).send(err.message)
                :res.status(200).send()
        );
    });
};


/*
 *Función encargada de borrar el sudoku
 *recibe el id del sudoku en notación JSON en el parametro id
 *retorna 200 en el caso de que se borrara bien
 *        500 en caso de algún fallo.
 */
exports.deleteAll = (req, res) =>
    SUDOKU.remove({}, err =>
        (err) ? console.log(err)
                : res.end('success')
    );

