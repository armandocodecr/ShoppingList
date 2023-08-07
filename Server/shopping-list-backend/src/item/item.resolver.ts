import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import { ItemService } from './item.service';
import { UpdateItemInput, CreateItemInput } from './dto/inputs';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

import { Item } from './entities/item.entity';
import { User } from 'src/users/entities/user.entity';
import { PaginationsArgs, SearchArgs } from 'src/common/dto/args';

@Resolver(() => Item)
@UseGuards( JwtAuthGuard )
export class ItemResolver {

  constructor(private readonly itemService: ItemService) {}

  @Mutation(() => Item, { name: 'createItem' })
  async createItem(
    @Args('createItemInput') createItemInput: CreateItemInput,
    @CurrentUser() user: User
  ): Promise<Item> {
    return this.itemService.create(createItemInput, user);
  }

  @Query(() => [Item], { name: 'items' })
  async findAll(
    @CurrentUser() user: User,
    @Args() searchArgs: SearchArgs
  ): Promise<Item[]> {
    return this.itemService.findAll(user, searchArgs);
  }

  @Query(() => Item, { name: 'item' })
  async findOne(
    @Args('id', { type: () => ID }) id: string,
    @CurrentUser() user: User
  ): Promise<Item> {
    return this.itemService.findOne(id, user);
  }

  @Mutation(() => Item)
  updateItem(
    @Args('updateItemInput') updateItemInput: UpdateItemInput,
    @CurrentUser() user: User
  ): Promise<Item> {
    return this.itemService.update(updateItemInput.id, updateItemInput, user);
  }

  @Mutation(() => Item, { name: 'removeItem' })
  removeItem(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @CurrentUser() user: User
  ): Promise<Item> {
    return this.itemService.remove(id, user);
  }
}
