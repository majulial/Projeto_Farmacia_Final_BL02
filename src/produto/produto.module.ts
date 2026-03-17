import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Produtos } from "./entities/produto.entity";
import { ProdutoController } from "./controllers/produto.controller";
import { ProdutoService } from "./services/produto.service";
import { CategoriaModule } from "../categoria/categoria.module";




@Module ({
    imports:[TypeOrmModule.forFeature([Produtos]),   CategoriaModule],
  
    controllers: [ProdutoController],
    providers: [ProdutoService],
    exports: []

})

export class ProdutoModule{}