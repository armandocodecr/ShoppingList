import { InputType, Field, ID } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
export class CreateItemInput {
  
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  name: string

  @Field(() => ID)
  @IsUUID()
  categoryId: string;

  //@Field(() => String, { nullable: true })
  //@IsString()
  //@IsOptional()
  //quantityUnits?: string

  

}
