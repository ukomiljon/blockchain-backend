import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IPFSController } from './ipfs.controller';
import { IPFSService } from './ipfs.service';
import { IPFSEntity } from './entity/ipfs.entity';
 
@Module({
  imports: [TypeOrmModule.forFeature([IPFSEntity])],
  controllers: [IPFSController],
  providers: [IPFSService],
})
export class IPFSModule {}
