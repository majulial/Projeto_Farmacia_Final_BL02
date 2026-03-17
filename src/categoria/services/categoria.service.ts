import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Categoria } from "../entities/categoria.entity";
import { DeleteResult, ILike, Repository } from "typeorm";



@Injectable()
export class CategoriaService{
 

    constructor (
        @InjectRepository(Categoria)
        private categoriaRepository: Repository<Categoria>,
    ){}

    async findAll(): Promise<Categoria[]>{

        return this.categoriaRepository.find({
             relations: {
            produto: true
        }
        });
    }


    async findById(id: number): Promise<Categoria>{
        // SELEÇÃO DE TABELA 
                    // await = espera a usuario digitar
        const categoria = await this.categoriaRepository.findOne({
            where: {
                id
            },
             relations: {
            produto: true
        }
    });

    if (!categoria)
        throw new HttpException('Categoria não encontrada!', HttpStatus.NOT_FOUND);
    return categoria;

    }

    async findByNome(nome: string): Promise<Categoria[]>{
        return this.categoriaRepository.find({
            where:{ // USANDO ILIKE PARA IGNORAR MAIUS E MIUS - LIKE LEVA EM CONSIDERAÇÃO AS SUAS OPÇÕES
                nome: ILike (`%${nome}%`)
            },
             relations: {
            produto: true
        }
        });
    }


    async create(categoria: Categoria): Promise<Categoria>{
        // INSERINDO VALORES NA TABELA 
        return await this.categoriaRepository.save(categoria);
    }

     async update(categoria: Categoria): Promise<Categoria>{
        if (!categoria.id || categoria.id <= 0)
            throw new HttpException("Id inválido ou não encontrado!", HttpStatus.BAD_REQUEST);

        //CHAMANDO METODO PARA VERIFICAR SE ID EXISTE
        await this.findById(categoria.id);

        // ATT VALORES NA TABELA 
        return await this.categoriaRepository.save(categoria);
    }

    async delete(id: number): Promise <DeleteResult>{
        await this.findById(id);

        //SE EXISTIR DELETE tb_temas FROM id = ?;
        return this.categoriaRepository.delete(id);
    }
}