import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Letter {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    recipient!: string;

    @Column()
    purpose!: string;

    @Column()
    tone!: string;

    @Column("text")
    keywords!: string;
}