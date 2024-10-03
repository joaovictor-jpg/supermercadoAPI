const PermissaoService = require('../services/permissaoService.js');

const permissaoService = new PermissaoService();

class PermissaoController {
    static async cadastrar(req, res) {
        const { nome, descricao } = req.body;

        try {
            const permissao = await permissaoService.cadastrar({ nome, descricao });
            res.status(200).send(permissao);
        } catch (error) {
            return res.status(500).send({ message: error.message });
        }
    }

    static async buscarTodosAsPermissoes(_, res) {
        try {
            const listaDePermissoes = await permissaoService.buscarPermissoes();
            return res.status(200).send(listaDePermissoes);
        } catch (error) {
            return res.status(500).send({ message: error.message });
        }
    };

    static async buscarPermissoesPorId(req, res) {
        const { id } = req.params;
        try {
            const permissao = await permissaoService.buscarPermissoesPorId(id);
            return res.status(200).send(permissao);
        } catch (error) {
            return res.status(500).send({ message: error.message });
        }
    };

    static async atualizarPermissaoPorId(req, res) {
        const { id } = req.params;
        const dto = req.body;
        try {
            const permissaoFoiAtualizada = await permissaoService.atualizarPermissaoPorId(id, dto);
            if (!permissaoFoiAtualizada) return res.status(400).send({ message: "Não foi possivel Atualizar permissão" });
            return res.status(204).send({message: "Uma permissão foi atualizada"});
        } catch (error) {
            return res.status(500).send({ message: error.message });
        }
    };

    static async deletarPermissaoPorId(req, res) {
        const { id } = req.params;
        try {
            const linhasAlteradas = await permissaoService.deletarPermissaoPorId(id);
            if(!linhasAlteradas) return res.status(400).send({ message: "Não foi possivel deletar permissão" });
            return res.status(204).send({message: "Uma permissão foi deletada"});
        } catch (error) {
            return res.status(500).send({message: error.message});
        }
    }
}

module.exports = PermissaoController;
