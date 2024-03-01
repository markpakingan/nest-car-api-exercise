import { Test } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { UsersService } from "./users.service";
import { User } from "./user.entity";

it (' can create an insteance of auth service', async() => {

    //Create a fake copt of the users service
    const fakeUSersService : Partial<UsersService> = { 
        find: ()=> Promise.resolve([]), 
        create: (email: string, password: string) => 
        Promise.resolve({ id: 1, email, password } as User)
    }

     
    const module = await Test.createTestingModule({ 
        providers: [
            AuthService ,
        {
            provide: UsersService, 
            useValue: fakeUSersService
        }]
    }).compile(); 

    const service = module.get(AuthService);

    expect(service).toBeDefined();
} )