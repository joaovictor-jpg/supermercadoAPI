const { where } = require('sequelize');
const database = require('../models');
const uuid = require('uuid');

class PermissaoService {
    async cadastrar(dto) {
        const permissao = await database.permissoes.findOne({
            where: {
                nome: dto.nome
            }
        });

        if (permissao) {
            throw new Error('Permissão já cadastrada')
        }

        try {
            const newPermissao = await database.permissoes.create({
                id: uuid.v4(),
                nome: dto.nome,
                descricao: dto.descricao
            });

            return newPermissao
        } catch (error) {
            throw new Error('Erro cadastrar permissão')
        }
    };

    async buscarPermissoes() {
        try {
            const listaDePermissoes = await database.permissoes.findAll();
            return listaDePermissoes;
        } catch (error) {
            throw new Error(`Error: ${error.message}`);
        }
    };

    async buscarPermissoesPorId(id) {
        try {
            const permissao = await database.permissoes.findOne({
                where: {
                    id
                }
            });

            return permissao;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    async atualizarPermissaoPorId(id, dto) {
        try {
            const linhasAtualizadas = await database.permissoes.update(
                dto,
                {
                    where: {
                        id
                    }
                }
            );

            if(linhasAtualizadas[0] === 0) {
                return false;
            }

            return true;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    async deletarPermissaoPorId(id) {
        try {
            const linhasAlteradas = await database.permissoes.destroy({
                where: {
                    id
                }
            });

            if(linhasAlteradas === 0) {
                return false;
            }

            return true;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = PermissaoService;