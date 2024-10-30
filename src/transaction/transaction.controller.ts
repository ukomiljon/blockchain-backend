import { Controller, Get, Query } from '@nestjs/common';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get('track')
  async track(@Query('address') address: string) {
    return this.transactionService.track(address);
  }
}
