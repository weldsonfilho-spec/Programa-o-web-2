
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('projetos')
export class Projeto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 60 })
  nome: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  descricao?: string;

  @Column()
  cor: string;
}
