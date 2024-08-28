import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { Repository } from 'typeorm';
import { CommonService } from 'src/common/common.service';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    private readonly commonService: CommonService,
  ) {}

  async create(createMovieDto: CreateMovieDto) {
    try {
      const newMovie = this.movieRepository.create(createMovieDto);

      await this.movieRepository.save(newMovie);

      return newMovie;
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }

  findAll() {
    const allMovies = this.movieRepository.find({});

    return allMovies;
  }

  async updateRating(rating: number, id: number) {
    const movie = await this.movieRepository.findOne({
      where: { id },
    });

    if (!movie) throw new NotFoundException(`Movie with id '${id}' not found`);

    // Calculo el nuevo promedio obteniendo todas las valoraciones y sumándole la nueva
    movie.averageRating = Number(
      (
        (movie.averageRating * movie.numberRatings + rating) /
        (movie.numberRatings + 1)
      ).toFixed(2),
    );

    movie.numberRatings += 1;

    await this.movieRepository.save(movie);

    return movie;
  }

  deleteAll() {
    return this.movieRepository.delete({});
  }
}
