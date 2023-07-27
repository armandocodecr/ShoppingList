import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt'

import { User } from './entities/user.entity';

import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignUpInput } from 'src/auth/dto';

@Injectable()
export class UsersService {

  private logger: Logger = new Logger('UserService')

  constructor(
   @InjectRepository(User)
   private readonly userRepository: Repository<User>
  ){}

  async create(signupInput: SignUpInput) {
    
    try {
      
      const newUser = this.userRepository.create({
        ...signupInput,
        password: bcrypt.hashSync( signupInput.password, 10 )
      })

      return await this.userRepository.save(  newUser)
      
    } catch (error) {
      this.handleDBErrors( error )
    }

  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOneByEmail(email: string): Promise<User> {
   
    try {
      return await this.userRepository.findOneByOrFail({ email })
    } catch (error) {
      throw new NotFoundException(`${email} not found`)
    }
    
  }

  async findOneById(id: string): Promise<User> {
   
    try {
      return await this.userRepository.findOneByOrFail({ id })
    } catch (error) {
      throw new NotFoundException(`${id} not found`)
    }
    
  }

  async update(
    id: string, 
    updateUserInput: UpdateUserInput,
    updatedBy: User
  ) {
    try {
      
      const user = await this.userRepository.preload({
        ...updateUserInput,
        id
      })

      user.lastUpdtedBy = updatedBy

      return await this.userRepository.save( user )

    } catch (error) {
      this.handleDBErrors( error )
    }
  }

  async remove(id: string): Promise<User> {
    
    const user = await this.findOneById( id )

    await this.userRepository.remove( user )

    return user;
    
  }

  private handleDBErrors( error: any ): never {

    if( error.code === '23505' ){
      throw new BadRequestException(error.detail.replace('Key', ''))
    }

    if( error.code === 'error-001' ){
      throw new BadRequestException(error.detail.replace('Key', ''))
    }
    
    this.logger.error( error )

    throw new InternalServerErrorException('Please check server logs')

  }
}
