import { ObjectType, Field, ID } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { Item } from 'src/item/entities/item.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @ManyToOne( () => User, (user) => user.categories, { nullable: false, lazy: true } ) //Lazy permite que la BD cargue los datos de user
  @Index('userId-category-Index')
  @Field( ()=> User )
  user: User;

  @OneToMany( () => Item, (item) => item.category, { lazy: true } )
  Item: Item[]

}
