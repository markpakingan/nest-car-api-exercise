import { Test } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { UsersService } from "./users.service";
import { User } from "./user.entity";
import { BadRequestException, NotFoundException } from '@nestjs/common';




describe('AuthAService', () => {

    let service: AuthService;
    let fakeUsersService: Partial <UsersService>


    beforeEach(async ()=> {

        // Create a fake copy of the users service
        const users: User[] = [];

        fakeUsersService = {
            find: (email : string) => {
              const filteredUsers = users.filter((user) => user.email === email);
              return Promise.resolve(filteredUsers)
            },
            create: (email: string, password: string) => {
              const user = { 
                id: Math.floor(Math.random() * 9999999),
                email, 
                password,
               } as User
              users.push(user); 
              return user; 

              return Promise.resolve(user);
            }
          };
    })

    it ('can create an instance of auth service', async() => {

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

    
    it('throws if signin is called with an unused email', async () => {
        await expect(
          service.signin('asdf@asdf.com', 'asdlfkajsd'),
        ).rejects.toThrow(NotFoundException);
      });

 
    it('throws if an invalid password is provided', async () => {
        fakeUsersService.find = () =>
          Promise.resolve([
            { email: 'asdf@asdf.com', password: 'asdlfkajsd' } as User,
          ]);
        await expect(
          service.signin('asdf@asdf.com', 'wrongpassword'),
        ).rejects.toThrow(NotFoundException);
      });

    it('returns a user if correct password is provided', async() => {
      await service.signup('asdf@asdf.com', 'asdlfkajsd'); 

      const user = await service.signin('asdf@asdf.com', 'asdlfkajsd');
      expect(user).toBeDefined();
    })

});



//testing