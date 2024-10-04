const { where } = require('sequelize');
const database = require('../models');

const permissao = (listaPermissoes) => {
    return async (req, res, next) => {
        const { usuarioId } = req

        const usuario = await database.usuario.findOne({
            include: [{
                model: database.permissoes,
                as: 'usuario_permissoes',
                attributes: ['id', 'nome']
            }],
            where: {
                id: usuarioId
            }
        });

        if (!usuario) {
            return res.status(401).send('Usuário não cadastrado');
        };

        const permissoesCadastradas = usuario.usuario_permissoes.map((permissao) => permissao.nome).some((permissao) => listaPermissoes.includes(permissao));

        if (!permissoesCadastradas) return res.status(401).send('Usuário não autorizado');

        return next();
    };
};

module.exports = permissao;