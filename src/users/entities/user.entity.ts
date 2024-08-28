import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @ApiProperty({
    example: 1083878123,
    description: 'Cédula del usuario',
    uniqueItems: true,
  })
  @PrimaryColumn({ type: 'bigint' })
  id: number;

  @ApiProperty({
    examples: ['suspenso', 'superheroes'],
    description: 'Un arreglo con los géneros preferidos por el usuario',
    default: [],
  })
  @Column({ type: 'text', array: true, default: [] })
  prefGenre: string[];

  @ApiProperty({
    example: ['Leonardo DiCaprio', 'Scarlett Johansson'],
    description: 'Un arreglo con todos los actores que le gustan al usuario',
    default: [],
  })
  @Column({ type: 'text', array: true, default: [] })
  favActors: string[];
}
