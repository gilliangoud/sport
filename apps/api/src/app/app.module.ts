import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CompetitionsModule } from './competitions/competitions.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    CompetitionsModule,
    MongooseModule.forRoot('mongodb://localhost/nest' || process.env.MONGO_URI),
    SharedModule
  ],
  controllers: [AppController],
  providers: []
})
export class AppModule {}
