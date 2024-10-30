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
      host: 'host.docker.internal',
      port: 27017,
      ssl: false,
      authMechanism: 'DEFAULT',
      authSource: 'admin',
      username: 'admin',
      password: 'admin',
      useUnifiedTopology: true,
      database: 'blockchain-app',
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
