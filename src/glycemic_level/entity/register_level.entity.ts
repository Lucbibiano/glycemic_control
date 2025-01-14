import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('register_level')
export class RegisterLevelEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    type: string;
    
    @Column('int')
    level: number;

    @Column({nullable: true})
    registerDate: string;

    @Column({nullable: true})
    rate?: string;

    @Column({nullable: true})
    rateColor?: string;
}