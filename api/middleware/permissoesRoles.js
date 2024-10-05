const database = require('../models');
const Sequelize = require('sequelize');

const permissoesRoles = (listaPermissoes) => {
    return async (res, req, next) => {
        const { usuarioId } = req;
        const usuario = await database.usuario.findOne({
            include: [{
                model: database.roles,
                as: 'usuario_roles',
                attributes: ['id', 'nome', 'descricao']
            }],
            where: {
                id: usuarioId
            }
        });

        if (!usuario) { return res.status(404).send({ message: 'Usuário não encontrado' }) };

        let listaRolesId = [];

        Object.values(usuario.usuario_roles).map((role) => {
            listaRolesId.push(role.id);
        })

        const roles = await database.roles.findOne({
            include: [{
                model: database.permissoes,
                as: 'roles_das_permissoes',
                attributes: ['id', 'nome', 'descricao']
            }],
            where: {
                [Sequelize.Op.in]: listaRolesId
            }
        });

        if (!roles) { return res.status(404).send({ message: 'Role não cadastrada' }) }

        const permissoesCadastradas = role.roles_das_permissoes.map((permissao) => permissao.nome).some((permissao) => listaPermissoes.includes(permissao));

        if (!permissoesCadastradas) { return res.status(401).send({ message: 'Usuário não autorizado' }) }

        return next();
    };
};

module.exports = permissoesRoles;