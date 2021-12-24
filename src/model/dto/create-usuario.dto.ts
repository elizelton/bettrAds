import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUsuarioDto {

    @MinLength(5, { message: 'Tamanho mínimo de 5 caracteres.' })
    nome!: string;

    @IsEmail(undefined, { message: "Email inválido" })
    email!: string;

    @MinLength(6, { message: 'Tamanho mínimo de 5 caracteres.' })
    senha!: string;

    @IsNotEmpty({ message: 'token do facebook é obrigatório.' })
    tokenFacebook!: string;

}