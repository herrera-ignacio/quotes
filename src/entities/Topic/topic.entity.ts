import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Quote } from '../Quote'

@Entity()
export class Topic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    unique: true,
  })
  name: string;

  @ManyToMany(type => Quote, quote => quote.topics)
  @JoinTable()
  quotes: Quote[];
}
