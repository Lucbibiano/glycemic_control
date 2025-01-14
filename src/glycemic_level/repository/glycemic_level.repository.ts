import { Injectable, NotFoundException } from "@nestjs/common";
import { RegisterLevelEntity } from "../entity/register_level.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class GlycemicLevelRepository {

    constructor(
        @InjectRepository(RegisterLevelEntity)
    private registerLevelRepository: Repository<RegisterLevelEntity>){}

    private registerLevelEntity: RegisterLevelEntity[] = [];

    public async save(registerLevel: RegisterLevelEntity): Promise<RegisterLevelEntity> {
        const newRegisterLevel = this.registerLevelRepository.create(registerLevel)
        return this.registerLevelRepository.save(newRegisterLevel)
    }

    public async update(findedRegister: RegisterLevelEntity, registerToUpdate: Partial<RegisterLevelEntity>): Promise<Partial<RegisterLevelEntity>> {

        Object.entries(registerToUpdate).forEach(([key, value]) => {
            if (key === 'id') {
                return;
            } else {
                findedRegister[key] = value;
            }
        });

        return findedRegister;
    }

    public async getById(id: string): Promise<RegisterLevelEntity> {
        
        const register = this.registerLevelEntity.find(
            registerFinded => registerFinded.id === id 
        );

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

        this.registerLevelEntity = this.registerLevelEntity.filter(
            findedRegister => findedRegister.id !== id
        );

        return register;
    }


}