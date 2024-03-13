import { Controller, Body, Post, Get, Patch, Param, Query, Delete, 
    NotFoundException, Session, UseGuards} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dtos/create-report.dto';
import { AuthGuard } from 'src/users/guards/auth.guards';
import { CurrentUser } from 'src/users/decorators/current-user.decorators';
import { User } from 'src/users/user.entity';

@Controller('reports')
export class ReportsController {
    constructor(private reportsService: ReportsService){}

    @Post()
    @UseGuards(AuthGuard )
        createReport(@Body() body: CreateReportDto, @CurrentUser() user: User){
            return this.reportsService.create(body, user);
            // const car = await this.reportService.create(body.make, 
            //     body.model, body.year, body,mileage, body.lng, body.lat, body.price);
             
            //     return car;
        }
    

    // @Get('/reports'){
    //     getReports(@Query({make, model, year, mileage, lat, lng})
    //         make: string, 
    //         model: string, 
    //         year: number, 
    //         lng: string, 
    //         lat: string, 
    //         mileage: number)


    // }

}
 