import { Entity, ObjectIdColumn, Column, ObjectId } from 'typeorm';

@Entity('ipfs')
export class IPFSEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  hash: string;

  @Column()
  content: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
