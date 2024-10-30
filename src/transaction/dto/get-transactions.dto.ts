import { IsEthereumAddress, IsOptional, IsDateString } from 'class-validator';

export class GetTransactionsDto {
  @IsEthereumAddress()
  address: string;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;
}