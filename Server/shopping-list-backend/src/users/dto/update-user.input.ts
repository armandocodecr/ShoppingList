import { IsBoolean, IsOptional, IsUUID } from 'class-validator';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

import { CreateUserInput } from './create-user.input';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {

  @Field(() => ID)
  @IsUUID() 
  id: string;

  @Field(() => Boolean, { nullable: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

}
