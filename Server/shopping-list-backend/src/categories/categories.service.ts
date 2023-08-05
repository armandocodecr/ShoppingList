import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class CategoriesService {

  constructor(
    @InjectRepository( Category )
    private readonly categoriesRepository: Repository<Category>
  ){}

  async create(createCategoryInput: CreateCategoryInput, user: User): Promise<Category> {

    const newCategory = this.categoriesRepository.create({ 
      ...createCategoryInput,
      user: { id: user.id }
     })

    await this.categoriesRepository.save( newCategory )

    return this.findOne( newCategory.id, user )

  }

  findAll( user: User ): Promise<Category[]> {
    
    const queryBuilder = this.categoriesRepository.createQueryBuilder()
      .where(`"userId" = :userId`, { userId: user.id })

    return queryBuilder.getMany()

  }

  async findOne( id: string, user: User ) {
    
    const cateogry = await this.categoriesRepository.findOneBy({ 
      id,
      user: {
        id: user.id
      },
    })

    if( !cateogry ) throw new NotFoundException(`Cateogry with id ${id} not found`)

    return cateogry

  }

  async update(id: string, updateCategoryInput: UpdateCategoryInput, user: User): Promise<Category> {
    
    await this.findOne( id, user )
    const category = await this.categoriesRepository.preload( updateCategoryInput )

    if( !category ) throw new NotFoundException(`Category with id ${id} not found`)

    return this.categoriesRepository.save( category )

  }

  async block( id: string, user: User ): Promise<Category> {
    
    const userToBlock = await this.findOne( id, user )
    userToBlock.isActive = false;

    return this.categoriesRepository.save(userToBlock)

  }
}
