import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Letter } from './Letter';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    kakaoId: string = "";

    @Column()
    username: string = "";

    @Column({ nullable: true, default: "" })
    profileImageUrl?: string = "";

    @OneToMany(() => Letter, letter => letter.recipient, { nullable: true })
    receivedLetters!: Letter[];

    @OneToMany(() => Letter, letter => letter.author, { nullable: true })
    authoredLetters!: Letter[];
}