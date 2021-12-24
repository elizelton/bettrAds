import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUsuarioDto {

    @IsEmail(undefined, { message: 'Email inválido.' })
    email!: string;

    @IsNotEmpty({ message: 'senha é obrigatório' })
    senha!: string;

}