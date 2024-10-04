const { Router } = require('express');
const SegurancaController = require('../controllers/segurancaController.js');

const router = new Router();

router
    .post('/seguranca/acl', SegurancaController.cadastrarAcl)

module.exports = router;