import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users: {
    name: string;
    email: string;
    role?: 'INTERN' | 'ENGINEER' | 'ADMIN';
    id: any;
  }[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'ADMIN',
    },
    {
      id: 2,
      name: 'Mark Smith',
      email: 'mark@example.com',
      role: 'INTERN',
    },
    {
      id: 3,
      name: 'Peter Obi',
      email: 'john@example.com',
      role: 'ENGINEER',
    },
    {
      id: 3,
      name: 'Johnson Nelson',
      email: 'john20@example.com',
      role: 'ADMIN',
    },
    {
      id: 4,
      name: 'Grace Mensah',
      email: 'gra@example.com',
      role: 'INTERN',
    },
    {
      id: 5,
      name: 'Isaac Oben',
      email: 'john@example.com',
      role: 'ENGINEER',
    },
  ];
  /*  findAll
findOne
create
update
delete */

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      const roleArray = this.users.filter((user) => user.role === role);
      if (roleArray.length === 0)
        throw new NotFoundException(`No user with role:${role} found`);
      return roleArray;
    }

    return this.users;
  }

  findOne(id?: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException(`User with id:${id} not found`);
    return user;
  }

  create(createUserDto: CreateUserDto) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updateUserDto };
      }
      return user;
    });
    return this.findOne(id);
  }

  delete(id: number) {
    const removedUser = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);
    return removedUser;
  }
}
