const express = require('express');
const pool = require('../database/conexion.js')

const app = express();

app.get('/', (req, res) => {
   res.send('Hola');
})

app.post('/', (req, res) => {

   const {
      reconocido,
      valores,
      reconocedor,
      mensaje
   } = req.body;
   
   // reconocido reconocedor valor1 valor2 valor3 mensaje 
   const query = `INSERT INTO reconocimientos_mercadeo VALUES (NULL, ?, ?, ?, ?, ?, ?, NULL)`

   pool.getConnection((err, connection) => {

      if (err) throw err;

      connection.query(query, [reconocido, reconocedor, valores[0], valores[1], valores[2], mensaje], (error, results, fields) => {

         if (error) throw error;

         res.send(results[0]);
         connection.release();
      });
   })

})

module.exports = app;