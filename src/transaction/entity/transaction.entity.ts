import { Entity, ObjectIdColumn, Column, ObjectId } from 'typeorm';

@Entity()
export class TransactionEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  address: string;

  @Column()
  hash: string;

  @Column()
  timestamp: string;

  @Column()
  from: string;

  @Column()
  to: string;

  @Column()
  value: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
