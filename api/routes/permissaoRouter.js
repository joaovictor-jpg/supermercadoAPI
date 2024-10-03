const { Router } = require('express');
const PermissaoController = require('../controllers/permissaoController.js');

const router = Router();

router
    .get('/permissoes', PermissaoController.buscarTodosAsPermissoes)
    .get('/permissoes/:id', PermissaoController.buscarPermissoesPorId)
    .post('/permissoes', PermissaoController.cadastrar)
    .put('/permissoes/:id', PermissaoController.atualizarPermissaoPorId)
    .delete('/permissoes/:id', PermissaoController.deletarPermissaoPorId)

module.exports = router;