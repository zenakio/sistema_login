import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAutenticacaoDto } from './dto/create-autenticacao.dto';
import { UpdateAutenticacaoDto } from './dto/update-autenticacao.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/autenticacao.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AutenticacaoService {
  constructor(
    @InjectRepository(Usuario)
    private repositorioUsuario:Repository<Usuario>,
  ){}

  //Criar uma nova conta (registrar)
  async registrar(body:any){
    const usuarioExistente = await this.repositorioUsuario.findOne({where:{email:body.email}});
    if (usuarioExistente){
      throw new BadRequestException("E-mail já cadastrado.")
    } 
    //Criptografar a senha do usuário
    const senhaCriptografada = await bcrypt.hash(body.senha,12);
    const novoUsuario = this.repositorioUsuario.create({
      nome:body.nome,
      email:body.email,
      senha:senhaCriptografada
    });
    await this.repositorioUsuario.save(novoUsuario);
    return {message:'Conta criada com sucesso!'};
  }
//Se autenticar (login)
async login(body:any){
  //Verifica se o usuário existe.
  const usuario = await this.repositorioUsuario.findOne({where:{email:body.email}});
  if(!usuario){
    throw new UnauthorizedException('Acesso negado!');
  }
  //Verifica se a senha está correta
  const senhaCorreta  = await bcrypt.compare(body.senha, usuario.senha);
  if(!senhaCorreta) {
    throw new UnauthorizedException('Acesso negado!');
  }
  return({nome:usuario.nome});
}

  create(createAutenticacaoDto: CreateAutenticacaoDto) {
    return 'This action adds a new autenticacao';
  }

  findAll() {
    return `This action returns all autenticacao`;
  }

  findOne(id: number) {
    return `This action returns a #${id} autenticacao`;
  }

  update(id: number, updateAutenticacaoDto: UpdateAutenticacaoDto) {
    return `This action updates a #${id} autenticacao`;
  }

  remove(id: number) {
    return `This action removes a #${id} autenticacao`;
  }
}
