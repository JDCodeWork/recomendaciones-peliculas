import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Movie } from './entities/movie.entity';

@ApiTags('Películas')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'La película fue creada correctamente',
    type: Movie,
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
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Proporciona todas las películas',
    isArray: true,
    type: Movie,
  })
  @Get()
  findAll() {
    return this.moviesService.findAll();
  }

  @ApiResponse({
    status: 201,
    description: 'La película fue actualizada correctamente',
    type: Movie,
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontró la película',
  })
  @Patch('/rating/:id')
  updateRating(
    @Param('id', ParseIntPipe) id: number,
    @Body() { rating }: UpdateRatingDto,
  ) {
    return this.moviesService.updateRating(rating, id);
  }
}
