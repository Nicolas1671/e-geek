import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth/auth.controller';
import { AuthService } from '../auth/auth.service';
import { AuthRepository } from '../auth/auth.repository';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from '../users/users.repository';
import { CreateUserDto } from '../users/dtos/CreateUser.dto';
import { Users } from 'src/entities/users.entity';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

describe('AuthController', () => {
    let authController: AuthController;
    let mockUsersRepository: Partial<UsersRepository>;

    const mockUser: CreateUserDto = {
        name: 'Nicolas',
        email: 'Nicolas@mail.com',
        address: '123 Main St, City, Country',
        phone: '+1234567890',
        password: 'Pincha1982',
    };

    beforeEach(async () => {
        mockUsersRepository = {
              findByEmail: (email: string) => Promise.resolve(null),
              createUser: (user: Omit<CreateUserDto, 'id'>) =>
                Promise.resolve({
                  ...user,
                  id: '12344-1231234-454564-45455',
                  credential: {
                    password: 'Pincha1982',
                  },
                } as unknown as Users),
            };

        const mockJwtService = {
              sign: (payload: any) => jwt.sign(payload, 'secret'),
            };

        const module: TestingModule = await Test.createTestingModule({
        controllers: [AuthController],
        providers: [
            AuthService,
            AuthRepository,
            { provide: JwtService, useValue: mockJwtService },
            {
                provide: UsersRepository,
                useValue: mockUsersRepository,
            },
        ],
        }).compile();
        authController = module.get<AuthController>(AuthController);
    });

    it('should be defined', () => {
        expect(authController).toBeDefined();
    });

    it('should sign up a user', async () => {
        const result = await authController.signUp(mockUser);
        expect(result).toBeDefined();
        expect(result).toEqual({ message: 'User created successfully' });
    });

    it('signIn returns an error if the user is not found', async () => {
    try {
      await authController.signIn({
        email: mockUser.email,
        password: mockUser.password,
      });
    } catch (error) {
      expect(error.message).toBe('Invalid email or password');
    }
    });

    it('signIn returns an error if the password is incorrect', async () => {
    mockUsersRepository.findByEmail = (email: string) =>
      Promise.resolve({
        ...mockUser,
        credential: {
          password: 'Pincha1982',
        },
      } as unknown as Users);
    try {
      await authController.signIn({
        email: mockUser.email,
        password: 'wrongpassword',
      });
    } catch (error) {
      expect(error.message).toBe('Invalid email or password');
    }
    });

    it('signIn returns a token and a message if the credentials are valid', async () => {
        const mockUserVariant = {
          ...mockUser,
          credential: {
            password: await bcrypt.hash(mockUser.password, 10),
          },
        };
        mockUsersRepository.findByEmail = (email: string) =>
          Promise.resolve(mockUserVariant as unknown as Users);
        const result = await authController.signIn({
          email: mockUser.email,
          password: mockUser.password,
        });
        expect(result.message).toBe('Sign-in successful');
        expect(result.token).toBeDefined();
      });
});
