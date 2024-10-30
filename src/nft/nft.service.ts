import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId, Repository } from 'typeorm';
import Web3 from 'web3';
import { NFTEntity } from './entity/nft.entity';
import axios from 'axios';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class NFTService {
  private web3 = new Web3(process.env.WEB3_URL);

  constructor(
    private httpService: HttpService,
    @InjectRepository(NFTEntity)
    private nftRepository: Repository<NFTEntity>,
  ) { }

  async get(contractAddress: string, tokenId: string): Promise<NFTEntity> { 
    
    const contract = new this.web3.eth.Contract([{
      "constant": true,
      "inputs": [{ "name": "tokenId", "type": "uint256" }],
      "name": "tokenURI",
      "outputs": [{ "name": "", "type": "string" }],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }], contractAddress);


    try { 
      const tokenURI: string = await contract.methods.tokenURI(tokenId).call();

      if (!tokenURI || typeof tokenURI !== 'string') {
        throw new Error('Invalid token URI returned from contract');
      }

      const response = await axios.get(tokenURI, {
        headers: {
          'Accept': 'application/json'
        },
        transformResponse: [(data) => {
          const bufferData = Buffer.from(data, 'binary');
          const jsonString = bufferData.toString('utf-8');

          return JSON.parse(jsonString);
        }]
      });

      
      const { name, description, image } = response.data;
      const createdAt = new Date();
      const updatedAt = new Date();
      const metadata = this.nftRepository.create({
        contractAddress,
        tokenId,
        name,
        description,
        imageUrl: image,
        createdAt,
        updatedAt
      });

      console.log("metadata=",metadata);
      
      return this.nftRepository.save(metadata);

    } catch (error) {
      throw new InternalServerErrorException(error);
    }

  }
}
