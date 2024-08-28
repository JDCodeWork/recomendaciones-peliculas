import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { CommonModule } from 'src/common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { MoviesModule } from 'src/movies/movies.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [CommonModule, MoviesModule, TypeOrmModule.forFeature([User])],
  exports: [UsersService],
})
export class UsersModule {}
