import { ObjectType, Field, ID } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { Item } from 'src/item/entities/item.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Categories' })
@ObjectType()
export class Category {
  
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string

  @Column()
  @Field(() => String)
  @IsString()
  name: string

  @Column({
    type: 'boolean',
    default: true
  })
  @Field(() => Boolean)
  isActive: boolean;

  @OneToMany( () => Item, (item) => item.category, { lazy: true } )
  Item: Item

}
