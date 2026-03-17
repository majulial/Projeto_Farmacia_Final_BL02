import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query, UseGuards } from "@nestjs/common";

import { Produtos } from "../entities/produto.entity";
import { ProdutoService } from "../services/produto.service";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";



 //@UseGuards(JwtAuthGuard)
@Controller("/produtos")
export class ProdutoController{
   

    constructor(
        private readonly produtoService: ProdutoService
    ){};

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Produtos[]> {
    return this.produtoService.findAll();

    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Produtos> {
    return this.produtoService.findById(id);
    
    }
     
    @Get('/nome/:nome')
    @HttpCode(HttpStatus.OK)
    findByNome(@Param('nome') nome: string): Promise<Produtos[]> { // UTILIZANDO COLCHETES [] (ARRAY), POIS PODE SER QUE TENHAM MAIS TITULOS PARECIDOS
    return this.produtoService.findByNome(nome);
    
    }

    @Get('/preco-maior/:preco')
    @HttpCode(HttpStatus.OK)
    findByPrecoMaior(@Param('preco', ParseIntPipe) preco: number): Promise<Produtos[]> {
        return this.produtoService.findByPrecoMaior(preco);
    }

    @Get('/preco-menor/:preco')
@HttpCode(HttpStatus.OK)
findByPrecoMenor(@Param('preco', ParseIntPipe) preco: number): Promise<Produtos[]> {
    return this.produtoService.findByPrecoMenor(preco);
}




    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() produto: Produtos): Promise<Produtos>{
        return this.produtoService.create(produto);
    }

    @UseGuards(JwtAuthGuard)
       @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() produto: Produtos): Promise<Produtos>{
        return this.produtoService.update(produto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number) {
    return this.produtoService.delete(id);
    
    }

}