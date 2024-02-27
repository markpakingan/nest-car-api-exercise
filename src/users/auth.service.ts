 import { BadRequestException, Injectable } from "@nestjs/common";
 import { UsersService } from "./users.service";


 @Injectable()
 export class AuthService {
    constructor(private usersService:UsersService ) {}


    async signup(email: string, password: string) {

        //see if email is in us.

        const users = await this.usersService.find(email);
        if(users){
            throw new BadRequestException('email in use')
        }

        //hash the users password


        //Create a new user and save it


        //Return the user
    }

    signin() {

    }
 }
