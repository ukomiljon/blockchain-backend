import { Controller, Get, Query } from '@nestjs/common';
import { NFTService } from './nft.service';

@Controller('nft')
export class NFTController {
  constructor(private readonly nftService: NFTService) {}

  @Get('metadata')
  async getMetadata(
    @Query('contractAddress') contractAddress: string,
    @Query('tokenId') tokenId: string,
  ) {
    return this.nftService.get(contractAddress, tokenId);
  }
}
