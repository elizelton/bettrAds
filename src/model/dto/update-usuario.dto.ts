import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class UpdateUsuarioDto {

    @IsNotEmpty({ message: 'Id deve ser informado' })
    id!: number;

    @MinLength(5, { message: 'Tamanho mínimo de 5 caracteres.' })
    @IsOptional()
    nome!: string;

    @IsEmail(undefined, { message: "Email inválido" })
    @IsOptional()
    email!: string;

    @MinLength(6, { message: 'Tamanho mínimo de 5 caracteres.' })
    @IsOptional()
    senha!: string;

    @IsOptional()
    tokenFacebook!: string;

}