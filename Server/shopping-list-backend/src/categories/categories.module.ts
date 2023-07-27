import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesResolver } from './categories.resolver';
import { Category } from './entities/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemModule } from 'src/item/item.module';

@Module({
  providers: [CategoriesResolver, CategoriesService],
  imports: [
    TypeOrmModule.forFeature([ Category ]),
    CategoriesModule,
  ],
  exports: [ CategoriesService, TypeOrmModule ]
})
export class CategoriesModule {}
