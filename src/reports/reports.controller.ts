import { Controller, Post, Body } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private reportsSerice: ReportsService) {}
  //   @Post()
  //   createReport(@Body() body: CreateReportDto) {
  //     return this.reportsSerice.create(body);
  //   }
}
