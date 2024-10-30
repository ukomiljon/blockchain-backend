import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NFTModule } from './nft/nft.module';
import { TransactionModule } from './transaction/transaction.module';
import { IPFSModule } from './ipfs/ipfs.module';
import { NFTEntity } from './nft/entity/nft.entity';
import { IPFSEntity } from './ipfs/entity/ipfs.entity';
import { TransactionEntity } from './transaction/entity/transaction.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: process.env.MONGODB_HOST,
      port: parseInt(process.env.MONGODB_PORT, 10),
      ssl: false,
      authMechanism: 'DEFAULT',
      authSource: 'admin',
      username:  'admin',
      password: 'admin',
      useUnifiedTopology: true,
      database: process.env.MONGODB_DB,
      entities: [NFTEntity, IPFSEntity, TransactionEntity],
      // url: process.env.MONGODB_URL,      
      // synchronize: true,
      // autoLoadEntities: true,
    }),
    NFTModule,
    TransactionModule,
    IPFSModule,
  ],
})
export class AppModule { }
