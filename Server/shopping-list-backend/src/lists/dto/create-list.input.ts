import { InputType, Field } from '@nestjs/graphql';
import { IsArray, IsBoolean, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateListInput {
  
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  name: string;

}
