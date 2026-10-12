import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity("users") // 데이터베이스의 실제 테이블 이름
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: "first_name", length: 50, nullable: true })
    firstName!: string;

    @Column({ name: "last_name", length: 50, nullable: true })
    lastName!: string;

    @Column({ unique: true, length: 100 })
    email!: string;

    @Column({ length: 255 })
    password!: string;

    @Column({ name: "company_name", length: 100, nullable: true })
    companyName!: string;

    @Column({ length: 50, nullable: true })
    position!: string;

    @Column({ length: 20, nullable: true })
    tel!: string;

    @Column({ length: 255, nullable: true })
    address!: string;

    @Column({ name: "detail_address", length: 255, nullable: true })
    detailAddress!: string;

    @Column({ length: 10, nullable: true })
    gender!: string;

    @CreateDateColumn({ name: "created_at" })
    createdAt!: Date;
}