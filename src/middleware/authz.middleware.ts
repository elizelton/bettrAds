import jwt, { VerifyErrors } from 'jsonwebtoken';
import express from "express";



export function verifyJWT(): express.RequestHandler {
    return (req, res, next) => {
        const { 'x-access-token': token } = req.headers;

        if (!token) {
            return res.status(401).json({ auth: false, message: 'Token não encontrado.' });
        }
        else {

            jwt.verify(token.toString(), process.env.SECRETJWT || 'SECRET', function (err: VerifyErrors | null, decoded: any) {
                if (err) {
                    return res.status(400).json({ auth: false, message: 'Falha ao autenticar token.' });
                }

                req.params.usuarioId = decoded.id;
                next();
            });
        }
    }
}