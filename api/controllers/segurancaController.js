const SegurancaService = require('../services/segurancaService.js');

const segurancaService = new SegurancaService();

class SegurancaController {
    static async cadastrarAcl(req, res) {
        const { roles, permissoes } = req.body;
        const { usuarioId } = req

        try {
            const acl = await segurancaService.cadastrarAcl({ roles, permissoes, usuarioId });
            return res.status(201).send(acl);
        } catch (error) {
            return res.status(500).send({ message: error.message });
        }
    };

    static async cadastrarPermissoesRoles(req, res) {
        const { roleId, permissoes } = req.body;

        try {
            const permissoesRole = await segurancaService.cadastrarPermissoesRoles({ roleId, permissoes });
            return res.status(201).send(permissoesRole);
        } catch (error) {
            return res.status(500).send({message: error.message});
        }
    };
}

module.exports = SegurancaController;