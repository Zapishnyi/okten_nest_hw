import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CarsModule } from './cars/cars.module';
import { UsersService } from './users/users.service';

@Module({
  imports: [UsersModule, CarsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
