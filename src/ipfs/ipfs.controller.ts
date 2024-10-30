import { Controller, Post, Body } from '@nestjs/common';
import { IPFSService } from './ipfs.service';

@Controller('ipfs')
export class IPFSController {
  constructor(private readonly ipfsService: IPFSService) {}

  @Post('store')
  async storeData(@Body('content') content: string) {
    return this.ipfsService.add(content);
  }
}
