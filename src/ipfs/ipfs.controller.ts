import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { IPFSService } from './ipfs.service';
import { IPFSEntity } from './entity/ipfs.entity';
 
@Controller('ipfs')
export class IPFSController {
  constructor(
    private readonly ipfsService: IPFSService) { }

  @Post('store')
  async storeData(@Body('data') data: string): Promise<IPFSEntity> {
    return await this.ipfsService.storeData(data);;
  }

  @Get('retrieve/:hash')
  async retrieveData(@Param('hash') hash: string): Promise<IPFSEntity> {
    return this.ipfsService.retrieveData(hash);
  }
}
