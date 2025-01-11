import { Module } from '@nestjs/common';
import { GlycemicController } from './glycemic_level/glycemic_level.controller';
import { GlycemicLevelRepository } from './glycemic_level/repository/glycemic_level.repository';
import { GlycemicLevelService } from './glycemic_level/glycemic_level.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [GlycemicController],
  providers: [GlycemicLevelRepository, GlycemicLevelService],
})
export class AppModule {}
