import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int, ID, Parent, ResolveField } from '@nestjs/graphql';

import { ListsService } from './lists.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import { CreateListInput } from './dto/create-list.input';
import { UpdateListInput } from './dto/update-list.input';

import { PaginationsArgs, SearchArgs } from 'src/common/dto/args';

import { List } from './entities/list.entity';
import { User } from 'src/users/entities/user.entity';

import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { IShoppingList } from 'src/interfaces';
import { ValidRoles } from 'src/auth/enums/valid-roles.enum';
import { ListItem } from 'src/list-item/entities/list-item.entity';
import { ListItemService } from 'src/list-item/list-item.service';

@Resolver(() => List)
@UseGuards( JwtAuthGuard )
export class ListsResolver {

  constructor(
    private readonly listsService: ListsService,
    private readonly listsItemService: ListItemService
  ) {}

  @Mutation(() => List)
  createList(
    @Args('createListInput') createListInput: CreateListInput,
    @CurrentUser() user: User
  ) {
    return this.listsService.create(createListInput, user);
  }

  @Query(() => [List], { name: 'lists' })
  async findAll(
    @CurrentUser() user: User,
    @Args() paginationsArgs: PaginationsArgs,
    @Args() searchArgs: SearchArgs,
  ): Promise<List[]> {
    return this.listsService.findAll( user, paginationsArgs, searchArgs );
  }

  @Query(() => List, { name: 'list' })
  async findOne(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @CurrentUser() user: User
  ): Promise<List> {
    return this.listsService.findOne( id, user );
  }

  @Mutation(() => List)
  updateList(
    @Args('updateListInput') updateListInput: UpdateListInput,
    @CurrentUser() user: User
  ): Promise<List> {
    return this.listsService.update(updateListInput.id, updateListInput, user);
  }

  @Mutation(() => List)
  removeList(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @CurrentUser() user: User
  ): Promise<List> {
    return this.listsService.remove( id, user );
  }

  @ResolveField( () => [ListItem], { name: 'items' } )
  async getListItems(
    @Parent() list: List, //Esto lo ponemos para obtener datos del padre y saber cuál es la lista padre en este punto
    @Args() paginationArgs: PaginationsArgs,
    @Args() searchArgs: SearchArgs
  ): Promise<ListItem[]> {

    return this.listsItemService.findAll( list, paginationArgs, searchArgs )

  }

  @ResolveField( ()=> Number, { name: 'totalItems' } )
  async itemCount(
    @CurrentUser([ValidRoles.admin]) adminUser: User,
    @Parent() list: List //Nos permite tener acceso a los datos del padre
  ): Promise<Number> {
    return this.listsItemService.countListItemByUser( list );
  }
  
}
