import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionEntity } from './entity/transaction.entity';
import axios from 'axios';
import { GetTransactionsDto } from './dto/get-transactions.dto';

@Injectable()
export class TransactionService {

    constructor(        
        @InjectRepository(TransactionEntity)
        private transactionRepository: Repository<TransactionEntity>,
    ) { }

    async save(address: string): Promise<TransactionEntity[]> {
        try {
            const response = await axios.get(process.env.ETHERSCAN_API_URL, {
                params: {
                    module: 'account',
                    action: 'txlist',
                    address,
                    startblock: 0,
                    endblock: 99999999,
                    sort: 'desc',
                    apikey: process.env.ETHERSCAN_API_KEY,
                },
            });

            const transactions = response.data.result.slice(0, 5).map((tx) => ({
                address,
                hash: tx.hash,
                from: tx.from,
                to: tx.to,
                value: tx.value,
                timestamp: new Date(parseInt(tx.timeStamp) * 1000),
            }));

            console.log("transactions=",transactions);
            
            await this.transactionRepository.save(transactions);    
            console.log("Transactions successfully saved.");

            return transactions;
        } catch (error) {
            throw new InternalServerErrorException('Error fetching transactions');
        } 

    }

    async get(query: GetTransactionsDto): Promise<TransactionEntity[]> {
        const { address, startDate, endDate } = query;
    
        const filter: any = { address };
    
        // Apply date range filtering if `startDate` or `endDate` is provided
        if (startDate || endDate) {
            filter.timestamp = {};
            if (startDate) filter.timestamp['$gte'] = new Date(startDate);
            if (endDate) filter.timestamp['$lte'] = new Date(endDate);
        }
    
        return await this.transactionRepository.find(filter);
    }
}
