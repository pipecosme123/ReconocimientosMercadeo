const fs = require('fs');
const path = require('path');
const nodeHtmlToImage = require('node-html-to-image');

const _Light = fs.readFileSync(path.join(__dirname, '..', 'view', 'font', 'Light.txt'));
const _Bold = fs.readFileSync(path.join(__dirname, '..', 'view', 'font', 'Bold.txt'));
const _BoldItalic = fs.readFileSync(path.join(__dirname, '..', 'view', 'font', 'BoldItalic.txt'));

const converImagemBase64 = (nameImagen) => {
   const image = fs.readFileSync(path.join(__dirname, '..', 'view', 'img', nameImagen));
   const base64Image = new Buffer.from(image).toString('base64');
   return dataURI = 'data:image/jpeg;base64,' + base64Image;
}

const crearImgValores = (valores) => {

   let htmlImagenes = "";

   let rawdata = fs.readFileSync(path.join(__dirname, '..', 'constants', 'valores.json'));
   let arrValues = JSON.parse(rawdata);

   for (let i = 0; i < valores.length; i++) {
      let filter = arrValues.filter((arr) => {
         return arr.valor === valores[i]
      })

      htmlImagenes += `
         <div class="imagenValor">
            <img src="${converImagemBase64(filter[0].img)}" alt="" />
         </div>
      `;
   }

   return htmlImagenes;

}

const createImage = (req, res, next) => {

   const {
      reconocido,
      valores,
      reconocedor,
      mensaje
   } = req.body;

   const imgValores = crearImgValores(valores);
   const nameImagen = new Date().getTime();

   nodeHtmlToImage({
      output: `./src/upload/${nameImagen}.jpg`,
      html: `
      <html>
         <head>
            <style>
               @font-face {
                  font-family: "Light";
                  src: url(${_Light}) format('woff2');
               }

               @font-face {
                  font-family: "Bold";
                  src: url(${_Bold}) format('woff2');
               }

               @font-face {
                  font-family: "BoldItalic";
                  src: url(${_BoldItalic}) format('woff2');
               }

               body {
                  width: 1080px;
                  height: 1080px;
                  background: url('../img/certificado.svg');
                  position: relative;
                  font-family: 'ExtraLight' !important;
               }

               .certificado .content-nombre-reconocido {
                  width: 100%;
               }

               .certificado .container {
                  width: 100%;
                  text-align: center;
                  position: absolute;
                  top: 720px;
               }

               .certificado p.mensaje {
                  width: 70%;
                  margin: 0 auto;
                  font-family: "Light";
                  font-size: 18px;
                  text-align: center;
                  color: #595655;
               }

               .certificado p.nombre-reconocido {
                  width: 100%;
                  margin: 0;
                  font-family: "BoldItalic";
                  font-size: 50px;
                  text-align: center;
                  position: absolute;
                  top: 323px;
                  color: #d2010d;
               }

               .certificado p.nombre-reconocedor {
                  width: 100%;
                  margin: 0;
                  font-family: "BoldItalic";
                  font-size: 40px;
                  text-align: center;
                  position: absolute;
                  top: 870px;
                  color: #595655;
               }

               .certificado .certificado-valores {
                  width: 100%;
                  margin: 0 auto;
                  text-align: center;
                  display: flex;
                  justify-content: center;
                  position: absolute;
                  top: 500px;
               }

               .certificado .certificado-valores .imagenValor img {
                  height: 190px;
                  margin: 0 40px;
               }

               .certificado .certificado-valores .imagenValor p {
                  font-family: "Bold";
                  font-size: 20px;
                  color: var(--color-verde);
               }
            </style>
         </head>

         <body>
            <img src="{{dataURI}}" alt="" />

            <div class='certificado' id='certificado'>

               <p class="nombre-reconocido">{{reconocido}}</p>

               <div class="certificado-valores">
                  ${imgValores}
               </div>

               <div class="container">
                  <p class="mensaje">{{mensaje}}</p>
               </div>

               <p class="nombre-reconocedor">{{reconocedor}}</p>

            </div>
         </body>

      </html>
      `,
      content: {
         dataURI: converImagemBase64('imgFondo.jpg'),
         reconocido,
         reconocedor,
         mensaje
      }
   })
      .then(() => {
         req.body.nameImagen = nameImagen;
         next();
      })

}

module.exports = createImage;