import { NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { Repository } from "typeorm";
import { GlycemicLevelRepository } from "./glycemic_level.repository";
import { RegisterLevelEntity } from "../entity/register_level.entity";
import { getRepositoryToken } from "@nestjs/typeorm";

describe('GlycemicLevelRepository', () => {
    let repository: GlycemicLevelRepository;
    let mockRepository: jest.Mocked<Repository<RegisterLevelEntity>>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GlycemicLevelRepository,
                {
                    provide: getRepositoryToken(RegisterLevelEntity),
                    useValue: {
                        create: jest.fn(),
                        save: jest.fn(),
                        findOneBy: jest.fn(),
                        find: jest.fn(),
                        delete: jest.fn(),
                    },
                },
            ],
        }).compile();

        repository = module.get<GlycemicLevelRepository>(GlycemicLevelRepository);
        mockRepository = module.get(getRepositoryToken(RegisterLevelEntity));
    });

    describe('save', () => {
        it('should create and save a new register level on database', async () => {
            const registerLevel = new RegisterLevelEntity();
            registerLevel.level = 90;
            registerLevel.registerDate = '01/01/2024';
            mockRepository.create.mockReturnValue(registerLevel);
            mockRepository.save.mockResolvedValue(registerLevel);

            const result = await repository.save(registerLevel);

            expect(mockRepository.create).toHaveBeenCalledWith(registerLevel);
            expect(mockRepository.save).toHaveBeenCalledWith(registerLevel);
            expect(result).toEqual(registerLevel);
        });
    });

    describe('update', () => {
        it('should update a new register level on database', async () => {
            const findedRegister = new RegisterLevelEntity();
            findedRegister.id = '1234';
            findedRegister.level = 100;

            const registerToUpdate = { level: 120 };
            const updatedRegister = Object.assign(findedRegister, registerToUpdate);

            mockRepository.save.mockResolvedValue(updatedRegister);

            const result = await repository.update(findedRegister, registerToUpdate);

            expect(mockRepository.save).toHaveBeenCalledWith(findedRegister);
            expect(result).toEqual(updatedRegister);
        });
    });

    describe('getById', () => {
        it('should return a register level by ID  on database', async () => {
            const registerLevel = new RegisterLevelEntity();
            registerLevel.id = '1234';

            mockRepository.findOneBy.mockResolvedValue(registerLevel);

            const result = await repository.getById('1234');

            expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: '1234' });
            expect(result).toEqual(registerLevel);
        });

        it('should throw a NotFoundException if register level is not found', async () => {
            mockRepository.findOneBy.mockResolvedValue(null);

            await expect(repository.getById('1234')).rejects.toThrow(NotFoundException);
        });
    });

    describe('getAllRegister', () => {
        it('should return all register levels', async () => {
            const registerLevels = [new RegisterLevelEntity(), new RegisterLevelEntity()];

            mockRepository.find.mockResolvedValue(registerLevels);

            const result = await repository.getAllRegister();

            expect(mockRepository.find).toHaveBeenCalled();
            expect(result).toEqual(registerLevels);
        });
    });

    describe('delete', () => {
        it('should delete a register level by ID', async () => {
            const registerLevel = new RegisterLevelEntity();
            registerLevel.id = '1234';

            jest.spyOn(repository, 'getById').mockResolvedValue(registerLevel);
            mockRepository.delete.mockResolvedValue(undefined);

            const result = await repository.delete('1234');

            expect(repository.getById).toHaveBeenCalledWith('1234');
            expect(mockRepository.delete).toHaveBeenCalledWith({ id: '1234' });
            expect(result).toEqual(registerLevel);
        });

        it('should throw a NotFoundException if register level is not found', async () => {
            jest.spyOn(repository, 'getById').mockRejectedValue(new NotFoundException());

            await expect(repository.delete('1234')).rejects.toThrow(NotFoundException);
        });
    });
});
