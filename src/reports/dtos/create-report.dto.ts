import { IsNumber, IsString } from "class-validator";

export class CreateReportDto{

    // make, model, year, mileage, lng, lat, price


    @IsString()
    make: string;

    @IsString()
    model : string; 

    @IsNumber()
    year: number;

    @IsString()
    lng: string; 

    @IsString()
    lat: string;

    @IsNumber()
    price: number;
    
}