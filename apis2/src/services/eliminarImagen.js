const fs = require('fs');
const path = require('path');

const eliminarImagen = (req, res, next) => {

   const {
      nameImagen
   } = req.body;

   fs.rmSync(path.join(__dirname, `../upload/${nameImagen}.jpg`));
   
   console.log('Archivo eliminado');

}

module.exports = eliminarImagen;