import { InputType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateCategoryInput {
  
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  name: string

}
