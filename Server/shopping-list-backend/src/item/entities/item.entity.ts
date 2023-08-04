import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { User } from 'src/users/entities/user.entity';
import { Category } from '../../categories/entities/category.entity';
import { ListItem } from 'src/list-item/entities/list-item.entity';

@Entity({ name: 'items' })
@ObjectType()
export class Item {
  
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  // stores
  // Relacion con los usuarios (En este caso es: Muchos items pertenecen a un mismo usuario)

  @ManyToOne( () => User, (user) => user.items, { nullable: false, lazy: true } ) //Lazy permite que la BD cargue los datos de user
  @Index('userId-Index')
  @Field( ()=> User )
  user: User;

  @ManyToOne(() => Category, (category) => category.Item, { nullable: false, lazy: true })
  @Index('categoryId-Index')
  @Field(() => Category)
  category: Category;

  @OneToMany( () => ListItem, (listItem) => listItem.item, { lazy: true } )
  @Field(() => [ListItem])
  listItem: ListItem

}
