import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { ItemService } from './item.service';
import { ItemResolver } from './item.resolver';

import { Item } from './entities/item.entity';

@Module({
  providers: [ItemResolver, ItemService],
  imports: [
    TypeOrmModule.forFeature([ Item ]),
  ],
  exports: [
    ItemService,
    TypeOrmModule
  ]
})
export class ItemModule {}
