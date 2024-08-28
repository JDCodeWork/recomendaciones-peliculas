import { Injectable } from '@nestjs/common';

import { MoviesService } from 'src/movies/movies.service';
import { UsersService } from 'src/users/users.service';

import { DATA_MOVIES, DATA_USERS } from './data';

@Injectable()
export class SeedService {
  constructor(
    private readonly userService: UsersService,
    private readonly movieService: MoviesService,
  ) {}

  async populateDB() {
    await this.userService.deleteAll();
    await this.movieService.deleteAll();

    const insertMoviesPromises = [];
    const insertUsersPromises = [];

    DATA_MOVIES.forEach((movie) => {
      // Normalizo el rating para que esté entre 1 y 5
      // Genero un número aleatorio y lo multiplico por 10 para que sea la valoración y luego le sumo un numero entre 0 y 1 para que genere algo mas de variacion
      const averageRating = Number(
        Math.max(1, Math.min(5, Math.random() * 10 + Math.random())).toFixed(2),
      );

      const newMovie = this.movieService.create({
        ...movie,
        averageRating,
        numberRatings: Math.round(Math.random() * 50),
      });

      insertMoviesPromises.push(newMovie);
    });

    DATA_USERS.forEach((user) =>
      insertUsersPromises.push(this.userService.create(user)),
    );

    await Promise.all(insertMoviesPromises);
    await Promise.all(insertUsersPromises);
  }
}
