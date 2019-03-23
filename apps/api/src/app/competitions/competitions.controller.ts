import { Controller } from '@nestjs/common';

@Controller('competitions')
@UseGuards(AuthGuard())
export class CompetitionsController {}
