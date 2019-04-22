import { Module } from '@nestjs/common';
import { CompetitionsService } from './competitions.service';
import { CompetitionsController } from './competitions.controller';
import { CompetitionSchema } from '../models/competitions.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'competitions', schema: CompetitionSchema }]),
  ],
  providers: [CompetitionsService],
  controllers: [CompetitionsController]
})
export class CompetitionsModule {}
