import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './reports.entity';

@Injectable()
export class ReportsService {

    constructor(@InjectRepository(Report) private repo: Repository<Report>){}

    create(make: string, model: string, year: number,
        mileage: number, lng: string, lat: number, price: number){
            const car = this.repo.create({make, model, year, 
                mileage, lng, lat, price});
        
            return this.repo.save(car);
        } 
}
 