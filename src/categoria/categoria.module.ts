import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoriaController } from "./controller/categoria.controller";
import { CategoriaService } from "./services/categoria.service";
import { Categoria } from "./entities/categoria.entity";




@Module({
    imports: [TypeOrmModule.forFeature([Categoria])],
    controllers: [CategoriaController],
    providers: [CategoriaService],
    exports: [CategoriaService],
})

export class CategoriaModule{}    