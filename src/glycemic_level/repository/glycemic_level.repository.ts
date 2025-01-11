import { Injectable } from "@nestjs/common";
import { RegisterLevelEntity } from "../entity/register_level.entity";

@Injectable()
export class GlycemicLevelRepository {
    private registerLevelEntity: RegisterLevelEntity[] = [];

    public async save(registerLevel: RegisterLevelEntity): Promise<void> {
        this.registerLevelEntity.push(registerLevel);
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
            throw new Error('Registro não encontrado!');
        }

        return register;
    }

    public async getAllRegister(): Promise<Array<RegisterLevelEntity>> {
        if (this.registerLevelEntity.length === 0) {
            throw new Error('Não há registros!');
        } else {
            return this.registerLevelEntity;
        }   
    }

    public async delete(id:string): Promise<RegisterLevelEntity> {
        const register = this.getById(id);

        if(!register) {
            throw new Error('Registro não encontrado!');
        }

        this.registerLevelEntity = this.registerLevelEntity.filter(
            findedRegister => findedRegister.id !== id
        );

        return register;
    }


}