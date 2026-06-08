import { Module } from '@nestjs/common';
import { AutenticacaoService } from './autenticacao.service';
import { AutenticacaoController } from './autenticacao.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/autenticacao.entity';

@Module({
  imports:[
    TypeOrmModule.forRoot({
      type:`better-sqlite3`,
      database:`sistema_login`,
      entities:[Usuario],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Usuario]),
  ],
  controllers: [AutenticacaoController],
  providers: [AutenticacaoService],
})
export class AutenticacaoModule {}
