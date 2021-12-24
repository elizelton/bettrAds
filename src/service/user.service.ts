import { getRepository } from "typeorm";
import { Usuario } from "../model/entities/user.model";
import jwt from 'jsonwebtoken';
import getFacebookPublicProfile from "../shared/utils/facebook.api";
import HttpError from "../shared/handlers/HttpError";

class UsuarioService {

    usuarioRepository = getRepository(Usuario);

    login = async (entity: Usuario) => {

        const usuarioBanco = await this.usuarioRepository.findOne({
            email: entity.email
        });

        if (usuarioBanco) {
            const token = jwt.sign(
                {
                    id: usuarioBanco.id
                },
                process.env.SECRETJWT || 'SECRET',
                {
                    expiresIn: 300 // expires in 5min 
                });

            return {
                auth: true,
                token,
                expiresInMs: 300,
            };
        } else {
            throw new HttpError('Usuario e/ou senha inválidos');
        }

    }

    create = async (entity: Usuario) => {
        const novoUsuario = await this.usuarioRepository.save(entity);
        delete novoUsuario.senha;
        return novoUsuario;
    }

    read = async (usuarioId: number) => {

        if (!usuarioId) {
            throw new HttpError('Parâmatros de login inconsistente');
        }

        const usuario = await this.usuarioRepository.findOne({ id: usuarioId });

        if (usuario) {
            delete usuario.senha;

            return getFacebookPublicProfile(usuario.tokenFacebook)
                .then((response: { data: Object, status: number }) => {
                    return { usuario, publicProfile: response.data };
                })
                .catch(() => {
                    return { usuario };
                });

        } else {
            throw new HttpError('Falha ao obter usuário');
        }
    }

    update = async (id: number, entity: Usuario) => {

        if (id !== entity.id) {
            throw new HttpError('Id de usuário inconsistente');
        }

        const usuarioBanco = await this.usuarioRepository.findOne(entity.id);


        if (!usuarioBanco) {
            throw new HttpError('Usuário não encontrado');
        }
        const usuarioAtualizado = await this.usuarioRepository.save(entity);
        delete usuarioAtualizado.senha;
        return usuarioAtualizado;
    }

    delete = async (id: number) => {
        return await this.usuarioRepository.delete(id);
    }

    getAll = async () => {
        const usuarios = await this.usuarioRepository.find();
        usuarios.forEach(x => delete x.senha);

        return usuarios;
    }
}

export default UsuarioService;