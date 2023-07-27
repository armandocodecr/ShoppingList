import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { IsString } from 'class-validator';

import { User } from 'src/users/entities/user.entity';
import { ListItem } from 'src/list-item/entities/list-item.entity';

@Entity({ name: 'List' })
@ObjectType()
export class List {

  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID )
  id: string;

  @Column()
  @Field(() => String)
  @IsString()
  name: string

  // Relaion, index('usedId-list-index')
  @ManyToOne( () => User, (user) => user.lists, { nullable: false, lazy: true } ) //Lazy permite que la BD cargue los datos de user
  @Index('usedId-list-index')
  @Field( ()=> User )
  user: User;

  @OneToMany( () => ListItem, (listItem) => listItem.list, { lazy: true } )
  // @Field(() => [ListItem])
  listItem: ListItem


}
