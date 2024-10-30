import { Entity, ObjectIdColumn, Column, ObjectId } from 'typeorm';

@Entity(('nft'))
export class NFTEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  contractAddress: string;

  @Column()
  tokenId: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  imageUrl: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
