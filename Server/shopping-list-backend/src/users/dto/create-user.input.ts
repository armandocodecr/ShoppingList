import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {

  @Field(() => String)
  @IsNotEmpty()
  username: string;

  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String)
  @MinLength(5)
  password: string;

}
