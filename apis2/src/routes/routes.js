const express = require('express');
const { selectNombres, seleccionarCorreo, insertRegistro, insertRegistroPaises } = require('../services/database.js');
const createImage = require('../services/createImage.js');
const sendMail = require('../services/emailer.js');
const eliminarImagen = require('../services/eliminarImagen.js');

const app = express();

app.get('/nombres', (req, res) => res.send("Server Run, Ok!"));
app.get('/nombres', selectNombres);
app.post('/reconocimiento', insertRegistro, seleccionarCorreo, createImage, sendMail, eliminarImagen);
app.post('/reconocimiento_paises', insertRegistroPaises);

module.exports = app;