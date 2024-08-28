import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { Movie } from 'src/movies/entities/movie.entity';

@ApiTags('Usuarios')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({
    status: 201,
    description: 'Se creo correctamente el usuario',
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: 'Alguna llave se encuentra repetida',
  })
  @ApiResponse({
    status: 500,
    description:
      'Un error por parte de la base de datos no se encuentra manejado (No debería suceder)',
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Proporciona todos los usuarios',
    isArray: true,
    type: User,
  })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiResponse({
    status: 201,
    description: 'El usuario se actualizo correctamente',
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: 'El id del usuario no se puede actualizar',
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontró un usuario con el id especificado',
  })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiResponse({
    status: 200,
    description: 'El usuario se elimino correctamente',
  })
  @ApiResponse({
    status: 404,
    description: 'El usuario no se logro encontrar o ya se elimino',
  })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }

  @ApiTags('Recomendación')
  @ApiResponse({
    status: 200,
    description:
      'Proporciona todas las películas en orden descendente filtrando por las cuales coincidan con al menos uno de los géneros o actores preferidos por el usuario',
    isArray: true,
    type: Movie,
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontró un usuario con el identificador especificado',
  })
  @Get('movie/:id')
  getMovieRecommendation(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getMovieRecommendation(id);
  }
}
