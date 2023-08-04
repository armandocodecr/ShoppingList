import { InputType, Field } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateListInput {
  
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field(() => Boolean)
  @IsBoolean()
  @IsNotEmpty()
  completed: boolean;

}
