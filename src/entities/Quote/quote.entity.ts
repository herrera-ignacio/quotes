import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Author } from '../Author';
import { Topic } from '../Topic';

@Entity()
export class Quote {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @ManyToOne(type => Author, author => author.quotes)
  author: Author;

  @ManyToMany(type => Topic, topic => topic.quotes, {
    cascade: true
  })
  topics: Topic[];
}
