const { where } = require('sequelize');
const dataBase = require('../models');
const uuid = require('uuid');

class RoleService {
    async cadastrar(dto) {
        const roleExistente = await dataBase.roles.findOne({
            where: {
                nome: dto.nome
            }
        });

        if (roleExistente) {
            throw new Error('Role já existente');
        }

        try {
            const role = await dataBase.roles.create({
                id: uuid.v4(),
                nome: dto.nome,
                descricao: dto.descricao
            })

            return role;
        } catch (error) {
            throw new Error('Error ao cadastrar role');
        }
    };

    async buscarRoles() {
        try {
            const roles = await dataBase.roles.findAll();
            return roles;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async buscarRolePorId(id) {
        try {
            const role = await dataBase.roles.findOne({
                where: {
                    id
                }
            });

            if (!role) {
                throw new Error(`${id} não encontrado`);
            }

            return role;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    async atualizarrolePorId(id, roles) {
        try {
            const numeroDeLinhaAtureda = dataBase.roles.update(
                roles,
                {
                    where: {
                        id
                    }
                }
            );

            if (numeroDeLinhaAtureda[0] === 0) {
                return false;
            }
            return true;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    async deletarRole(id) {
        try {
            const numeroDeLinhaAtureda = await dataBase.roles.destroy({
                where: {
                    id
                }
            });

            if(numeroDeLinhaAtureda === 0) {
                return false
            }
            return true;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = RoleService;