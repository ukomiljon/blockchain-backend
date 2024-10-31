// src/ipfs/ipfs.service.ts
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import * as FormData from 'form-data';
import { IPFSEntity } from './entity/ipfs.entity';

@Injectable()
export class IPFSService {

  private readonly authHeader = 'Basic ' + Buffer.from(`${process.env.INFURA_PROJECT_ID}:${process.env.INFURA_SECRET}`).toString('base64');

  constructor(
    @InjectRepository(IPFSEntity)
    private ipfsRepository: Repository<IPFSEntity>,
  ) { }

  async save(data: string): Promise<IPFSEntity> {
    try {

      const response = await axios.post(`${process.env.IPFS_PINATA_API_URL}`, { data }, {
        headers: {
          pinata_api_key: process.env.PINATA_API_KEY,
          pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY,
        },

      });

      const ipfsData = this.ipfsRepository.create({
        hash: response.data.IpfsHash,
        content: data,
        createdAt: new Date(),
      });

      return await this.ipfsRepository.save(ipfsData);

    } catch (error) {
      throw new InternalServerErrorException('Could not store data on IPFS');
    }
  }

  async get(hash: string): Promise<IPFSEntity> {
    try {
      const data = await this.ipfsRepository.findOne({ where: { hash } });
      if (!data) {
        throw new NotFoundException('Data not found for the given hash');
      }
      return data;
    } catch (error) {
      throw new InternalServerErrorException('Could not retrieve data from IPFS');
    }
  }

}
