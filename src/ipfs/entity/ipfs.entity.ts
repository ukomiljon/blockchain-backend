import { Entity, ObjectIdColumn, Column, ObjectId } from 'typeorm';

@Entity()
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
