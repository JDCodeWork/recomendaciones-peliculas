import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayUnique,
  IsArray,
  IsIn,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 1083878123,
    description: 'Cédula del usuario',
  })
  @Min(999999) // La cédula debe ser mayor de 7 dígitos
  @Max(9999999999) // La cédula debe ser menor o igual a 10 dígitos
  id: number;

  @ApiProperty({
    example: ['terror'],
    description: 'Géneros preferidos de películas',
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
  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsIn(
    ['terror', 'suspenso', 'acción', 'aventura', 'ficción', 'superheroes'],
    {
      each: true,
    },
  )
  prefGenre: string[];

  @ApiProperty({
    example: ['Emma Watson'],
    description: 'Actores preferidos',
    required: false,
  })
  @IsOptional()
  @IsString({ each: true })
  @IsArray()
  favActors: string[];
}
