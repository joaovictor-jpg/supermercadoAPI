const bodyParser = require('body-parser')
 const usuario = require('./usuarioRoute.js');
const produto = require('./produtoRoute.js');
const auth = require('./authRouter.js');
const role = require("./roleRouter.js");
const permissao = require('./permissaoRouter.js');

module.exports = app => {
  app.use(
    bodyParser.json(),
    auth,
    usuario,
    produto,
    role,
    permissao
  )
}
