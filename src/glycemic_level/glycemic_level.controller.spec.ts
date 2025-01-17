import { Test, TestingModule } from '@nestjs/testing';
import { RegisterLevelEntity } from './entity/register_level.entity';
import { GlycemicLevelService } from './service/glycemic_level.service';
import { GlycemicLevelController } from './glycemic_level.controller';
import { GlycemicLevelRepository } from './repository/glycemic_level.repository';
import { UpdateRegisterLevelDTO } from './dto/update_register_level.dto';

const mockGlycemicLevelRepository = {
  save: jest.fn(),
  update: jest.fn(),
  getById: jest.fn(),
  getAllRegister: jest.fn(),
  delete: jest.fn(),
};

const mockGlycemicLevelService = {
  sendTeamsNotification: jest.fn(),
  setGlycemitRate: jest.fn(),
};

describe('GlycemicLevelController', () => {
  let controller: GlycemicLevelController;
  let service: GlycemicLevelService;
  let repository: GlycemicLevelRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GlycemicLevelController],
      providers: [
        { provide: GlycemicLevelRepository, useValue: mockGlycemicLevelRepository },
        { provide: GlycemicLevelService, useValue: mockGlycemicLevelService },
      ],
    }).compile();

    controller = module.get<GlycemicLevelController>(GlycemicLevelController);
    service = module.get<GlycemicLevelService>(GlycemicLevelService);
    repository = module.get<GlycemicLevelRepository>(GlycemicLevelRepository);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createRegisterLevel', () => {
    it('should call the repository to save a register level', async () => {
      const registerLevel = new RegisterLevelEntity();
      registerLevel.level = 120;
      registerLevel.type = 'FAST';
      registerLevel.registerDate = '01/11/2025';
      
      mockGlycemicLevelRepository.save.mockResolvedValue(registerLevel);
      mockGlycemicLevelService.setGlycemitRate.mockReturnValue({
        rate: 'ALERT',
        rateColor: 'yellow'
      });

      const result: any = await controller.registerLevel({ level: 120, type: 'FAST', registerDate: '01/11/2025'});

      expect(result.message).toEqual('O nível de glicose foi registrado com sucesso!');
      expect(mockGlycemicLevelRepository.save).toHaveBeenCalled();
      expect(mockGlycemicLevelService.setGlycemitRate).toHaveBeenCalledWith(120, 'FAST');
      expect(mockGlycemicLevelService.sendTeamsNotification).toHaveBeenCalledWith('Registro de glicose cadastrado com sucesso!');
    });
  });

  describe('updateRegisterLevel', () => {
    it('should call the repository to update a register level', async () => {
      const newData = new UpdateRegisterLevelDTO();
      newData.level = 120;
      newData.type = 'FAST';
      newData.registerDate = '02/11/2024';

      const registerLevelToUpdate = new RegisterLevelEntity();
      registerLevelToUpdate.level = 90;
      registerLevelToUpdate.type = 'FAST';
      registerLevelToUpdate.registerDate = '01/11/2024';

      mockGlycemicLevelRepository.getById.mockResolvedValue(registerLevelToUpdate)
      mockGlycemicLevelRepository.update.mockResolvedValue(newData);
      mockGlycemicLevelService.setGlycemitRate.mockReturnValue({
        rate: 'ALERT',
        rateColor: 'yellow'
      });

      const result: any = await controller.updateGlycemicRegister('123456', newData);

      expect(result.message).toEqual('Registro atualizado com sucesso!');
      expect(result.register).toEqual(newData);
      expect(mockGlycemicLevelRepository.update).toHaveBeenCalled();
      expect(mockGlycemicLevelService.setGlycemitRate).toHaveBeenCalledWith(120, 'FAST');
    });
  });

  describe('getGlycemicRate', () => {
    it('should call the service to get a register level by ID', async () => {
      const registerLevel = new RegisterLevelEntity();
      mockGlycemicLevelRepository.getById.mockResolvedValue(registerLevel);

      const result = await controller.getGlycemicRate('1234');

      expect(result).toEqual(registerLevel);
      expect(mockGlycemicLevelRepository.getById).toHaveBeenCalledWith('1234');
    });

    it('should call the service to get all register levels', async () => {
      const registerLevels = [new RegisterLevelEntity()];
      mockGlycemicLevelRepository.getAllRegister.mockResolvedValue(registerLevels);

      const result = await controller.getAllGlycemicRegister();

      expect(result).toEqual(registerLevels);
      expect(mockGlycemicLevelRepository.getAllRegister).toHaveBeenCalled();
    });
  });

  describe('deleteGlycemicRegister', () => {
    it('should call the service to delete a register level by ID', async () => {
      const registerLevel = new RegisterLevelEntity();
      mockGlycemicLevelRepository.delete.mockResolvedValue(registerLevel);

      const result = await controller.deleteGlycemicRegister('1234');

      expect(result).toEqual({ message: 'O nível de glicose foi excluído com sucesso!'} );
      expect(mockGlycemicLevelRepository.delete).toHaveBeenCalledWith('1234');
    });
  });
});
