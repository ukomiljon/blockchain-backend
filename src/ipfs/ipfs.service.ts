// src/ipfs/ipfs.service.ts
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as FormData from 'form-data';
import { IPFSEntity } from './entity/ipfs.entity';

@Injectable()
export class IPFSService {
 
  private readonly authHeader = 'Basic ' + Buffer.from(`${process.env.INFURA_PROJECT_ID}:${process.env.INFURA_SECRET}`).toString('base64');

  constructor(
    @InjectRepository(IPFSEntity)
    private ipfsRepository: Repository<IPFSEntity>,
  ) {}

  async add(data: string): Promise<any> {
    try {
      const formData = new FormData();
      formData.append('file', Buffer.from(data), {
        contentType: 'text/plain', // Adjust based on your data type
        filename: 'data.txt',
      });

      const response = await axios.post(`${process.env.IPFS_INFURA_API_URL}/add`, formData, {
        headers: {
          ...formData.getHeaders(),
          Authorization: this.authHeader,
        },
      });

      return this.ipfsRepository.save(response.data); 
       
    } catch (error) {
      console.error('Error adding data to IPFS:', error);
      throw new Error('Failed to upload to IPFS');
    }
  }

  async getDataFromIPFS(hash: string): Promise<string> {
    try {
      const response = await axios.get(`${process.env.IPFS_INFURA_API_URL}/cat?arg=${hash}`, {
        headers: { Authorization: this.authHeader },
        responseType: 'arraybuffer', // Handle binary data
      });

      return response.data.toString(); // Return the raw data as a string
    } catch (error) {
      console.error('Error retrieving data from IPFS:', error);
      throw new Error('Failed to retrieve from IPFS');
    }
  }
}
