const bodyParser = require('body-parser')
 const usuario = require('./usuarioRoute.js');
const produto = require('./produtoRoute.js');

module.exports = app => {
  app.use(
    bodyParser.json(),
    produto,
    usuario
  )
}
