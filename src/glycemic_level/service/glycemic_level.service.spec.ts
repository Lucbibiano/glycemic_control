import { Test, TestingModule } from '@nestjs/testing';
import { GlycemicLevelService } from './glycemic_level.service';
import { COLOR_RATE, RATE, TYPE_LEVEL } from '../enum/glycemic_level.enum';
import { RegisterLevelRate } from '../dto/register_level.rate.dto';

jest.mock('axios');

describe('GlycemicLevelService', () => {
  let service: GlycemicLevelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GlycemicLevelService],
    }).compile();

    service = module.get<GlycemicLevelService>(GlycemicLevelService);
  });

  describe('sendTeamsNotification', () => {
    it('should send a notification to teams', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      await service.sendTeamsNotification('Registro criado com sucesso');
      expect(consoleSpy).not.toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('setGlycemitRate', () => {
    it('should return ALERT and YELLOW with FAST type when level < 70', () => {
      const result: RegisterLevelRate = service.setGlycemitRate(60, TYPE_LEVEL.FAST);
      expect(result).toEqual({ rate: RATE.ALERT, rateColor: COLOR_RATE.YELLOW });
    });

    it('should return ALERT and YELLOW with FAST type when level is between 100 and 125', () => {
      const result: RegisterLevelRate = service.setGlycemitRate(110, TYPE_LEVEL.FAST);
      expect(result).toEqual({ rate: RATE.ALERT, rateColor: COLOR_RATE.YELLOW });
    });

    it('should return NORMAL and GREEN with FAST type when level is between 70 and 100', () => {
      const result: RegisterLevelRate = service.setGlycemitRate(90, TYPE_LEVEL.FAST);
      expect(result).toEqual({ rate: RATE.NORMAL, rateColor: COLOR_RATE.GREEN });
    });

    it('should return CRITICAL and RED with FAST type when level >= 126', () => {
      const result: RegisterLevelRate = service.setGlycemitRate(130, TYPE_LEVEL.FAST);
      expect(result).toEqual({ rate: RATE.CRITICAL, rateColor: COLOR_RATE.RED });
    });

    it('should return ALERT and YELLOW with RANDOM type when level < 70', () => {
      const result: RegisterLevelRate = service.setGlycemitRate(60, TYPE_LEVEL.RANDOM);
      expect(result).toEqual({ rate: RATE.ALERT, rateColor: COLOR_RATE.YELLOW });
    });

    it('should return NORMAL and GREEN with RANDOM type when level is between 140 and 200', () => {
      const result: RegisterLevelRate = service.setGlycemitRate(150, TYPE_LEVEL.RANDOM);
      expect(result).toEqual({ rate: RATE.NORMAL, rateColor: COLOR_RATE.GREEN });
    });

    it('should return CRITICAL and RED with RANDOM type when level >= 200', () => {
      const result: RegisterLevelRate = service.setGlycemitRate(220, TYPE_LEVEL.RANDOM);
      expect(result).toEqual({ rate: RATE.CRITICAL, rateColor: COLOR_RATE.RED });
    });

    it('should return undefined with FAST type when level does not match any condition', () => {
      const result: RegisterLevelRate = service.setGlycemitRate(50, TYPE_LEVEL.FAST);
      expect(result).toEqual({ rate: RATE.ALERT, rateColor: COLOR_RATE.YELLOW });
    });

    it('should return undefined with RANDOM type when level does not match any condition', () => {
      const result: RegisterLevelRate = service.setGlycemitRate(50, TYPE_LEVEL.RANDOM);
      expect(result).toEqual({ rate: RATE.ALERT, rateColor: COLOR_RATE.YELLOW });
    });
  });
});
