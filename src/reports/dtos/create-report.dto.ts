/* eslint-disable prettier/prettier */

import {
  IsString,
  IsNumber,
  Max,
  Min,
  IsLatitude,
  IsLongitude,
} from 'class-validator';

export class CreateReportDto {
  @Max(100000)
  @IsNumber()
  price: number;

  @IsString()
  brandName: string;

  @IsString()
  model: string;

  @IsNumber()
  @Min(1950)
  @Max(2050)
  year: number;

  @IsNumber()
  @Max(100000)
  mileage: number;

  @IsLongitude()
  @IsString()
  lng: string;

  @IsLatitude()
  @IsString()
  lat: string;
}
