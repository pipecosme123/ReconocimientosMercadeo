const fs = require('fs');
const path = require('path');

const createImage = (req, res, next) => {

   const {
      imagen
   } = req.body;

   let nameImagen = new Date().getTime();
   const img = imagen.toString().replace('data:image/jpeg;base64,', '');
   const buf = Buffer.from(img, 'base64');

   fs.writeFile(`./src/upload/${nameImagen}.jpg`, buf,(err)=>{
      if(!err){
         console.log('createImage');
         req.body.nameImagen = nameImagen;
         next();
      }else{
         next(err);
      }
   });

}

module.exports = createImage;