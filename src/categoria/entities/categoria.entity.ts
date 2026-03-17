
import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Produtos } from "../../produto/entities/produto.entity";



@Entity({name: "tb_categorias"})
export class Categoria {

    @PrimaryGeneratedColumn()
    id: number


    @IsNotEmpty()
    @Column({length: 100, nullable: false})
    nome: string

    @OneToMany(() => Produtos, (produto) => produto.categoria)
    produto: Produtos[];

}

