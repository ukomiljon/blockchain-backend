import { Controller, Get, Query } from '@nestjs/common';
import { NFTService } from './nft.service';
import { NFTEntity } from './entity/nft.entity';

@Controller('nft')
export class NFTController {
  constructor(private readonly nftService: NFTService) { }

  @Get('metadata')
  async getMetadata(
    @Query('contractAddress') contractAddress: string,
    @Query('tokenId') tokenId: string,
  ): Promise<NFTEntity> {
    return await this.nftService.get(contractAddress, tokenId);
  }

  @Get('all')
  async getAll(): Promise<NFTEntity[]> {
    return await this.nftService.getAll();
  }
}
