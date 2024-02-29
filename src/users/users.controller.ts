import { Body, Controller, Post, Get, Patch, Param, Query, Delete, NotFoundException, 
    ClassSerializerInterceptor,UseInterceptors, Session} from '@nestjs/common';
import {CreateUserDto}  from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorators';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptors';
import { User } from './user.entity';


@Controller('auth')
@Serialize(UserDto)
@UseInterceptors(CurrentUserInterceptor)
export class UsersController {
    constructor(
        private usersService: UsersService,
        private authService : AuthService){}

    // @Get('/whoami')
    // whoAmI(@Session() session: any){
    //     return this.usersService.findOne(session.userId);
    // }


    @Get('/whoami')
    whoAmI(@CurrentUser() user: User){
        return user
    }
    
    @Post('/signup')
    async createUser(@Body() body: CreateUserDto, @Session() session : any){
        const user =  await this.authService.signup(body.email, body.password);
        session.userId = user.id;
        return user; 
    }

    @Post('signin')
    async signInUser(@Body() body: CreateUserDto, @Session() session: any){
        const user = await this.authService.signin(body.email, body.password);
        session.userId = user.id;
        return user;
    }

    @Post('/signout')
    async signout(@Session() session: any){
        session.userId = null;
    }

    @Get('/:id')
    async findUser(@Param('id') id: string){

        console.log('handler is running');
        const user = await this.usersService.findOne(parseInt(id));

        if(!user){
            throw new NotFoundException('users not found')
        }

        return user; 
    }

    @Get('')
    getUserEmail(@Query('email') email : string){
        return this.usersService.find(email);
    }
    

    @Delete('/:id')
    removeUser(@Param('id') id:string){
        return this.usersService.remove(parseInt(id));
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body : UpdateUserDto){
        return this.usersService.update(parseInt(id), body);
    }
}   
 