import { join } from 'path';
import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

import { ItemModule } from './item/item.module';
import { UsersModule } from './users/users.module';
import { ListsModule } from './lists/lists.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { CategoriesModule } from './categories/categories.module';
import { ListItemModule } from './list-item/list-item.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      imports: [ AuthModule ],
      inject: [ JwtService ],
      useFactory: async(jwtService: JwtService ) => ({
          playground: false,
          plugins: [
            ApolloServerPluginLandingPageLocalDefault()
          ],
          autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
          context({ req }) {
          },
          cors:{
            credentials: true,
            origin: process.env.CORS_ORIGIN
          }
        })
    }),
    TypeOrmModule.forRootAsync({
      imports: [ ConfigModule ],
      inject: [ ConfigService ],
      useFactory: ( env: ConfigService ) => {
        const config: TypeOrmModuleOptions = {
          type: 'postgres',
          host: env.get('PGHOST'),
          port: env.get('PGPORT'),
          username: env.get('PGUSER'),
          password: env.get('PGPASSWORD'),
          database: env.get('PGDATABASE'),
          synchronize: true,
          autoLoadEntities: true,
        }
        return config
      }
    }),
    ItemModule,
    UsersModule,
    AuthModule,
    CommonModule,
    ListsModule,
    ItemModule,
    ListItemModule,
    CategoriesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
