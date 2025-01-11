import { Module } from '@nestjs/common';
import { GlycemicController } from './glycemic_level/glycemic_level.controller';
import { GlycemicLevelRepository } from './glycemic_level/repository/glycemic_level.repository';
import { GlycemicLevelService } from './glycemic_level/glycemic_level.service';

@Module({
  controllers: [GlycemicController],
  providers: [GlycemicLevelRepository, GlycemicLevelService],
})
export class AppModule {}
