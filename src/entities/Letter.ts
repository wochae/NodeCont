import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class Letter {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User, user => user.authoredLetters, { nullable: true })
    author!: User;

    @ManyToOne(() => User, user => user.receivedLetters, { nullable: true })
    recipient!: User;

    @Column({ default: "" })
    content: string = "";

    @Column({ default: true })
    isPublic: boolean = true;

    @Column({ default: false })
    isDraft: boolean = false;

    @Column({ default: "" })
    purpose: string = "";

    @Column({ default: "" })
    tone: string = "";

    @Column({ default: "" })
    keywords: string = "";

    @CreateDateColumn()
    createdAt: Date = new Date();
}