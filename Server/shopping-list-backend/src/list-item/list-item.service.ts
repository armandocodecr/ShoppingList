import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateListItemInput } from './dto/create-list-item.input';
import { UpdateListItemInput } from './dto/update-list-item.input';

import { ListItem } from './entities/list-item.entity';
import { List } from 'src/lists/entities/list.entity';
import { PaginationsArgs, SearchArgs } from 'src/common/dto/args';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ListItemService {

  constructor(
    @InjectRepository( ListItem )
    private readonly listItemRepository: Repository<ListItem>
  ){}

  async create(createListItemInput: CreateListItemInput) {
    
    const { itemId, listId, ...rest } = createListItemInput

    const newListItem  = this.listItemRepository.create({
      ...rest,
      item: { id: itemId },
      list: { id: listId }
    })

    await this.listItemRepository.save( newListItem )

    return this.findOne( newListItem.id )

  }

  async findAll(
    list: List,
    paginationArgs: PaginationsArgs,
    searchArgs: SearchArgs
  ): Promise<ListItem[]> {
    
    const { limit, offset } = paginationArgs;
    const { search } = searchArgs;
    
    const queryBuilder = this.listItemRepository.createQueryBuilder('listItem') // <-- Nombre para las relaciones
      .innerJoin('listItem.item','item') // <--- Lo añadí después, fue un problema que no grabé
      .take( limit )
      .skip( offset )
      .where(`"listId" = :listId`, { listId: list.id });

    if ( search ) {
      queryBuilder.andWhere('LOWER(item.name) like :name', { name: `%${ search.toLowerCase() }%` });
    }

    return queryBuilder.getMany();


  }

  async findOne(id: string): Promise<ListItem> {
    
    const listItem = await this.listItemRepository.findOneBy({ id })

    if( !listItem ) throw new NotFoundException(`List item with id ${ id } not found`)

    return listItem

  }

  async update(id: string, updateListItemInput: UpdateListItemInput): Promise<ListItem> {
    
    const { listId, itemId, ...rest } = updateListItemInput
    const queryBuilder = this.listItemRepository.createQueryBuilder()
    .update()
    .set( rest )
    .where('id = :id', { id })
    
    if( listId ) queryBuilder.set({ list: { id: listId } }) // Ver la explicacion de esto
    if( itemId ) queryBuilder.set({ item: { id: itemId } })
    
    await queryBuilder.execute()

    return await this.findOne( id )

  }

  async remove( id: string ): Promise<ListItem> {
    //ToDo: soft delete, integrad referencial
    const item = await this.findOne( id )
    await this.listItemRepository.remove( item )

    return { ...item, id }
  }

  async countListItemByUser( list: List ): Promise<Number> {

    return this.listItemRepository.count({
      "where": { list: { id: list.id } }
    })

  }

}
