import { Injectable, InternalServerErrorException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Web3 from 'web3';
import { NFTEntity } from './entity/nft.entity';
import axios from 'axios';
 
@Injectable()
export class NFTService {
  private web3 = new Web3(process.env.WEB3_URL);

  constructor(    
    @InjectRepository(NFTEntity)
    private nftRepository: Repository<NFTEntity>,
  ) { }

  async get(contractAddress: string, tokenId: string): Promise<NFTEntity> {
    try {
      const contract = this.createContractInstance(contractAddress);
      const tokenURI = await this.fetchTokenURI(contract, tokenId);
      const nftData = await this.fetchNFTData(tokenURI);
      const metadata = this.buildMetadata(contractAddress, tokenId, nftData); 

      return await this.nftRepository.save(metadata);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getAll(): Promise<NFTEntity[]> {
    try {
      return await this.nftRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Error retrieving all NFTs');
    }
  }

  private createContractInstance(contractAddress: string): any {
    const contractABI = [
      {
        "constant": true,
        "inputs": [{ "name": "tokenId", "type": "uint256" }],
        "name": "tokenURI",
        "outputs": [{ "name": "", "type": "string" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      }
    ];

    return new this.web3.eth.Contract(contractABI, contractAddress);
  }

  private async fetchTokenURI(contract: any, tokenId: string): Promise<string> {
    const tokenURI = await contract.methods.tokenURI(tokenId).call();

    if (!tokenURI || typeof tokenURI !== 'string') {
      throw new Error('Invalid token URI returned from contract');
    }

    return tokenURI;
  }

  private async fetchNFTData(tokenURI: string): Promise<any> {
    const response = await axios.get(tokenURI, {
      headers: { 'Accept': 'application/json' },
      transformResponse: [this.transformBinaryToJson]
    });

    return response.data;
  }

  private transformBinaryToJson(data: any): any {
    const bufferData = Buffer.from(data, 'binary');
    const jsonString = bufferData.toString('utf-8');

    return JSON.parse(jsonString);
  }

  private buildMetadata(contractAddress: string, tokenId: string, data: any): NFTEntity {
    const { name, description, image } = data;
    const createdAt = new Date();
    const updatedAt = new Date();

    return this.nftRepository.create({
      contractAddress,
      tokenId,
      name,
      description,
      imageUrl: image,
      createdAt,
      updatedAt
    });
  }
}
