import { Test } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { UsersService } from "./users.service";
import { User } from "./user.entity";
import { BadRequestException, NotFoundException } from '@nestjs/common';




describe('AuthAService', () => {

    let service: AuthService;
    let fakeUsersService: Partial <UsersService>

    beforeEach(async ()=> {
    
    })

    it (' can create an instance of auth service', async() => {

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

        service = module.get(AuthService); 

        expect(service).toBeDefined();
    } )


    it('creates a new user with a salt and hashed password', async()=> {
        const user = await service.signup('testuser@yahoo.com', 'asdf')

        expect(user.password).not.toEqual('asdf');
        const [ salt, hash] = user.password.split('.');
        expect(salt).toBeDefined();
        expect(hash).toBeDefined();

    })

    // it('throws an error if user signs up with email that is in use', async () => {
    //     fakeUsersService.find = () =>
     
    //       Promise.resolve([{ id: 1, email: 'a', password: '1' } as User]);
    //     await expect(service.signup('asdf@asdf.com', 'asdf')).rejects.toThrow(
    //       BadRequestException,
    //     );
    //   });

    
    it('throws if signin is called with an unused email', async () => {
        await expect(
          service.signin('asdflkj@asdlfkj.com', 'passdflkj'),
        ).rejects.toThrow(NotFoundException);
      });
});



//testing