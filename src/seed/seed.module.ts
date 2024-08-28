import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { UsersModule } from 'src/users/users.module';
import { MoviesModule } from 'src/movies/movies.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [UsersModule, MoviesModule],
})
export class SeedModule {}
