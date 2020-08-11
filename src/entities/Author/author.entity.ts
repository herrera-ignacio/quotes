import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Quote } from '../Quote'

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    unique: true,
  })
  fullName: string;

  @OneToMany(type => Quote, quote => quote.author)
  quotes: Quote[];
}