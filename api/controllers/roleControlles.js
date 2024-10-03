const RoleService = require('../services/roleService.js');

const roleService = new RoleService();

class RoleController {
    static async cadastrar(req, res) {
        const { nome, descricao } = req.body

        try {
            const role = await roleService.cadastrar({ nome, descricao });
            return res.status(201).send(role);
        } catch (error) {
            return res.status(400).send({ Error: error.message });
        }
    };

    static async buscarRoles(_, res) {
        try {
            const roles = await roleService.buscarRoles();

            return res.status(200).send(roles);
        } catch (error) {
            return res.status(500).send({ message: error.message });
        }
    };

    static async buscarRolePorId(req, res) {
        const { id } = req.params;

        try {
            const role = await roleService.buscarRolePorId(id);

            console.log(role);

            return res.status(200).send(role);

        } catch (error) {
            return res.status(500).send({ message: error.message });
        }
    };

    static async atualizarRole(req, res) {
        const { id } = req.params;
        const role = req.body;

        try {
            const linhasAtualizadas = await roleService.atualizarrolePorId(id, role);

            if (!linhasAtualizadas) {
                return res.status(400).send({ message: "Nenhuma role atualizada" });
            }

            return res.status(204).send();

        } catch (error) {
            return res.status(500).send({ message: error.message });
        }
    };

    static async deletarRole(req, res) {
        const { id } = req.params;
        try {
            const linhasDeletadas = await roleService.deletarRole(id);

            if (!linhasDeletadas) {
                return res.status(400).send({ message: "Nenhum item deletado" })
            }

            return res.status(204).send();

        } catch (error) {
            return res.status(500).send({ message: error.message });
        }
    }
}

module.exports = RoleController;