import { Module } from '@nestjs/common';
import { GlycemicLevelController } from './glycemic_level/glycemic_level.controller';
import { GlycemicLevelRepository } from './glycemic_level/repository/glycemic_level.repository';
import { GlycemicLevelService } from './glycemic_level/service/glycemic_level.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterLevelEntity } from './glycemic_level/entity/register_level.entity';

@Module({
  imports:[
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST || (process.env.DOCKER_HOST ? '127.0.0.1' : 'mysql'),
      port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
      username: process.env.DATABASE_USER || 'root',
      password: process.env.DATABASE_PASSWORD || 'root',
      database: process.env.DATABASE_NAME || 'glycemic_control',
      autoLoadEntities: true,
      synchronize: true,
      extra: {
        connectionLimit: 5,
        connectTimeout: 60000,
        insecureAuth: true, 
      },
    }),
    TypeOrmModule.forFeature([RegisterLevelEntity]),
  ],
  controllers: [GlycemicLevelController],
  providers: [GlycemicLevelRepository, GlycemicLevelService],
})
export class AppModule {}
