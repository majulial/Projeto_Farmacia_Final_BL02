import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { DeleteResult, LessThan, Like, MoreThan, Repository } from "typeorm";
import { CategoriaService } from "../../categoria/services/categoria.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Produtos } from "../entities/produto.entity";

@Injectable()
export class ProdutoService {
    constructor(
        @InjectRepository(Produtos)
        private produtoRepository: Repository<Produtos>,
        private categoriaService: CategoriaService
    ) { }

    async findAll(): Promise<Produtos[]> {
        return await this.produtoRepository.find(
            {
                // relations: {
                //     categoria: true
                // }
            }
        );
    }

    async findById(id: number): Promise<Produtos> {

        let produto = await this.produtoRepository.findOne({
            where: {
                id
            },
            // relations: {
            //     categoria: true
            // }
        });

        if (!produto)
            throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);

        return produto;

    }

    async findByNome(nome: string): Promise<Produtos[]> {
        return await this.produtoRepository.find({
            where: {
                nome: Like(`%${nome}%`)
            },
            // relations: {
            //     categoria: true
            // }
        })
    }

    async create(produto: Produtos): Promise<Produtos> {

       // await this.categoriaService.findById(produto.categoria.id)

        return await this.produtoRepository.save(produto);

    }

  
    async update(produto: Produtos): Promise<Produtos> {

        await this.findById(produto.id);

        //await this.categoriaService.findById(produto.categoria.id)

        return await this.produtoRepository.save(produto);

    }

    async delete(id: number): Promise<DeleteResult> {

        await this.findById(id);

        return await this.produtoRepository.delete(id);

    }

    async findByPrecoMaior(preco: number): Promise<Produtos[]> {
        return await this.produtoRepository.find({
            where: {
                preco: MoreThan(preco)
            },
            order: {
                preco: 'ASC'
            },
            // relations: {
            //     categoria: true
            // }
        })
    }

    async findByPrecoMenor(preco: number): Promise<Produtos[]> {
        return await this.produtoRepository.find({
            where: {
                preco: LessThan(preco)
            },
            order: {
                preco: 'DESC'
            },
            // relations: {
            //     categoria: true
            // }
        })
    }

}