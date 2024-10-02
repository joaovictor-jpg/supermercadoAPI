const { verify, decode } = require('jsonwebtoken');
const jsonSecret = require('../config/jsonSecret.js');

module.exports = async (req, res, next) => {
    const token = req.headers.authorization

    if (!token) {
        return res.status(401).send('Access token não informado');
    }

    console.log(token);

    const [bearer, accessToken] = token.split(" ");

    try {
        console.log(accessToken);
        verify(accessToken, jsonSecret.secret);

        const { id, email } = await decode(accessToken);

        req.usuarioId = id;
        req.usuarioEmail = email;

        return next();

    } catch (error) {
        return res.status(401).send('Usuário não autorizado');
    }
}