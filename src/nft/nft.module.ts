import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NFTController } from './nft.controller';
import { NFTService } from './nft.service';
import { NFTEntity } from './entity/nft.entity';
import { HttpModule } from '@nestjs/axios';
 
@Module({
  imports: [TypeOrmModule.forFeature([NFTEntity]), HttpModule],
  controllers: [NFTController],
  providers: [NFTService],
})
export class NFTModule {}
