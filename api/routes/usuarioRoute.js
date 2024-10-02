const { Router } = require('express');
const UsuarioController = require('../controllers/usuarioController.js');
const autenticado = require('../middleware/autenticado.js');

const router = Router();

router.use(autenticado);

router
    .post('/usuarios', UsuarioController.cadastrar)
    .get('/usuarios/:id', UsuarioController.buscarId)
    .get('/usuarios', UsuarioController.buscarUsuarios)
    .put('/usuarios/:id', UsuarioController.atualizarUsuario)
    .delete('/usuarios/id/:id', UsuarioController.deletarUsuarioPorId)

module.exports = router;