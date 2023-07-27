import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginInput, SignUpInput } from './dto';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { AuthResponse } from './types/auth-response.type';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private getJwt( userId: string ){
    return this.jwtService.sign({ id: userId })
  }


  async signup(signupInput: SignUpInput): Promise<AuthResponse> {
    
    const user = await this.userService.create( signupInput )
    const token = this.getJwt( user.id )

    return { token, user }

  }

  async login( { email, password } :LoginInput ): Promise<AuthResponse> {
    
    const user = await this.userService.findOneByEmail( email )

    if( !bcrypt.compareSync( password, user.password )) throw new BadRequestException('Email / Password do not match')

    const token = this.getJwt( user.id )

    return { token, user }

  }

  async validateUser( id: string ): Promise<User> {
    
    const user = await this.userService.findOneById( id )

    if( !user ) throw new NotFoundException(`User with id ${id} not found`)

    delete user.password

    return user

  }

  revalidateToken( user: User ): AuthResponse {
    
    const token = this.getJwt( user.id )

    return { token, user }

  }

}
