import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Max, Min } from 'class-validator';

export class UpdateRatingDto {
  @ApiProperty({
    example: 5,
    description: 'Agrega la valoración al promedio que ya se lleva',
  })
  @Type(() => Number)
  @Min(0)
  @Max(5)
  rating: number;
}
