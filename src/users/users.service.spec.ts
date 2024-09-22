import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { NotFoundException } from '@nestjs/common';
import { faker } from '@faker-js/faker';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', () => {
    const usuario = service.create({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });
    expect(usuario).toHaveProperty('id');
  });

  it('should list all users', () => {
    service.create({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });
    const usuarios = service.findAll();
    expect(usuarios.length).toBeGreaterThan(0);
  });

  it('should find a user by ID', () => {
    const usuario = service.create({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });
    const foundUser = service.findOne(usuario.id);
    expect(foundUser).toEqual(usuario);
  });

  it('should throw NotFoundException if user not found', () => {
    expect(() => service.findOne(999)).toThrow(NotFoundException);
  });

  it('should update a user', () => {
    const usuario = service.create({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });
    const updatedUser = service.update(usuario.id, {
      name: faker.person.fullName(),
    });
    expect(updatedUser.name).toEqual(expect.any(String));
  });

  it('should remove a user', () => {
    const usuario = service.create({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });
    service.remove(usuario.id);
    expect(() => service.findOne(usuario.id)).toThrow(NotFoundException);
  });
});
