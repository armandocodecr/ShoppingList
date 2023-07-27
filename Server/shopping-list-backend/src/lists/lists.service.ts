import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { CreateListInput } from './dto/create-list.input';
import { UpdateListInput } from './dto/update-list.input';

import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { List } from './entities/list.entity';
import { PaginationsArgs, SearchArgs } from 'src/common/dto/args';

@Injectable()
export class ListsService {

  constructor(
    @InjectRepository( List )
    private readonly listRepository: Repository<List>
  ){}

  async create(createListInput: CreateListInput, user: User) {
    let newList = this.listRepository.create({ ...createListInput, user })
    return await this.listRepository.save( newList )
  }

  async findAll(
    user: User,
    paginationArgs: PaginationsArgs,
    searchArgs: SearchArgs
  ): Promise<List[]> {
    
    const { limit, offset } = paginationArgs
    const { search } = searchArgs

    const queryBuilder = this.listRepository.createQueryBuilder()
      .where(`"userId" = :userId`, { userId: user.id })
      .take( limit )
      .skip( offset )

    if( search ) queryBuilder.andWhere('LOWER(name) like :name', { name: `%${ search.toLocaleLowerCase() }%` })

    return await queryBuilder.getMany()
      
  }

  async findOne(id: string, user: User): Promise<List> {
    console.log(user.id)
    const list = await this.listRepository.findOneBy({
      id,
      user: {
        id: user.id
      }
    })

    if( !list ) throw new NotFoundException(`List with id ${id} not found`)

    return list

  }

  async update(id: string, updateListInput: UpdateListInput, user: User): Promise<List> {
    
    await this.findOne( id, user )
    const list = await this.listRepository.preload({ ...updateListInput, user })

    if( list ) throw new NotFoundException(`List with id ${id} not found`)

    return this.listRepository.save( list );

  }

  async remove(id: string, user: User): Promise<List> {

    const list = await this.findOne(id, user)
    await this.listRepository.remove(list)

    return { ...list, id };
  }

  async listCountByUser( user: User ): Promise<Number> {

    return this.listRepository.count({
      "where": {
        user: {
          id: user.id
        }
      }
    })

  }

}
