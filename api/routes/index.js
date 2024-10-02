const bodyParser = require('body-parser')
 const usuario = require('./usuarioRoute.js');
const produto = require('./produtoRoute.js');
const auth = require('./authRouter.js');

module.exports = app => {
  app.use(
    bodyParser.json(),
    auth,
    usuario,
    produto
  )
}
