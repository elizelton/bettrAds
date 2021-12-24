import { Response, Request } from "express";
import bcrypt from 'bcrypt';
import { Usuario } from "../model/entities/user.model";
import UsuarioService from "../service/user.service";

class UserController {

    saltRounds = 10;

    usuarioService: UsuarioService;
    constructor() {
        this.usuarioService = new UsuarioService();
    }

    login = (req: Request, res: Response) => {
        const { email, senha } = req.body;

        const usuario = new Usuario();
        usuario.email = email;
        usuario.senha = bcrypt.hashSync(senha, this.saltRounds);

        this.usuarioService.login(usuario)
            .then((usuarioNovo) => {
                res.send(usuarioNovo);
            })
            .catch((error) => {
                res.status(400).json(error);
            });
    }

    read = async (req: Request, res: Response) => {
        const { usuarioId } = req.params;
        this.usuarioService.read(Number(usuarioId))
            .then((data) => {
                res.json(data);
            }).catch((error) => {
                res.status(400).json(error);
            })
    }

    create = async (req: Request, res: Response) => {
        const { body: usuarioRequisicao } = req;

        const usuario = new Usuario();
        usuario.nome = usuarioRequisicao.nome;
        usuario.email = usuarioRequisicao.email;
        usuario.senha = bcrypt.hashSync(usuarioRequisicao.senha, this.saltRounds);
        usuario.tokenFacebook = usuarioRequisicao.tokenFacebook;

        this.usuarioService.create(usuario)
            .then((usuarioNovo) => {
                res.send(usuarioNovo);
            })
            .catch((error) => {
                res.status(400).json(error);
            });
    }

    update = async (req: Request, res: Response) => {
        const { id } = req.params;

        const { body: usuarioRequisicao } = req;
        const usuario = new Usuario();
        usuario.id = usuarioRequisicao.id;
        usuario.nome = usuarioRequisicao.nome;
        usuario.email = usuarioRequisicao.email;
        usuario.tokenFacebook = usuarioRequisicao.tokenFacebook;

        if (usuarioRequisicao.password) {
            usuario.senha = bcrypt.hashSync(usuarioRequisicao.senha, this.saltRounds);
        }

        this.usuarioService.update(Number(id), usuario)
            .then((usuarioAtualizado) => {
                res.send(usuarioAtualizado);
            })
            .catch((error) => {
                res.status(400).json(error);
            });

    }

    delete = async (req: Request, res: Response) => {
        const { id } = req.params;

        if (id) {
            res.send(this.usuarioService.delete(Number(id)));
        } else {
            res.status(400).json('Id obrigatório.');
        }
    }

    getAll = async (req: Request, res: Response) => {
        const allUsuarios = await this.usuarioService.getAll();
        res.send(allUsuarios);
    }


}
export default UserController;