import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Movie {
  // Se utiliza un numero auto-generado como id
  @ApiProperty({
    example: '108',
    description: 'Identificador de la película',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'The Avengers',
    description: 'Nombre de la película',
    uniqueItems: true,
  })
  @Column({ type: 'text', unique: true })
  title: string;

  @ApiProperty({
    example: ['acción', 'superheroes'],
    description: 'Géneros de la película',
    default: [],
    required: false,
  })
  @Column({ type: 'text', array: true })
  genre: string[];

  @ApiProperty({
    example: ['Robert Downey Jr.', 'Chris Evans', 'Scarlett Johansson'],
    description: 'Actores de la película',
    default: [],
    required: false,
  })
  @Column({ type: 'text', array: true, default: [] })
  actors: string[];

  @ApiProperty({
    example: 4.56,
    description: 'Calificación de la película',
    default: 0,
    required: false,
  })
  @Column({ type: 'real', default: 0 })
  averageRating: number;

  @ApiProperty({
    example: 56,
    description: 'Personas que han calificado la película',
    default: 0,
    required: false,
  })
  @Column({ type: 'integer', default: 0 })
  numberRatings: number;
}
