const UsuarioService = require('../services/usuarioService.js');

const usuarioService = new UsuarioService();

class UsuarioController {

    static async buscarUsuarios(_, res) {
        try {
            const usuarios = await usuarioService.buscarUsuarios();
            res.status(200).send(usuarios);
        } catch (error) {
            res.status(500).send(`Error: ${error.message}`);
        }
    };

    static async buscarId(req, res) {
        try {
            const { id } = req.params;
            console.log(id);
            console.log(req.params);
            console.log(req.params.id);
            const usuarioPorId = await usuarioService.buscarPorId(id)
            res.status(200).json(usuarioPorId);
        } catch (error) {
            res.status(500).send(`Error: ${error.message}`);
        }
    };

    static async cadastrar(req, res) {
        const { nome, email, senha } = req.body;

        try {
            const usuario = await usuarioService.cadastrarUsuario({ nome, email, senha });

            return res.status(201).send(usuario);
        } catch (error) {
            return res.status(400).send(`Error: ${error.message}`);
        }

    }

    static async atualizarUsuario(req, res) {
        const { id } = req.params;
        const usuarioAtualizado = req.body;
        try {
            const foiAtualizado = await usuarioService.atualizarUsuario(id, usuarioAtualizado);
            if (!foiAtualizado) {
                return res.status(400).json({ mensagem: 'Error de atualização' });
            }
            return res.status(200).json({ mensagem: 'Usuário atualizado' });
        } catch (error) {
            return res.status(500).json({ mensagem: error.message });
        }
    }

    static async deletarUsuarioPorId(req, res) {
        const { id } = req.params;
        try {
            const resultado = await usuarioService.deletarUsuarioPorId(id);
            if (!resultado) {
                return res.status(400).json({ mensagem: 'Error de deletar usuário' });
            }
            res.status(200).json({message: 'Usuário deletado'});
        } catch (error) {
            return res.status(500).json({mensagem: error.message});
        }
    }
};

module.exports = UsuarioController;