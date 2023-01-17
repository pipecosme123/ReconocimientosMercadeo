const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3102;

const rutas = require(__dirname + '/src/routes/routes.js');

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(rutas);

app.listen(PORT, () => {
   console.log(`Server on port ${PORT}`);
})