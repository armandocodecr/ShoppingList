import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Resolver, Query, Mutation, Args, Int, ID, ResolveField, Parent } from '@nestjs/graphql';
import { ParseUUIDPipe, UseGuards } from '@nestjs/common';

import { ItemService } from 'src/item/item.service';
import { ListsService } from 'src/lists/lists.service';
import { UsersService } from './users.service';

import { User } from './entities/user.entity';
import { List } from 'src/lists/entities/list.entity';
import { Item } from 'src/item/entities/item.entity';

import { UpdateUserInput } from './dto/update-user.input';

import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { PaginationsArgs, SearchArgs } from 'src/common/dto/args';

@Resolver(() => User)
@UseGuards( JwtAuthGuard )
export class UsersResolver {

  constructor(
    private readonly usersService: UsersService,
    private readonly itemsService: ItemService,
    private readonly listService: ListsService
  ) {}

  @Query(() => [User], { name: 'users' })
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(
    @Args('ID', { type: () => ID }, ParseUUIDPipe) id: string
  ): Promise<User> {
    return this.usersService.findOneById( id );
  }

  @Mutation(() => User)
  async updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @CurrentUser() user: User
  ): Promise<User> {
    return this.usersService.update(updateUserInput.id, updateUserInput, user);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => ID }, ParseUUIDPipe) id: string) {
    return this.usersService.remove(id);
  }

  @ResolveField( () => Int, { name: 'itemCount' } )
  async itemCount(
    @Parent() user: User
  ): Promise<Number> {
    return this.itemsService.itemCountByUser( user )
  }

  @ResolveField( () => [ Item ], { name: 'itemsByUser' } )
  async getItemsByUser(
    @Parent() user: User,
    @Args() paginationArgs: PaginationsArgs,
    @Args() searchArgs: SearchArgs,
  ): Promise<Item[]> {
    return this.itemsService.findAll( user, paginationArgs, searchArgs )
  }

  @ResolveField( ()=> [List], { name: 'listsByUser' } ) 
  async getListByUser(
    @Parent() user: User,
    @Args() paginationArgs: PaginationsArgs,
    @Args() searchArgs: SearchArgs,
  ): Promise<List[]> {
  return this.listService.findAll( user, paginationArgs, searchArgs )
  }


  @ResolveField( ()=> Int, { name: 'listCount' } ) 
  async listCount(
    @Parent() user: User
  ): Promise<Number> {
  return this.listService.listCountByUser( user )
  }

}
