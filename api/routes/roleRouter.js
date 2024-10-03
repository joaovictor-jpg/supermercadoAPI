const { Router } = require('express');
const RoleController = require('../controllers/roleControlles.js');
const router = Router();

router
    .get('/roles', RoleController.buscarRoles)
    .get('/roles/:id', RoleController.buscarRolePorId)
    .post('/roles', RoleController.cadastrar)
    .put('/roles/:id', RoleController.atualizarRole)
    .delete('/roles/:id', RoleController.deletarRole)

module.exports = router;