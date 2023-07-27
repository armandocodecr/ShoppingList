import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

import { LoginInput, SignUpInput } from './dto';
import { AuthResponse } from './types/auth-response.type';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from 'src/users/entities/user.entity';

@Resolver(() => AuthResolver)
export class AuthResolver {

  constructor(private readonly authService: AuthService,) {}

  @Mutation(() => AuthResponse, { name: 'signup' })
  async signup(
    @Args('signupInput') signupInput: SignUpInput
  ): Promise<AuthResponse> {
    return this.authService.signup( signupInput );
  }

  @Mutation(() => AuthResponse, { name: 'login' })
  async login(
    @Args('loginInput') loginInput: LoginInput
  ): Promise<AuthResponse>{
    return this.authService.login( loginInput )
  }

  @Query(() => AuthResponse, { name: 'revalidate' })
  @UseGuards( JwtAuthGuard )
  revalidateToken(
    @CurrentUser() user: User
  ): AuthResponse {
    return this.authService.revalidateToken( user )
  }

}
