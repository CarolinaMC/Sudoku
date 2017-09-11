/***********************valores*********************/
const errConectClientM= -1;
const errTrans        = -2;
const success         =  0;
const schema          = "sudoku";
const url = 'mongodb://localhost/sudokus';
/**************************************************/

/*********************importaciones****************/
const express    = require('express'),
      //db = require("./db/db");
      bodyParser = require('body-parser'),
      app        = express(),
      morgan     = require('morgan'),
      fs         = require('fs'),
     //mongodb    = require('mongodb'),
	  mongoose = require("mongoose"),
      sudoku     = require("./public/js/Sudoku"),
	  generador     = require("./public/js/Generador");
	  var sudokuCtrl = require('./sudokuController');
	  
      
console.log("require's: ok");
/*************************************************/


/****************configuración de app*************/
app.use(express.static('public'));///acceso a los archivos
app.use(morgan('dev'));///logger
app.use(bodyParser.urlencoded({
                                    limit: "50mb",
                                    extended: true 
                            }));
app.use(bodyParser.json({limit: "50mb"}));
//app.post('/insertar', mongodb.insertar );
console.log("app configurada");
/**************************************************/

/******************ruteo con express******************/
const port   = process.env.PORT || 8080;
const router = express.Router();
router.use((req, res, next)=>{
	console.log('entrada.');
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});


app.set('port', port)

app.get('/', function(req, res){
  res.json({ mensaje: 'Respuesta JSON'});
});
/******************************************************/

/***************************acciones****************/
const objectText = result => result.text();

router.get('/', (req, res)=> {	
	res.json( { message: 'SUDOKU'} );	
});

///////////////////////////////////////////////////////////////////////////////
// CONNECT TO DB
mongoose.connect(url,
                 {
					 useMongoClient: true
				 } 
);

router.route('/sudokus')
  .get(sudokuCtrl.findAllSudokus)
  .post(sudokuCtrl.addSudoku);

  router.route('/sudokus/:id')
  .get(sudokuCtrl.findSudokuById)
  .put(sudokuCtrl.updateSudoku)
  .delete(sudokuCtrl.deleteSudoku);
  

/****************************iniciando el servidor*/
app.use('/api', router);

app.listen(port,function() {
    console.log("Node server listo" + port );
  });



