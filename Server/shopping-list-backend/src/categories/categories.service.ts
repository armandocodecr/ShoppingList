import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoriesService {

  constructor(
    @InjectRepository( Category )
    private readonly categoriesRepository: Repository<Category>
  ){}

  async create(createCategoryInput: CreateCategoryInput) {
    
    const newCategory = this.categoriesRepository.create({ ...createCategoryInput })
    return await this.categoriesRepository.save( newCategory )

  }

  findAll() {
    
    const categories = this.categoriesRepository.find()
    return categories

  }

  findOne( id: string ) {
    
    const category = this.categoriesRepository.findOneBy({ id })

    if( !category ) throw new NotFoundException(`Category with id ${id} not found`)

    return category

  }

  async update(id: string, updateCategoryInput: UpdateCategoryInput) {
    
    await this.findOne( id )
    const category = await this.categoriesRepository.preload( updateCategoryInput )

    if( !category ) throw new NotFoundException(`Category with id ${id} not found`)

    return this.categoriesRepository.save( category )

  }

  async block( id: string ): Promise<Category> {
    
    const userToBlock = await this.findOne( id )
    userToBlock.isActive = false;

    return this.categoriesRepository.save(userToBlock)

  }
}
