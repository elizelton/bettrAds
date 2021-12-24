import { 
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
  } from 'typeorm';
  
  @Entity('Usuario')
  export class Usuario extends BaseEntity {
    
    @PrimaryGeneratedColumn()
      id!: number;
  
    @Column()
      nome!: string;
  
    @Column()
      email!: string;

    @Column()
      senha?: string;

    @Column()
      tokenFacebook!: string;
  
    @CreateDateColumn()
      createdAt!: Date;
  
    @UpdateDateColumn()
      updatedAt!: Date;

  }
