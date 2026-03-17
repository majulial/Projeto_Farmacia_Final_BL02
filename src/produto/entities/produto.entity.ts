
import { IsNotEmpty } from "class-validator";
import { Column, Entity,ManyToOne,PrimaryGeneratedColumn } from "typeorm";
import { NumericTransformer } from "../../util/numeric-transformer";
import { IsFutureDate } from "../../validators/is-future-date.validator";

import { Transform, TransformFnParams } from "class-transformer";
import { Categoria } from "../../categoria/entities/categoria.entity";




@Entity({name: "tb_produtos"}) // CREATE TABLE tb_produtos

export class Produtos{
    @PrimaryGeneratedColumn() //PRIMARY KEY (id) AUTO INCREMENT 
    id: number;


    @Transform(({ value }: TransformFnParams) => value?.trim()) // função para remover espaços em branco no inicio e fim 
    @IsNotEmpty() // FORÇA DIGITAÇÃO

    /* VALIDANDO DADOS */

    @Column({length: 100, nullable: false}) // VARCHAR(100) NOT NULL
    nome: string;



     @Transform(({ value }: TransformFnParams) => value?.trim()) // função para remover espaços em branco no inicio e fim 
    @IsNotEmpty() // FORÇA DIGITAÇÃO
    @Column({length: 1000, nullable: false}) // VARCHAR(1000) NOT NULL
    descricao: string;


    @Column("decimal", { precision: 10, scale: 2,
    transformer: new NumericTransformer() })
    preco: number;


    // função para remover espaços em branco no inicio e fim 
    @IsNotEmpty()
    @Column()
    quantidade: number;

   @Column({ type: 'date' })
    @IsNotEmpty({ message: 'A data de validade não pode estar vazia' })
    @IsFutureDate({ message: 'A data deve ser no futuro' })
    data_validade: Date;

    @ManyToOne( () => Categoria, (categoria) => categoria.produto, {
        onDelete: "CASCADE"
    })

    categoria: Categoria;

}