import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayUnique,
  IsArray,
  IsIn,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';

export class CreateMovieDto {
  @ApiProperty({
    example: 'Black Panther',
    description: 'Titulo de la película',
  })
  @IsString()
  @MinLength(2)
  title: string;

  @ApiProperty({
    example: ['acción', 'superheroes'],
    description: 'Géneros de la película',
    enum: [
      'terror',
      'suspenso',
      'acción',
      'aventura',
      'ficción',
      'superheroes',
    ],
    required: false,
  })
  @IsArray()
  @ArrayUnique()
  @IsIn(
    ['terror', 'suspenso', 'acción', 'aventura', 'ficción', 'superheroes'],
    {
      each: true,
    },
  )
  genre: string[];

  @ApiProperty({
    example: ['Chadwick Boseman', 'Michael B. Jordan', "Lupita Nyong'o"],
    description: 'Actores que participan en la película',
    required: false,
  })
  @IsOptional()
  @IsString({ each: true })
  @IsArray()
  actors?: string[];

  @ApiProperty({
    example: 3.5,
    description: 'Valoraciones promedio',
    default: 0,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @Min(0)
  @Max(5)
  averageRating?: number;

  @ApiProperty({
    example: 70,
    description: 'Cantidad de personas que han valorado la película',
    default: 0,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  numberRatings?: number;
}
