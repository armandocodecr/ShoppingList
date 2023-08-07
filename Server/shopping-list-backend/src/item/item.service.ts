import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemInput, UpdateItemInput } from './dto/inputs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { PaginationsArgs, SearchArgs } from 'src/common/dto/args';

import { Item } from './entities/item.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ItemService {

  constructor(
    @InjectRepository( Item )
    private readonly itemsRepository: Repository<Item>
  ){}

  async create(createItemInput: CreateItemInput, user: User): Promise<Item> {

    const { categoryId, ...rest } = createItemInput

    const newItem = this.itemsRepository.create({ 
      ...rest,
      user: { id: user.id },
      category: { id: categoryId } 
    })

    await this.itemsRepository.save( newItem )

    return this.findOne( newItem.id, user )

  }

  async findAll(
    user: User,
    searchArgs: SearchArgs
  ) {
    
    const { search } = searchArgs
    console.log(user)
    const queryBuilder = this.itemsRepository.createQueryBuilder()
      .where(`"userId" = :userId`, { userId: user.id })

    if( search ) queryBuilder.andWhere('LOWER(name) like :name', { name: `%${ search.toLocaleLowerCase() }%` })
 
    return queryBuilder.getMany()

  }

  async findOne(id: string, user: User): Promise<Item> {
    
    const item = await this.itemsRepository.findOneBy({ 
      id,
      user: {
        id: user.id
      },
    })

    if( !item ) throw new NotFoundException(`Item with id ${id} not found`)

    return item
    
  }

  async update(id: string, updateItemInput: UpdateItemInput, user: User): Promise<Item> {
    
    await this.findOne( id, user )
    const item = await this.itemsRepository.preload( updateItemInput )

    if( !item ) throw new NotFoundException(`Item with id ${id} not found`)

    return this.itemsRepository.save( item )

  }

  async remove(id: string, user: User): Promise<Item> {
    
    const item = await this.findOne( id, user )
    await this.itemsRepository.remove( item )

    return { ...item, id }

  }

  async itemCountByUser( user: User ): Promise<Number> {

    return this.itemsRepository.count({
      "where": {
        user: {
          id: user.id
        }
      }
    })

  }
}
