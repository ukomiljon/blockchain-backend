import { BadRequestException, Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { GetTransactionsDto } from './dto/get-transactions.dto';

@Controller('crypto-transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post(':address')
  async fetchAndStoreTransactions(@Param('address') address: string) {
    if (!address) throw new BadRequestException('Address is required');
    return this.transactionService.fetchAndStoreTransactions(address);
  }

  @Get()
  async getTransactions(@Body() query: GetTransactionsDto) {
    return this.transactionService.getTransactions(query);
  }
}
 

