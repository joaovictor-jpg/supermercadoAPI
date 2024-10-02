const dataBase = require('../models');
const { hash } = require('bcryptjs');
const uuid = require('uuid')


class UsuarioService {

    async buscarUsuarios() {
        try {
            const usuarios = await dataBase.usuario.findAll();
            return usuarios;
        } catch (error) {
            throw new Error('Erro na buscar de usuário');
        }
    };

    async buscarPorId(id) {
        try {
            const usuarioPorId = await dataBase.usuario.findAll({
                where: {
                    id: id
                }
            });

            return usuarioPorId;
        } catch (error) {
            throw new Error('Error ao buscar por id');
        }
    };

    async cadastrarUsuario(dto) {
        const usuario = await dataBase.usuario.findOne({
            where: {
                email: dto.email
            }
        });

        if (usuario) {
            throw new Error('Usuario já cadastrado!');
        };

        try {
            const senhaHash = await hash(dto.senha, 8);

            const novoUsuario = await dataBase.usuario.create({
                id: uuid.v4(),
                nome: dto.nome,
                email: dto.email,
                senha: senhaHash
            });

            return novoUsuario;
        } catch (error) {
            throw new Error(error);
        }
    };

    async atualizarUsuario(id, usuario) {

        const listadeRegistrosAtualizados = await dataBase.usuario.update(
            usuario,
            {
                where: {
                    id
                },
            },
        );

        if (listadeRegistrosAtualizados[0] === 0) {
            return false;
        }

        return true;
    }

    async deletarUsuarioPorId(id) {
        const resultado = await dataBase.usuario.destroy({
            where: {
                id
            }
        });

        if (resultado === 0) {
            return false;
        }

        return true;
    }
};

module.exports = UsuarioService;
