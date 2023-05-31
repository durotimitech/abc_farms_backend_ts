import {
    BaseEntity,
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
  } from "typeorm";
  
  
@Entity("products_abc_ts")
  export class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number

    @Column()
    productTitle: string;

    @Column()
    productPrice: number;

    @Column()
    productQuantity: number;

    @Column()
    productDescription: string;

    @Column()
    productImageUrl: string;

    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  }
  