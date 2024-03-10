import { Controller, Body, Post, Get, Patch, Param, Query, Delete, 
    NotFoundException, Session, UseGuards} from '@nestjs/common';
import { ReportsService } from './reports.service';


@Controller('reports')
export class ReportsController {

    constructor(
        private: reportService: ReportsService
    ){}

    @Get('/reports'){
        getReports(@Query({make, model, year, mileage, lat, lng})
            make: string, 
            model: string, 
            year: number, 
            lng: string, 
            lat: string, 
            mileage: number)


    }

    @Post('/reports'){
        async createReport(@Body() body: CreateReportDto ){
            const car = await this.reportService.create(body.make, 
                body.model, body.year, body,mileage, body.lng, body.lat, body.price);
             
                return car;
        }
    }
}
 