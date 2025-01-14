import { Injectable, NotFoundException } from "@nestjs/common";
import { RegisterLevelEntity } from "../entity/register_level.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class GlycemicLevelRepository {

    constructor(
        @InjectRepository(RegisterLevelEntity)
    private registerLevelRepository: Repository<RegisterLevelEntity>){}

   public async save(registerLevel: RegisterLevelEntity): Promise<RegisterLevelEntity> {
        const newRegisterLevel = this.registerLevelRepository.create(registerLevel)
        return this.registerLevelRepository.save(newRegisterLevel)
    }

   public async update(findedRegister: RegisterLevelEntity, registerToUpdate: Partial<RegisterLevelEntity>): Promise<Partial<RegisterLevelEntity>> {

        Object.assign(findedRegister, registerToUpdate);
        return this.registerLevelRepository.save(findedRegister);
    }

   public async getById(id: string): Promise<RegisterLevelEntity> {
        
        const register = await this.registerLevelRepository.findOneBy({ id });

        if(!register) {
            throw new NotFoundException('Registro não encontrado');
        }

        return register;
    }

   public async getAllRegister(): Promise<Array<RegisterLevelEntity>> {
            return this.registerLevelRepository.find();
    }

   public async delete(id:string): Promise<RegisterLevelEntity> {
        const register = this.getById(id);

        if(!register) {
            throw new NotFoundException('Registro não encontrado');
        }

        this.registerLevelRepository.delete({ id });

        return register;
    }
}