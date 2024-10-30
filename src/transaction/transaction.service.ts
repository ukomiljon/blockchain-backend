import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionEntity } from './entity/transaction.entity';
import axios from 'axios';

@Injectable()
export class TransactionService {

    constructor(
        private httpService: HttpService,
        @InjectRepository(TransactionEntity)
        private transactionRepository: Repository<TransactionEntity>,
    ) { }

    async track(address: string): Promise<TransactionEntity[]> {

        try {
            const { data } = await axios.get(`${process.env.ETHERSCAN_API_URL}`, {
                params: {
                    module: 'account',
                    action: 'txlist',
                    address,
                    apiKey: process.env.ETHERSCAN_API_KEY,
                },
            });

            console.log("data=", data);

            const transactions = data.result.slice(0, 5).map((tx) => ({
                address,
                hash: tx.hash,
                timestamp: tx.timeStamp,
                from: tx.from,
                to: tx.to,
                value: tx.value,
            }));

            console.log("transactions=", transactions);

            await this.transactionRepository.save(transactions);
            return transactions;
        } catch (error) {
            console.log("error=", error);
        }

    }
}
