import { Module} from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { TransactionEntity } from './entity/transaction.entity';
 
@Module({
  imports: [TypeOrmModule.forFeature([TransactionEntity]), HttpModule],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
