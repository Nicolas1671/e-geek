import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from '../users/users.repository';
import { CreateUserDto } from '../users/dtos/CreateUser.dto';
import { Users } from '../../entities/users.entity';
import { AuthRepository } from './auth.repository';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

describe('AuthService', () => {
  let authService: AuthService;
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

    const module = await Test.createTestingModule({
      providers: [
        AuthRepository,
        AuthService,
        { provide: JwtService, useValue: mockJwtService },
        { provide: UsersRepository, useValue: mockUsersRepository },
      ],
    }).compile();
    authService = module.get<AuthService>(AuthService);
  });

  it('Create an instance of auth service', async () => {
    expect(authService).toBeDefined();
  });

  it('singUp should create a new user', async () => {
    const user = await authService.signUp(mockUser);
    expect(user).toBeDefined();
    expect(user).toEqual({ message: 'User created successfully' });
  });

  it('singUp should throw an error if user already exists', async () => {
    mockUsersRepository.findByEmail = (email: string) =>
      Promise.resolve(mockUser as unknown as Users);
    try {
      await authService.signUp(mockUser);
    } catch (error) {
      expect(error.message).toBe('User already exists');
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
      await authService.signIn({
        email: mockUser.email,
        password: 'wrongpassword',
      });
    } catch (error) {
      expect(error.message).toBe('Invalid email or password');
    }
  });

  it('signIn returns an error if the user is not found', async () => {
    try {
      await authService.signIn({
        email: mockUser.email,
        password: mockUser.password,
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
    const result = await authService.signIn({
      email: mockUser.email,
      password: mockUser.password,
    });
    expect(result.message).toBe('Sign-in successful');
    expect(result.token).toBeDefined();
  });
});
