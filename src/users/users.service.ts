import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonService } from 'src/common/common.service';
import { Movie } from 'src/movies/entities/movie.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    private readonly commonService: CommonService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const newUser = this.userRepository.create(createUserDto);

      await this.userRepository.save(newUser);

      return newUser;
    } catch (error) {
      return this.commonService.handleDBExceptions(error);
    }
  }

  findAll() {
    const allUsers = this.userRepository.find({});

    return allUsers;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { id: idDto, ...userDetails } = updateUserDto;

    if (idDto && id != idDto)
      throw new BadRequestException('User id cannot be updated');

    const updatedUser = await this.userRepository.preload({
      id,
      ...userDetails,
    });

    if (!updatedUser)
      throw new NotFoundException(`User with id: '${id}' not found`);

    await this.userRepository.save(updatedUser);

    return updatedUser;
  }

  async remove(id: number) {
    const userDeleted = await this.userRepository.delete({ id });

    if (userDeleted.affected < 1)
      throw new NotFoundException(
        `User with id '${id}' not found or already deleted`,
      );
  }

  async getMovieRecommendation(id: number) {
    const userRef = await this.userRepository.findOneBy({ id });

    if (!userRef) throw new NotFoundException(`User with id '${id}' not found`);

    const movieQuery = await this.movieRepository
      .createQueryBuilder('movie')
      .where('movie.genre && :genre OR movie.actors && :actors', {
        genre: userRef.prefGenre,
        actors: userRef.favActors,
      })
      .orderBy('movie.averageRating', 'DESC')
      .limit(10)
      .getMany();

    const movies =
      movieQuery.length == 0
        ? await this.movieRepository.find({
            order: { averageRating: 'DESC' },
            take: 10,
          })
        : movieQuery;

    return movies;
  }

  deleteAll() {
    return this.userRepository.delete({});
  }
}
