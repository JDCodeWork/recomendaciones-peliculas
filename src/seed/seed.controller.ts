import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Semilla')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @ApiResponse({
    status: 201,
    description: 'Se llenaron todas las tablas de la base de datos',
  })
  @Get()
  populateDB() {
    return this.seedService.populateDB();
  }
}
