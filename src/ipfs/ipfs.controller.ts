import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { IPFSService } from './ipfs.service';
import { IPFSEntity } from './entity/ipfs.entity';
 
@Controller('ipfs')
export class IPFSController {
  constructor(
    private readonly ipfsService: IPFSService) { }

  @Post('store')
  async store(@Body('data') data: string): Promise<IPFSEntity> {
    return await this.ipfsService.save(data);;
  }

  @Get(':hash')
  async get(@Param('hash') hash: string): Promise<IPFSEntity> {
    return this.ipfsService.get(hash);
  }
}
