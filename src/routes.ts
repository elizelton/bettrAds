import { Router } from 'express'
//#region Controllers
import UsuarioController from './controller/User.controller';
import { verifyJWT } from './middleware/authz.middleware';
import { validationMiddleware } from './middleware/validation.middleware';
import { CreateUsuarioDto } from './model/dto/create-usuario.dto';
import { LoginUsuarioDto } from './model/dto/login-usuario.dto';
import { UpdateUsuarioDto } from './model/dto/update-usuario.dto';
//#endregion

class Routes {
    public router: Router;
    usuarioController: UsuarioController;
    constructor() {
        this.router = Router();
        this.usuarioController = new UsuarioController();
        this.routes();
    }

    routes() {
        //#region Usuario
        this.router.post('/login', validationMiddleware(LoginUsuarioDto), this.usuarioController.login);
        this.router.get('/user', verifyJWT(), this.usuarioController.read);
        this.router.get('/user/all', verifyJWT(), this.usuarioController.getAll);
        this.router.post('/user', validationMiddleware(CreateUsuarioDto), this.usuarioController.create);
        this.router.put('/user/:id', verifyJWT(), validationMiddleware(UpdateUsuarioDto), this.usuarioController.update);
        this.router.delete('/user/:id', verifyJWT(), this.usuarioController.delete);
        //#endregion
    }
}

export default Routes;